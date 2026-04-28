from warnings import warn
from dataclasses import dataclass
from enum import StrEnum, auto
import re
from pathlib import Path
from os import PathLike
from typing import Union

import feeder_pb2


definition_match = re.compile(
    r"^New (?P<kind>(?:\w+))\.(?P<identifier>[\w\-_]+)\s(?P<parameters>(?:\s*(?:[\%\w]+)=(?:(?:[\w\-\.]+)|(?:\([\w\-\s,\.]+\))))+)"
)
parameter_match = re.compile(
    r"(?:(?P<name>[\%\w]+)=(?P<value>(?:[\w\-\.]+)|(?:\([\w\-\s,\.]+\))))"
)

bus_match = re.compile(r"(?P<bus_id>[\w\-]+)\.?(?P<phases>[\d\.]*)")
bus_coord_match = re.compile(
    r"^(?P<bus_name>[^\s^,]+)\s(?P<bus_x>[0-9\.]+)\s(?P<bus_y>[0-9\.]+)$"
)


class DSSKind(StrEnum):
    LINE = auto()
    TRANSFORMER = auto()
    LOAD = auto()
    CAPACITOR = auto()
    REGCONTROL = auto()
    BUS = auto()


@dataclass
class DSSBusConnection:
    bus_id: str
    phases: list[int]

    def pack(self, proto_bus_connection=None) -> feeder_pb2.BusConnection:
        if proto_bus_connection is None:
            proto_bus_connection = feeder_pb2.BusConnection()
        proto_bus_connection.bus_id = int(self.bus_id)
        if 1 in self.phases:
            proto_bus_connection.phase_a = True
        if 2 in self.phases:
            proto_bus_connection.phase_b = True
        if 3 in self.phases:
            proto_bus_connection.phase_c = True
        return proto_bus_connection


@dataclass
class DSSReference:
    reference_id: str


@dataclass
class DSSObject:
    kind: DSSKind
    identifier: str
    parameters: dict[
        str, Union[str, DSSBusConnection, list[str], list[DSSBusConnection]]
    ]

    def __str__(self):
        return f"{self.kind} {self.identifier} {self.parameters}"


def parse_bus_connection(bus_string: str) -> DSSBusConnection:
    bus_match_result = bus_match.match(bus_string)
    assert bus_match_result is not None, f"Invalid bus connection string: {bus_string}"
    bus_id = bus_match_result.group("bus_id")
    phases_string = bus_match_result.group("phases")
    if phases_string == "":
        phases = [1, 2, 3]
    else:
        phases = [int(phase) for phase in phases_string.split(".")]
    return DSSBusConnection(bus_id, phases)


