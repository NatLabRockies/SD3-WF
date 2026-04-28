"""
PCAP Discovery Script - Step 1
Analyzes each scenario's mirrordata.pcap to understand:
- Unique source/destination IPs
- Traffic volumes per IP pair
- Time ranges
- Protocol distribution
"""

import dpkt
import ipaddress
import pathlib
from collections import defaultdict
from datetime import datetime

SCENARIOS_DIR = pathlib.Path("scenarios")


def analyze_pcap(pcap_path: pathlib.Path) -> dict:
    """Analyze a single pcap file and return summary statistics."""
    pcap = dpkt.pcap.Reader(pcap_path.open("rb"))

    ip_pair_bytes: dict[tuple[str, str], int] = defaultdict(int)
    ip_pair_packets: dict[tuple[str, str], int] = defaultdict(int)
    protocol_counts: dict[str, int] = defaultdict(int)
    all_ips: set[str] = set()
    timestamps: list[float] = []
    total_packets = 0
    non_ip_packets = 0

    for timestamp, buf in pcap:
        total_packets += 1
        try:
            eth = dpkt.ethernet.Ethernet(buf)
        except dpkt.dpkt.UnpackError:
            continue

        ip = eth.data
        if not isinstance(ip, dpkt.ip.IP):
            non_ip_packets += 1
            continue

        src = str(ipaddress.IPv4Address(ip.src))
        dst = str(ipaddress.IPv4Address(ip.dst))
        all_ips.add(src)
        all_ips.add(dst)

        pair = (src, dst)
        ip_pair_bytes[pair] += ip.len
        ip_pair_packets[pair] += 1
        timestamps.append(timestamp)

        # Identify transport protocol
        if ip.p == dpkt.ip.IP_PROTO_TCP:
            protocol_counts["TCP"] += 1
        elif ip.p == dpkt.ip.IP_PROTO_UDP:
            protocol_counts["UDP"] += 1
        elif ip.p == dpkt.ip.IP_PROTO_ICMP:
            protocol_counts["ICMP"] += 1
        else:
            protocol_counts[f"other({ip.p})"] += 1

    time_range = None
    if timestamps:
        min_t = min(timestamps)
        max_t = max(timestamps)
        time_range = (
            datetime.fromtimestamp(min_t).isoformat(),
            datetime.fromtimestamp(max_t).isoformat(),
            f"{max_t - min_t:.1f}s",
        )

    return {
        "total_packets": total_packets,
        "ip_packets": total_packets - non_ip_packets,
        "non_ip_packets": non_ip_packets,
        "unique_ips": sorted(all_ips),
        "ip_pair_bytes": dict(ip_pair_bytes),
        "ip_pair_packets": dict(ip_pair_packets),
        "protocol_counts": dict(protocol_counts),
        "time_range": time_range,
    }


def classify_ip(ip_str: str) -> str:
    """Quick subnet-based classification."""
    ip = ipaddress.IPv4Address(ip_str)
    if ip in ipaddress.IPv4Network("40.0.0.0/8"):
        return "battery"
    elif ip in ipaddress.IPv4Network("172.16.0.0/16"):
        return "isp/mgmt"
    elif ip in ipaddress.IPv4Network("100.0.0.0/16"):
        return "wan"
    elif ip in ipaddress.IPv4Network("10.0.0.0/8"):
        return "utility/cc"
    elif ip in ipaddress.IPv4Network("20.0.0.0/8"):
        return "substation"
    elif ip in ipaddress.IPv4Network("192.168.0.0/16"):
        return "field"
    else:
        return "unknown"


def print_report(scenario_name: str, stats: dict):
    print(f"\n{'=' * 80}")
    print(f"SCENARIO: {scenario_name}")
    print(f"{'=' * 80}")
    print(f"Total packets: {stats['total_packets']}")
    print(f"IP packets: {stats['ip_packets']}")
    print(f"Non-IP packets: {stats['non_ip_packets']}")
    print(f"Time range: {stats['time_range']}")
    print(f"\nProtocols: {stats['protocol_counts']}")

    print(f"\nUnique IPs ({len(stats['unique_ips'])}):")
    for ip in stats["unique_ips"]:
        print(f"  {ip:20s}  [{classify_ip(ip)}]")

    # Sort flows by bytes descending, show top 30
    sorted_flows = sorted(
        stats["ip_pair_bytes"].items(), key=lambda x: x[1], reverse=True
    )
    print(f"\nTop traffic flows (by bytes, {len(sorted_flows)} total flows):")
    for (src, dst), total_bytes in sorted_flows[:30]:
        pkts = stats["ip_pair_packets"][(src, dst)]
        src_class = classify_ip(src)
        dst_class = classify_ip(dst)
        print(
            f"  {src:20s} [{src_class:10s}] -> {dst:20s} [{dst_class:10s}]  "
            f"{total_bytes:>12,} bytes  {pkts:>8,} pkts"
        )
    if len(sorted_flows) > 30:
        print(f"  ... and {len(sorted_flows) - 30} more flows")


if __name__ == "__main__":
    scenario_dirs = sorted(SCENARIOS_DIR.iterdir())
    for scenario_dir in scenario_dirs:
        pcap_path = scenario_dir / "mirrordata.pcap"
        if not pcap_path.exists():
            continue
        stats = analyze_pcap(pcap_path)
        print_report(scenario_dir.name, stats)
