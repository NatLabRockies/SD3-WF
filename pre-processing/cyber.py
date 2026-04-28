"""
Cyber data processing - Parses PCAP files and produces protobuf Cyber data.

Reads mirrordata.pcap from each scenario directory, aggregates traffic
per (source, destination) entity pair in 1-minute bins, and packs the
results into the Cyber protobuf message.

Each time bin carries per-protocol breakdowns (transport + application layer)
and TCP RST counts to distinguish accepted from refused connections.
"""

import dpkt
import ipaddress
from collections import defaultdict
from pathlib import Path

import scenario_pb2
from ip_registry import (
    NetworkEntity,
    build_registry,
    get_or_create_entity,
    is_multicast,
)

# Aggregation interval in seconds
BIN_SIZE = 60

# Ephemeral port threshold — dest ports >= this are classified as EPHEMERAL
EPHEMERAL_PORT_MIN = 32768

# Transport protocol numbers
_IP_PROTO_TCP = 6
_IP_PROTO_UDP = 17

# Shorthand aliases for enum values
_Transport = scenario_pb2.Cyber.Transport
_App = scenario_pb2.Cyber.AppProtocol

# Map (ip_proto_number, dest_port) -> (Transport enum, AppProtocol enum)
# Ports not in this table fall through to the ephemeral / unknown logic below.
PORT_CLASSIFICATION: dict[tuple[int, int], tuple[int, int]] = {
    (_IP_PROTO_TCP, 9101): (_Transport.TCP, _App.HTTP),
    (_IP_PROTO_TCP, 9001): (_Transport.TCP, _App.TLS),
    (_IP_PROTO_TCP, 22): (_Transport.TCP, _App.SSH),
    (_IP_PROTO_UDP, 53): (_Transport.UDP, _App.DNS),
    (_IP_PROTO_UDP, 4712): (_Transport.UDP, _App.IEEE_2030_5),
}

# Map IP protocol number -> Transport enum (for non-TCP/UDP transports and
# as a fallback for TCP/UDP ports not in PORT_CLASSIFICATION)
_TRANSPORT_MAP: dict[int, int] = {
    _IP_PROTO_TCP: _Transport.TCP,
    _IP_PROTO_UDP: _Transport.UDP,
    1: _Transport.ICMP,
    2: _Transport.IGMP,
}


def _classify_packet(ip: dpkt.ip.IP) -> tuple[int, int, int]:
    """Return (transport_enum, app_protocol_enum, rst_count) for one packet.

    rst_count is 1 if the packet is a TCP RST, 0 otherwise.
    """
    transport = ip.data
    ip_proto = ip.p

    transport_enum = _TRANSPORT_MAP.get(ip_proto, _Transport.TRANSPORT_UNKNOWN)

    if isinstance(transport, dpkt.tcp.TCP):
        dport = transport.dport
        key = (_IP_PROTO_TCP, dport)
        if key in PORT_CLASSIFICATION:
            _, app_enum = PORT_CLASSIFICATION[key]
        elif dport >= EPHEMERAL_PORT_MIN:
            app_enum = _App.EPHEMERAL
        else:
            app_enum = _App.APP_UNKNOWN
        rst = 1 if (transport.flags & dpkt.tcp.TH_RST) else 0
        return transport_enum, app_enum, rst

    if isinstance(transport, dpkt.udp.UDP):
        dport = transport.dport
        key = (_IP_PROTO_UDP, dport)
        if key in PORT_CLASSIFICATION:
            _, app_enum = PORT_CLASSIFICATION[key]
        elif dport >= EPHEMERAL_PORT_MIN:
            app_enum = _App.EPHEMERAL
        else:
            app_enum = _App.APP_UNKNOWN
        return transport_enum, app_enum, 0

    # ICMP, IGMP, or other — no port classification
    return transport_enum, _App.APP_UNKNOWN, 0


# Flow data structure:
#   flows[(src_id, dst_id)][bin_seconds] = {
#       'bytes':    int,
#       'packets':  int,
#       'protocols': {(transport_enum, app_enum): [bytes, packets, rst_count]},
#   }
FlowBin = dict  # typed loosely to keep the generic dict defaultdict below readable