def parse(dss_string: str) -> list[DSSObject]:
    dss_lines = [line.strip() for line in dss_string.split("\n")]
    dss_objects: list[DSSObject] = []
    bus_coordinates: dict[str, tuple[float, float]] = {}

    def parse_definition(definition_match_result: re.Match[str]):
        kind = definition_match_result.group("kind")
        identifier = definition_match_result.group("identifier").lower()
        paraemters = definition_match_result.group("parameters")

        assert kind.lower() in DSSKind, f"Unsupported component kind: {kind}"

        dss_kind = DSSKind(kind.lower())

        parameter_matches = parameter_match.findall(paraemters)
        parameters = {}
        for parameter_name, parameter_value in parameter_matches:
            parameter_name = parameter_name.lower()
            parameter_value = parameter_value.lower()
            if parameter_value.startswith("(") and parameter_value.endswith(")"):
                parameter_value = parameter_value[1:-1]
                parameter_value = [
                    value.strip() for value in parameter_value.split(",")
                ]
                if dss_kind == DSSKind.TRANSFORMER and parameter_name == "buses":
                    parameter_value = [
                        parse_bus_connection(bus_string)
                        for bus_string in parameter_value
                    ]
            else:
                if (
                    (dss_kind == DSSKind.LINE and parameter_name in ["bus1", "bus2"])
                    or (dss_kind == DSSKind.TRANSFORMER and parameter_name == "bus")
                    or (
                        dss_kind == DSSKind.CAPACITOR
                        and parameter_name in ["bus1", "bus2"]
                    )
                    or (dss_kind == DSSKind.LOAD and parameter_name == "bus1")
                ):
                    parameter_value = parse_bus_connection(parameter_value)
                elif dss_kind == DSSKind.REGCONTROL and parameter_name == "transformer":
                    parameter_value = DSSReference(parameter_value)
            parameters[parameter_name] = parameter_value
        dss_object_instance = DSSObject(dss_kind, identifier, parameters)
        dss_objects.append(dss_object_instance)

    def parse_bus_coord(bus_coord_match_result: re.Match[str]):
        bus_name = bus_coord_match_result.group("bus_name").lower()
        bus_x = bus_coord_match_result.group("bus_x")
        bus_y = bus_coord_match_result.group("bus_y")
        dss_object_instance = DSSObject(DSSKind.BUS, bus_name, {"x": bus_x, "y": bus_y})
        dss_objects.append(dss_object_instance)

    for dss_line in dss_lines:
        if dss_line == "" or dss_line.startswith("!"):
            continue
        definition_match_result = definition_match.match(dss_line)
        bus_coord_match_result = bus_coord_match.match(dss_line)
        if definition_match_result is not None:
            parse_definition(definition_match_result)
        elif bus_coord_match_result is not None:
            parse_bus_coord(bus_coord_match_result)
        else:
            warn(f"Could not parse DSS line: {dss_line}")
            continue

    return dss_objects


def parse_dss_file(
    dss_file: PathLike,
) -> list[DSSObject]:
    return parse(Path(dss_file).read_text())


def parse_dss_directory(
    dss_dir: PathLike,
) -> list[DSSObject]:
    dss_objects: list[DSSObject] = []
    for dss_file in sorted(Path(dss_dir).glob("*.dss")):
        objects = parse_dss_file(dss_file)
        dss_objects.extend(objects)
    return dss_objects


def renumber_dss_objects(
    dss_objects: list[DSSObject],
) -> tuple[list[DSSObject], dict[str, int]]:
    def id_generator():
        i = 0
        while True:
            yield i
            i += 1

    ids = id_generator()
    id_mapping: dict[str, int] = {}

    def replace_id(id) -> str:
        if id not in id_mapping:
            id_mapping[id] = next(ids)
        return str(id_mapping[id])

    for dss_object in dss_objects:
        dss_object.identifier = replace_id(dss_object.identifier)
        for parameter_name, parameter_value in dss_object.parameters.items():
            if isinstance(parameter_value, DSSBusConnection):
                parameter_value.bus_id = replace_id(parameter_value.bus_id)
            elif isinstance(parameter_value, DSSReference):
                parameter_value.reference_id = replace_id(parameter_value.reference_id)
            elif isinstance(parameter_value, list):
                for item in parameter_value:
                    if isinstance(item, DSSBusConnection):
                        item.bus_id = replace_id(item.bus_id)
                    elif isinstance(item, DSSReference):
                        item.reference_id = replace_id(item.reference_id)

    return dss_objects, id_mapping


