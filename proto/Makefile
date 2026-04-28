.PHONY: all
all: scenario_pb2.py feeder_pb2.py

scenario_pb2.py: scenario.proto
	protoc --python_out=. scenario.proto

feeder_pb2.py: feeder.proto
	protoc --python_out=. feeder.proto
