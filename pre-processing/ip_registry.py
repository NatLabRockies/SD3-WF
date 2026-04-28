"""
IP Registry - Maps IP addresses to named network entities.
Parses attack_data_ips.txt for battery/attacker mappings and
uses known topology data for infrastructure classification.
"""

import ipaddress
import re
from dataclasses import dataclass
from pathlib import Path


@dataclass
class NetworkEntity:
    id: int
    ip_address: str
    label: str
    role: str  # oem, battery, attacker, aggregator, isp, utility, substation, infrastructure, unknown
    grid_component_id: int = 0  # FK to grid Load ID for batteries; 0 = no linkage


# Multicast and broadcast IPs to filter out
MULTICAST_NETWORKS = [
    ipaddress.IPv4Network("224.0.0.0/4"),
    ipaddress.IPv4Network("239.0.0.0/8"),
    ipaddress.IPv4Network("255.255.255.255/32"),
]

# Known infrastructure IPs from topology.yaml (not batteries or key actors)
INFRASTRUCTURE_IPS = {
    # Substation routers
    "20.0.0.1": ("Substation Border Router", "substation"),
    "20.0.0.2": ("Substation Router", "substation"),
    "20.1.0.1": ("Substation Router (enterprise)", "substation"),
    "20.1.0.2": ("Substation DMZ Router (sub side)", "substation"),
    "20.10.0.1": ("Substation DMZ Router", "substation"),
    "20.10.0.2": ("Substation OT Router (DMZ side)", "substation"),
    "10.10.101.1": ("Substation OT Router", "substation"),
    "10.10.101.2": ("Substation RTU", "substation"),
    "10.10.101.4": ("Substation OT Workstation", "substation"),
    "192.168.1.1": ("Substation Field Router", "substation"),
    "192.168.1.2": ("Substation RTU (field)", "substation"),
    "192.168.1.4": ("Breaker IED", "substation"),
    # Utility/CC network
    "10.0.0.1": ("Utility Border Router", "utility"),
    "10.0.0.2": ("Utility Router", "utility"),
    "10.1.0.1": ("Utility Router (IT)", "utility"),
    "10.1.0.2": ("DMZ Router (IT side)", "utility"),
    "10.11.0.1": ("DMZ Router (OT)", "utility"),
    "10.11.0.2": ("DER Router (DMZ side)", "utility"),
    "10.11.0.3": ("CC Router (DMZ side)", "utility"),
    "10.10.11.1": ("DER Router", "utility"),
    "10.10.11.2": ("DER Historian", "utility"),
    "10.10.11.3": ("DERMS", "utility"),
    "10.10.11.4": ("DER NTP", "utility"),
    "10.10.10.1": ("CC Router", "utility"),
    "10.10.10.2": ("CC Workstation", "utility"),
    "10.10.10.3": ("CC Historian", "utility"),
    "10.10.10.4": ("CC RTU", "utility"),
    "10.10.10.5": ("CC NTP", "utility"),
    # WAN backbone routers
    "100.0.0.9": ("Utility Border Router (WAN)", "infrastructure"),
    "100.0.0.10": ("Substation Border Router (WAN)", "infrastructure"),
    "100.0.0.8": ("Aggregator Router (WAN)", "infrastructure"),
    "100.0.0.1": ("WAN Gateway", "infrastructure"),
    # Management network
    "172.16.0.7": ("MGMT Gateway", "infrastructure"),
    "172.16.0.10": ("Breaker IED (MGMT)", "infrastructure"),
    "172.16.0.149": ("HELICS Broker", "infrastructure"),
    "172.16.0.33": ("Cosim Orchestrator", "infrastructure"),
}


def is_multicast(ip_str: str) -> bool:
    """Check if an IP is multicast/broadcast."""
    ip = ipaddress.IPv4Address(ip_str)
    return any(ip in net for net in MULTICAST_NETWORKS)


def parse_battery_mappings(attack_data_path: Path) -> dict[str, tuple[str, str, str]]:
    """Parse battery DNS->IP mappings from attack_data_ips.txt.

    Returns dict of {ip_str: (label, role, dns_name)}.
    dns_name is the building ID (e.g., "464636_1") used as FK to id_map.
    """
    mappings: dict[str, tuple[str, str, str]] = {}

    with attack_data_path.open("r") as f:
        for line in f:
            line = line.strip()
            # Match battery DNS entries: address=/loadid_N.sunshine.lab/40.X.0.90
            match = re.match(r"address=/(.+?)\.sunshine\.lab/([\d.]+)", line)
            if match:
                dns_name = match.group(1)
                ip = match.group(2)
                # Extract the load ID (e.g., "464636_1" -> "Battery 464636_1")
                mappings[ip] = (f"Battery {dns_name}", "battery", dns_name)

    return mappings