def pack_feeder(dss_objects: list[DSSObject]) -> feeder_pb2.Feeder:
    proto_feeder = feeder_pb2.Feeder()
    for dss_object in dss_objects:
        id = int(dss_object.identifier)
        if dss_object.kind == DSSKind.LINE:
            proto_line = proto_feeder.Line()
            proto_line.id = id
            bus1 = dss_object.parameters["bus1"]
            bus2 = dss_object.parameters["bus2"]
            length = dss_object.parameters.get("length", "0")
            switch = dss_object.parameters.get("switch", "n")
            enabled = dss_object.parameters.get("enabled", "y")
            if enabled.lower() == "n":
                warn(f"Line {id} is disabled, skipping")
                continue
            assert isinstance(bus1, DSSBusConnection)
            assert isinstance(bus2, DSSBusConnection)
            assert isinstance(length, str)
            assert isinstance(switch, str)
            assert isinstance(enabled, str)
            bus1.pack(proto_line.from_bus)
            bus2.pack(proto_line.to_bus)
            proto_line.length_meters = int(float(length) * 1000)
            proto_line.switch = switch.lower() == "y"
            proto_line.enabled = enabled.lower() == "y"
            proto_feeder.lines.append(proto_line)
        elif dss_object.kind == DSSKind.TRANSFORMER:
            proto_transformer = proto_feeder.Transformer()
            proto_transformer.id = id
            bus_connections = dss_object.parameters["buses"]
            # voltages = dss_object.parameters.get("kvs")
            assert isinstance(bus_connections, list)
            # assert isinstance(voltages, list)
            for bus_connection in bus_connections:
                assert isinstance(bus_connection, DSSBusConnection)
                proto_transformer.bus_connections.append(bus_connection.pack())
            # for voltage in voltages:
            #     assert isinstance(voltage, str)
            #     proto_transformer.voltages.append(int(float(voltage) * 1000))
            proto_feeder.transformers.append(proto_transformer)
        elif dss_object.kind == DSSKind.LOAD:
            proto_load = proto_feeder.Load()
            proto_load.id = id
            bus1 = dss_object.parameters["bus1"]
            assert isinstance(bus1, DSSBusConnection)
            bus1.pack(proto_load.bus)
            proto_feeder.loads.append(proto_load)
        elif dss_object.kind == DSSKind.CAPACITOR:
            proto_capacitor = proto_feeder.Capacitor()
            proto_capacitor.id = id
            bus1 = dss_object.parameters["bus1"]
            assert isinstance(bus1, DSSBusConnection)
            bus1.pack(proto_capacitor.bus)
            proto_feeder.capacitors.append(proto_capacitor)
        elif dss_object.kind == DSSKind.REGCONTROL:
            proto_regulator = proto_feeder.Regulator()
            proto_regulator.id = id
            transformer_reference = dss_object.parameters["transformer"]
            assert isinstance(transformer_reference, DSSReference)
            proto_regulator.transformer_id = int(transformer_reference.reference_id)
            proto_feeder.regulators.append(proto_regulator)
        elif dss_object.kind == DSSKind.BUS:
            proto_bus = proto_feeder.Bus()
            proto_bus.id = id
            proto_bus.x = int(float(dss_object.parameters["x"]))
            proto_bus.y = int(float(dss_object.parameters["y"]))
            proto_feeder.buses.append(proto_bus)
        else:
            raise ValueError(f"Unsupported component kind: {dss_object.kind}")
    min_x = None
    min_y = None
    max_x = None
    max_y = None
    for bus in proto_feeder.buses:
        if min_x is None or bus.x < min_x:
            min_x = bus.x
        if min_y is None or bus.y < min_y:
            min_y = bus.y
        if max_x is None or bus.x > max_x:
            max_x = bus.x
        if max_y is None or bus.y > max_y:
            max_y = bus.y
    range_x = max_x - min_x
    range_y = max_y - min_y

    scale = max(range_x, range_y) / 2000
    for bus in proto_feeder.buses:
        bus.x = 200 + int((bus.x - min_x) / scale)
        bus.y = 200 + int((bus.y - min_y) / scale)

    # print(
    #     f"Bus coordinates: min_x={min_x}, min_y={min_y}, max_x={max_x}, max_y={max_y}, range_x={range_x}, range_y={range_y}"
    # )

    return proto_feeder


dss_objects: list[DSSObject] = parse_dss_directory("dss")

renumbered_dss_objects, id_mapping = renumber_dss_objects(dss_objects)

packed_feeder = pack_feeder(renumbered_dss_objects)
packed_feeder.source_bus_id = id_mapping["donalsonville_c0362_cyp"]
with Path("outputs/feeder.buff").open("wb") as f:
    f.write(packed_feeder.SerializeToString())


Path("outputs/id_mapping.csv").write_text(
    "\n".join([f"{old_id}, {new_id}" for old_id, new_id in id_mapping.items()])
)
