`matched_loads_mid_with_buildings_1.xlsx` - Gives what bus a particular building load is on
Buildings show up in loads with `load_id`s.

# Topology

- Loads - only connected to buses
- Buses - can be connected to any other component

Building Load -> (bus) -> Line (exception if there is a service transformer)
Transformer -> (bus) -> Line
Lines -> (bus) -> Lines

# Loads

represent buildings in most cases. Connected to lines through buses.

# Lines

Physical connections between points.

# Protections

Provide point protection to expensive equipment.
In the cyber range they are modeling relays.

Subtypes:

- Breakers
- Fuses: melt in overcurrent situations
- Reclosers: can automatically reset after a fault
- Switches: can change the configuration of a network

Control Stuff:
Relays: Have logic, can be remotely controlled

# Capacitors

Increase voltage
Shift the waveform to improve power factor.
Mostly on longer runs

# Transformers

Change voltage levels:

- Service Transformer
- Substation
- Medium voltage transformer

  12.47kV is backbone voltage
  7.2kV is branch voltage
  240-480V is service voltage

# Voltage Regulators

At substations, transformer with multiple taps to adjust voltage levels.

# Circuit

Everything

# OpenDSS File Structure

## Types

### Capacitors

- `Bus1` is the bus it is connected to

### Lines

- `bus1` and `bus2` are the connected buses
- `Length` and `Units` give the length of the line

### Loads

- `bus1` is the bus it is connected to

### Regulators

- `transformer` what transformer is it associated with

### Transformers

- `busses` array of busses it is connected to
- `conns` array of connection types for each bus (wye, delta, etc)
- `kvs` array of voltage levels for each bus

### Busses

## Processing steps

###
