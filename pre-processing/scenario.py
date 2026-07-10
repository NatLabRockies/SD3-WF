from os import PathLike
from pathlib import Path
from warnings import warn
from building import Building
import pandas as pd
from constants import (
    START_YEAR,
    START_MONTH,
    START_DAY,
    START_HOUR,
    START_MINUTE,
    START_TIME,
    END_TIME,
)
import scenario_pb2


START_TIMESTAMP = pd.Timestamp(
    START_YEAR, START_MONTH, START_DAY, START_HOUR, START_MINUTE
)

_from_to_bare_mapping = {
    "from_voltage": "voltage",
    "from_current": "current",
    "from_active_power": "active_power",
    "from_reactive_power": "reactive_power",
}

_to_fields = [
    "to_voltage",
    "to_current",
    "to_active_power",
    "to_reactive_power",
]

power_data_mappings = {
    "line": {
        "proto_data_mapping": _from_to_bare_mapping,
        "ignore": _to_fields,
    },
    "load": {},
    "transformer": {
        "proto_data_mapping": _from_to_bare_mapping,
        "ignore": _to_fields,
    },
    "bus": {"proto_data_key": "buses"},
    "breaker": {"ignore": ["freq"]},
    "capacitor": {"ignore": ["freq"]},
    "regulator": {"ignore": ["freq"]},
    "circuit": {"glob": "*.power.circui.csv"},
}


class Scenario:
    def __init__(self, path: PathLike) -> None:
        path = Path(path)
        buildings_dir = path / "buildings"
        grid_dir = path / "grid"
        self.grid_dir = grid_dir
        self.buildings: dict[str, Building] = {}
        for building_dir in buildings_dir.iterdir():
            if not building_dir.is_dir():
                continue
            building = Building(building_dir)
            self.buildings[building_dir.name] = building

        traffic_csv = path / "mirrordata.csv"
        if traffic_csv.exists():
            self.traffic = pd.read_csv(traffic_csv, index_col=[0]) / 1024
            self.traffic.index = pd.to_datetime(
                self.traffic.index, origin=START_TIME, unit="s"
            )
            self.traffic = self.traffic[self.traffic.index <= pd.Timestamp(END_TIME)]
        self.load_power_data()

    @property
    def battery_active_power(self) -> pd.DataFrame:
        battery_active_power = None
        for building in self.buildings.values():
            if battery_active_power is None:
                battery_active_power = building.battery_active_power
            else:
                battery_active_power = (
                    battery_active_power + building.battery_active_power
                )

        return battery_active_power

    def pack(self, proto_scenario: scenario_pb2.Scenario, id_map: dict[str, int]):
        for key, results in self.data.items():
            proto_class_key = power_data_mappings[key].get(
                "proto_class_key", key.title()
            )
            assert hasattr(proto_scenario, proto_class_key)
            proto_data_key = power_data_mappings[key].get("proto_data_key", f"{key}s")
            assert hasattr(proto_scenario, proto_data_key), (
                f"Scenario does not have attribute '{proto_data_key}'"
            )
            proto_data_mapping = power_data_mappings[key].get("proto_data_mapping", {})

            proto_class = getattr(proto_scenario, proto_class_key)
            proto_data = getattr(proto_scenario, proto_data_key)
            skipped_fields = power_data_mappings[key].get("ignore", [])
            for id, data in results.items():
                proto_object = proto_class()
                mapped_id = id_map.get(id, None)
                if mapped_id is None:
                    warn(f"ID missing for: '{id}'. Skipping")
                    continue
                proto_object.id = mapped_id
                proto_point_list = getattr(proto_object, "timeseries")
                field_names = [
                    (field_name, proto_data_mapping.get(field_name, field_name))
                    for field_name in data.columns
                    if field_name not in skipped_fields
                ]

                for _, field_name in field_names:
                    assert hasattr(proto_object.TimePoint(), field_name), (
                        f"'{proto_class_key}.TimePoint' does not have field '{field_name}'"
                    )

                for timestamp, row in data.iterrows():
                    proto_point = proto_object.TimePoint()
                    proto_point.seconds = int(timestamp)
                    for from_field_name, to_field_name in field_names:
                        try:
                            setattr(proto_point, to_field_name, row[from_field_name])
                        except Exception as e:
                            print(
                                f"Problem in field: {from_field_name}:{to_field_name}"
                            )
                            raise e

                    proto_point_list.append(proto_point)
                proto_data.append(proto_object)

    def pack_batteries(
        self, proto_scenario: scenario_pb2.Scenario, id_map: dict[str, int]
    ):
        """Pack per-building battery timeseries into proto_scenario.batteries."""
        for building_id, building in self.buildings.items():
            mapped_id = id_map.get(building_id, None)
            if mapped_id is None:
                print(
                    f"  [batteries] ID missing for building '{building_id}', skipping"
                )
                continue

            try:
                ts = building.battery_timeseries(START_TIMESTAMP)
            except KeyError as e:
                print(
                    f"  [batteries] Missing column for building '{building_id}': {e}, skipping"
                )
                continue

            proto_battery = proto_scenario.Battery()
            proto_battery.id = mapped_id

            for seconds, row in ts.iterrows():
                pt = proto_battery.TimePoint()
                pt.seconds = int(seconds)
                pt.received_signal = float(row["received_signal"])
                pt.status = int(row["status"])
                pt.state_of_charge = float(row["state_of_charge"])
                pt.active_power = float(row["active_power"])
                pt.reactive_power = float(row["reactive_power"])
                proto_battery.timeseries.append(pt)

            proto_scenario.batteries.append(proto_battery)
            try:
                ts = building.facility_timeseries(START_TIMESTAMP)
            except KeyError as e:
                print(
                    f"[facilities] Missing column for building '{building_id}': {e}, skipping"
                )
                continue

            proto_building = proto_scenario.Building()
            proto_building.id = mapped_id
            for seconds, row in ts.iterrows():
                pt = proto_building.TimePoint()
                pt.seconds = int(seconds)
                pt.power = float(row["power"])
                pt.net_power = float(row["net_power"])
                pt.purchased_power = float(row["purchased_power"])
                pt.surplus_power = float(row["surplus_power"])
                proto_building.timeseries.append(pt)

            proto_scenario.buildings.append(proto_building)

    def load_power_data(self):
        self.data: dict[str, dict[str, pd.DataFrame]] = {}
        for key, arguments in power_data_mappings.items():
            glob = arguments.get("glob", f"*.power.{key}.csv")
            file = list(self.grid_dir.glob(glob))[0]
            self.data[key] = read_one_result(file)

        revised_lines = list(self.grid_dir.glob("lines_combined_*.csv"))
        if len(revised_lines) > 0:
            lines, buses = read_revised_line(revised_lines[0])
            self.data["line"] = lines
            self.data["bus"] = buses
        else:
            print("Could not find revised line data")


