# Todo List

## User Interface

- [ ] Map view
  - [ ] Place things on the screen
  - [x] Have it scrollable and zoomable
  - [ ] Minimap?
  - [ ] Respond to resizing
- [ ] Graph View
  - [ ] Layout
  - [ ] Organization
  - [ ] Get a data to show in a component
  - [ ] Graph Types
    - [ ] Simple time vs value (Power, Voltage, Signals)
    - [ ] Chord diagram for network traffic
- [ ] Enable automation of certain actions
  - [ ] Enable/disable interaction with certain elements
  - [ ] Open Dialog to prompt actions
  - [ ] move map viewport to certain item

## Plumbing

- [ ] Figure out how the global state will be shared across components
  - [ ] Adding data from the map view to the graph views
- [ ] Figure out why serviceworker isn't workig on firefox

## Data

- [x] Get DSS Files
- [x] Serialize DSS Files to binary

## Map Behaviors

### Resize of map

This behavior is not for the user to have complete control over the viewport. Instead we may have the same map in several different scales and want to be able to move between them without losing context. To do this the viewport with have:

- The map shall have an X and Y coordinate which correspond to the center of the viewport
- Scaling of the canvas up or down should maintain the center

### Zooming

- When zooming in or out the mouse cursor should remain over the same point on the map
- if zooming out would reveal area outside the map, let it.