def parse_pcap(
    pcap_path: Path,
    registry: dict[str, NetworkEntity],
) -> tuple[dict[str, NetworkEntity], dict[tuple[int, int], dict[int, FlowBin]]]:
    """Parse a PCAP file and aggregate traffic into per-minute bins.

    Returns:
        - Updated registry (with any newly discovered IPs)
        - flows dict with per-protocol breakdowns
    """
    flows: dict[tuple[int, int], dict[int, FlowBin]] = defaultdict(
        lambda: defaultdict(
            lambda: {
                "bytes": 0,
                "packets": 0,
                "protocols": defaultdict(lambda: [0, 0, 0]),
            }
        )
    )

    pcap = dpkt.pcap.Reader(pcap_path.open("rb"))
    first_timestamp: float | None = None

    for timestamp, buf in pcap:
        try:
            eth = dpkt.ethernet.Ethernet(buf)
        except dpkt.dpkt.UnpackError:
            continue

        ip = eth.data
        if not isinstance(ip, dpkt.ip.IP):
            continue

        src_str = str(ipaddress.IPv4Address(ip.src))
        dst_str = str(ipaddress.IPv4Address(ip.dst))

        # Skip multicast/broadcast
        if is_multicast(dst_str) or is_multicast(src_str):
            continue

        if first_timestamp is None:
            first_timestamp = timestamp

        # Calculate time bin (seconds from start, floored to BIN_SIZE)
        relative_seconds = timestamp - first_timestamp
        bin_index = int(relative_seconds // BIN_SIZE) * BIN_SIZE

        # Resolve entities
        src_entity = get_or_create_entity(registry, src_str)
        dst_entity = get_or_create_entity(registry, dst_str)

        transport_enum, app_enum, rst = _classify_packet(ip)

        flow_key = (src_entity.id, dst_entity.id)
        bin_data = flows[flow_key][bin_index]
        bin_data["bytes"] += ip.len
        bin_data["packets"] += 1

        proto_key = (transport_enum, app_enum)
        proto = bin_data["protocols"][proto_key]
        proto[0] += ip.len  # bytes
        proto[1] += 1  # packets
        proto[2] += rst  # rst_count

    return registry, dict(flows)


def pack_cyber(
    proto_scenario: scenario_pb2.Scenario,
    scenario_dir: Path,
    registry: dict[str, NetworkEntity],
) -> dict[str, NetworkEntity]:
    """Process PCAP data and pack into the Scenario's cyber field.

    Returns the updated registry (for use by subsequent scenarios).
    """
    pcap_path = scenario_dir / "mirrordata.pcap"
    if not pcap_path.exists():
        print(f"  No mirrordata.pcap found in {scenario_dir}, skipping cyber data")
        return registry

    print(f"  Parsing {pcap_path}...")
    registry, flows = parse_pcap(pcap_path, registry)

    if not flows:
        print(f"  No IP traffic found in {pcap_path}, skipping cyber data")
        return registry

    # Determine which entities actually appear in this scenario's traffic
    active_entity_ids: set[int] = set()
    for src_id, dst_id in flows:
        active_entity_ids.add(src_id)
        active_entity_ids.add(dst_id)

    # Build entity ID remapping: only include active entities, renumber from 1
    id_remap: dict[int, int] = {}
    new_id = 1
    for old_id in sorted(active_entity_ids):
        id_remap[old_id] = new_id
        new_id += 1

    # Pack entities (only those active in this scenario)
    cyber = proto_scenario.cyber
    entity_by_old_id = {e.id: e for e in registry.values()}

    for old_id in sorted(active_entity_ids):
        entity = entity_by_old_id[old_id]
        proto_entity = cyber.entities.add()
        proto_entity.id = id_remap[old_id]
        proto_entity.ip_address = entity.ip_address
        proto_entity.label = entity.label
        proto_entity.role = entity.role
        proto_entity.grid_component_id = entity.grid_component_id

    # Pack flows
    for (src_id, dst_id), time_bins in flows.items():
        proto_flow = cyber.flows.add()
        proto_flow.source_id = id_remap[src_id]
        proto_flow.dest_id = id_remap[dst_id]

        for bin_seconds in sorted(time_bins.keys()):
            bin_data = time_bins[bin_seconds]
            proto_point = proto_flow.timeseries.add()
            proto_point.seconds = bin_seconds
            proto_point.bytes = bin_data["bytes"]
            proto_point.packets = bin_data["packets"]

            # Protocol breakdowns
            for (transport_enum, app_enum), (b, p, rst) in bin_data[
                "protocols"
            ].items():
                pb = proto_point.protocols.add()
                pb.transport = transport_enum
                pb.app = app_enum
                pb.bytes = b
                pb.packets = p
                pb.rst_count = rst

    n_entities = len(cyber.entities)
    n_flows = len(cyber.flows)
    total_points = sum(len(f.timeseries) for f in cyber.flows)
    print(
        f"  Packed cyber data: {n_entities} entities, "
        f"{n_flows} flows, {total_points} time points"
    )

    return registry