def build_registry(
    scenarios_dir: Path, id_map: dict[str, int] | None = None
) -> dict[str, NetworkEntity]:
    """Build the complete IP -> NetworkEntity registry.

    Args:
        scenarios_dir: Path to the scenarios directory containing attack_data_ips.txt.
        id_map: Optional mapping of grid component names to IDs. When provided,
                battery entities get their grid_component_id populated.

    Returns a dict keyed by IP address string.
    """
    registry: dict[str, NetworkEntity] = {}
    next_id = 1

    def add(ip: str, label: str, role: str, grid_component_id: int = 0):
        nonlocal next_id
        if ip not in registry:
            registry[ip] = NetworkEntity(
                id=next_id,
                ip_address=ip,
                label=label,
                role=role,
                grid_component_id=grid_component_id,
            )
            next_id += 1

    # 1. Key actors (hardcoded from attack_data_ips.txt)
    add("172.16.0.222", "Attacker", "attacker")
    add("172.16.0.4", "OEM (Sunshine)", "oem")
    add("172.16.0.1", "ISP DNS", "isp")
    add("172.16.0.2", "Utility (Aries Electric)", "utility")
    add("172.16.0.3", "Substation (sub1)", "substation")
    add("172.16.0.148", "Aggregator", "aggregator")
    add("172.0.0.57", "Aggregator (internal)", "aggregator")
    add("172.16.0.90", "Aggregator Router", "aggregator")

    # 2. Battery EMS devices (from attack_data_ips.txt)
    attack_data_path = scenarios_dir / "attack_data_ips.txt"
    if attack_data_path.exists():
        for ip, (label, role, dns_name) in parse_battery_mappings(
            attack_data_path
        ).items():
            grid_id = id_map.get(dns_name, 0) if id_map else 0
            add(ip, label, role, grid_component_id=grid_id)
            print(f"{ip}: {label}, {role}, {grid_id}")

    # 3. Infrastructure devices (from topology.yaml, hardcoded)
    for ip, (label, role) in INFRASTRUCTURE_IPS.items():
        add(ip, label, role)

    return registry


def classify_unknown_ip(ip_str: str) -> tuple[str, str]:
    """Classify an IP not in the registry by subnet.

    Returns (label, role).
    """
    ip = ipaddress.IPv4Address(ip_str)

    if ip in ipaddress.IPv4Network("40.0.0.0/8"):
        # Battery subnet but not a known EMS (.90) address
        subnet_id = int(ip_str.split(".")[1])
        return (f"Building {subnet_id} Host ({ip_str})", "battery_infra")
    elif ip in ipaddress.IPv4Network("172.16.0.0/16"):
        return (f"ISP Host ({ip_str})", "isp")
    elif ip in ipaddress.IPv4Network("172.0.0.0/16"):
        return (f"Aggregator Net ({ip_str})", "aggregator")
    elif ip in ipaddress.IPv4Network("100.0.0.0/16"):
        return (f"WAN Router ({ip_str})", "infrastructure")
    elif ip in ipaddress.IPv4Network("10.0.0.0/8"):
        return (f"Utility Host ({ip_str})", "utility")
    elif ip in ipaddress.IPv4Network("20.0.0.0/8"):
        return (f"Substation Host ({ip_str})", "substation")
    elif ip in ipaddress.IPv4Network("192.168.0.0/16"):
        return (f"Field Host ({ip_str})", "substation")
    else:
        return (f"Unknown ({ip_str})", "unknown")


def get_or_create_entity(
    registry: dict[str, NetworkEntity], ip_str: str
) -> NetworkEntity:
    """Get an entity from the registry, creating it if not present."""
    if ip_str not in registry:
        label, role = classify_unknown_ip(ip_str)
        max_id = max((e.id for e in registry.values()), default=0)
        registry[ip_str] = NetworkEntity(
            id=max_id + 1, ip_address=ip_str, label=label, role=role
        )
    return registry[ip_str]