def read_revised_line(
    file_path,
) -> tuple[dict[str, pd.DataFrame], dict[str, pd.DataFrame]]:
    df = pd.read_csv(file_path)

    # df["timestamp"] = pd.to_datetime(
    #     df["timestamp"], origin=START_TIME, unit="s"
    # )  # add this
    df["timestamp"] = pd.to_timedelta(df["timestamp"], unit="s") / pd.Timedelta(
        1, unit="s"
    )  # add this
    df.drop(columns=["to_current", "to_voltage"], inplace=True)
    line_names = list(df["name"].unique())
    bus_names = df["bus"].unique()
    unique_bus_names = {}
    for bus_name in bus_names:
        short_bus_name = bus_name[0 : bus_name.find(".")].lower().strip()
        unique_bus_names[short_bus_name] = bus_name
        if short_bus_name in line_names:
            line_names.remove(short_bus_name)

    def process(column: str, name: str) -> pd.DataFrame:
        filtered_df = df[df[column] == name].copy()
        filtered_df.index = filtered_df.timestamp
        filtered_df = filtered_df[~filtered_df.index.duplicated(keep="first")]
        filtered_df.drop(
            columns=["name", "bus", "timestamp", "base_voltage_V"], inplace=True
        )
        return filtered_df

    return (
        {
            name: process("name", name)
            .drop(columns=["from_current", "from_voltage"])
            .rename(columns={"from_voltage_pu": "voltage"})
            for name in line_names
        },
        {
            name: process("bus", id)
            .drop(columns=["from_current", "from_voltage"])
            .rename(columns={"from_voltage_pu": "voltage"})
            for name, id in unique_bus_names.items()
        },
    )


def read_one_result(file_path) -> dict[str, pd.DataFrame]:
    df = pd.read_csv(file_path)
    """reformat"""
    cols = df.columns

    if isinstance(df.index, pd.MultiIndex):
        df.reset_index(inplace=True)
    dt_cols = [df.columns[col] for col in range(-7, 0)]
    dt_final = df.columns[-7]
    dt_cols.remove(dt_final)

    for col in dt_cols:
        df[dt_final] = df[dt_final].str.cat(df[col].astype("str"), sep=", ")

    df.drop(columns=dt_cols, inplace=True)

    cols = [col for col in cols if "Unnamed" not in col]

    df.columns = cols
    df.timestamp = pd.to_datetime(
        df.timestamp, format="datetime.datetime(%Y, %m, %d, %H, %M, %S, %f)"
    )

    equipment: dict[str, pd.DataFrame] = {}
    names = df["name"].unique()
    for name in names:
        filtered_df: pd.DataFrame = df[df["name"] == name].copy()
        # Some scenarios don't start at the beginning
        (rows, _) = filtered_df.shape
        if rows == 179:
            filtered_df = filtered_df.iloc[:149]
        elif rows == 298:
            filtered_df = filtered_df.iloc[149:]

        # Make index minutes since beginning of scenario
        filtered_df.index = filtered_df.timestamp
        start_time = filtered_df.index[0]
        time_offset = START_TIMESTAMP - start_time
        filtered_df.index = (
            filtered_df.index.shift(1, time_offset) - START_TIMESTAMP
        ) / pd.Timedelta(1, unit="s")

        filtered_df.drop(columns=["name", "timestamp"], inplace=True)
        equipment[name] = filtered_df
    return equipment
