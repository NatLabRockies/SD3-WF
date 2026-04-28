scenario_buffs = outputs/api-attack.buff outputs/api-mitigation.buff outputs/dns-attack.buff outputs/dns-mitigation.buff outputs/baseline.buff 


.PHONY: all
all: outputs/feeder.buff outputs/api-attack.buff outputs/api-mitigation.buff outputs/dns-attack.buff outputs/dns-mitigation.buff outputs/baseline.buff
.PHONY: scenarios
scenarios: $(scenario_buffs)
outputs/feeder.buff: dss.py feeder_pb2.py dss/*
	.venv/bin/python3 dss.py

$(scenario_buffs): scenarios/* outputs/id_mapping.csv scenario_pb2.py main.py scenario.py building.py cyber.py ip_registry.py
	.venv/bin/python3 main.py
