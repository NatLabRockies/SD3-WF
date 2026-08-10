from pathlib import Path
from scenario import Scenario
from constants import START_TIME, END_TIME
from ip_registry import build_registry
from cyber import pack_cyber
import json
import scenario_pb2
import csv

scenarios_dir = Path("scenarios")
output_dir = Path("outputs")
id_map_file = output_dir / "id_mapping.csv"
scenarios: dict[str, Scenario] = {}

id_map: dict[str, int] = {}

with id_map_file.open("r") as csv_file:
    reader = csv.reader(csv_file)
    for row in reader:
        id_map[row[0]] = int(row[1])

# Build IP registry for cyber data processing
cyber_registry = build_registry(scenarios_dir, id_map)
print(f"Built cyber registry with {len(cyber_registry)} known entities")

for scenario_dir in scenarios_dir.iterdir():
    if not scenario_dir.is_dir():
        continue
    scenario_manifest = scenario_dir / "scenario.json"
    print(f"Processing scenario: {scenario_dir.name}")
    scenario = Scenario(scenario_dir)
    scenarios[scenario_dir.name] = scenario

    proto_scenario = scenario_pb2.Scenario()
    proto_scenario.name = scenario_dir.name
    proto_scenario.start_time = int(START_TIME.timestamp())
    proto_scenario.end_time = int(END_TIME.timestamp())

    if scenario_manifest.exists():
        scenario_json: dict = json.load(scenario_manifest.open())
        proto_scenario.name = scenario_json.get("name", scenario_dir.name)
        print(f"Scenario Name {proto_scenario.name}")
    scenario.pack(proto_scenario, id_map)
    scenario.pack_batteries(proto_scenario, id_map)

    # Pack cyber data from PCAP
    cyber_registry = pack_cyber(proto_scenario, scenario_dir, cyber_registry)

    output_file = output_dir / f"{scenario_dir.name}.buff"

    with output_file.open("wb") as f:
        f.write(proto_scenario.SerializeToString())
    print(f"  Wrote {output_file} ({output_file.stat().st_size:,} bytes)")
