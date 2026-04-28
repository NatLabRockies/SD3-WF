import { sd3 } from './generated';

// ─── Shared types ──────────────────────────────────────────────────────────────

export type Phase = 'A' | 'B' | 'C';

export interface ComponentData {
	id: number;
	connections: FeederConnection[];
	/** Distance from source bus in meters. Populated by orient_connections(). */
	distance_from_source: number;
}

export interface FeederConnection {
	target: FeederComponent;
	phases: Set<Phase>;
	direction?: 'upstream' | 'downstream';
	reciprocal?: FeederConnection;
}

// ─── Component types ──────────────────────────────────────────────────────────

export interface BusComponent extends ComponentData {
	type: 'bus';
	/** SVG x coordinate from the feeder layout. */
	x: number;
	/** SVG y coordinate from the feeder layout. */
	y: number;
}

export interface LineComponent extends ComponentData {
	type: 'line';
	length_meters: number;
	/** The bus on the source side of this line. Populated by orient_connections(). */
	upstream_bus: BusComponent;
	/** The bus on the leaf side of this line. Populated by orient_connections(). */
	downstream_bus: BusComponent;
}

export interface LoadComponent extends ComponentData {
	type: 'load';
	/** The bus this load is connected to. */
	bus: BusComponent;
}

export interface CapacitorComponent extends ComponentData {
	type: 'capacitor';
	/** The bus this capacitor is connected to. */
	bus: BusComponent;
}

export interface TransformerComponent extends ComponentData {
	type: 'transformer';
}

export interface RegulatorComponent extends ComponentData {
	type: 'regulator';
	/** The transformer this regulator controls, if resolved. */
	transformer?: TransformerComponent;
}

export type FeederComponent =
	| BusComponent
	| LineComponent
	| LoadComponent
	| CapacitorComponent
	| TransformerComponent
	| RegulatorComponent;

// ─── Internal construction helpers ────────────────────────────────────────────

/**
 * Intermediate line record used only during construction. Holds the two bus
 * references resolved from the proto before orient_connections() can determine
 * which is upstream vs downstream.
 */
interface LineInit {
	from_bus: BusComponent;
	to_bus: BusComponent;
}

// ─── Feeder class ─────────────────────────────────────────────────────────────

export class Feeder {
	private components: Map<number, FeederComponent> = new Map();
	/** Raw bus references keyed by line id — used during orient_connections(). */
	private line_init: Map<number, LineInit> = new Map();
	readonly source_bus: BusComponent;

	constructor(private raw: sd3.Feeder) {
		// Pass 1 — buses (must be first so other passes can look them up)
		for (const bus of raw.buses) {
			if (!bus.id) continue;
			const component: BusComponent = {
				type: 'bus',
				id: bus.id,
				x: bus.x ?? 0,
				y: bus.y ?? 0,
				connections: [],
				distance_from_source: 0,
			};
			this.components.set(bus.id, component);
		}

		// Pass 2 — lines
		for (const line of raw.lines) {
			if (!line.id) continue;
			if (line.enabled === false) continue;

			const from_bus = line.fromBus ? this.resolve_bus(line.fromBus.busId) : undefined;
			const to_bus = line.toBus ? this.resolve_bus(line.toBus.busId) : undefined;

			if (!from_bus || !to_bus) {
				console.warn(`Line ${line.id}: could not resolve fromBus/toBus — skipping`);
				continue;
			}

			// upstream_bus / downstream_bus start as placeholders; orient_connections()
			// will swap them if needed once it knows which side faces the source.
			const component: LineComponent = {
				type: 'line',
				id: line.id,
				length_meters: line.lengthMeters ?? 0,
				upstream_bus: from_bus,
				downstream_bus: to_bus,
				connections: [],
				distance_from_source: 0,
			};

			// Build generic connections for traversal
			const from_conn = this.build_bus_connection(line.fromBus!);
			const to_conn = this.build_bus_connection(line.toBus!);
			component.connections = [from_conn, to_conn].filter((c): c is FeederConnection => c !== undefined);

			this.line_init.set(line.id, { from_bus, to_bus });
			this.components.set(line.id, component);
		}

		// Pass 3 — loads
		for (const load of raw.loads) {
			if (!load.id) continue;

			const bus = load.bus ? this.resolve_bus(load.bus.busId) : undefined;
			if (!bus) {
				console.warn(`Load ${load.id}: could not resolve bus — skipping`);
				continue;
			}

			const conn = this.build_bus_connection(load.bus!);
			const component: LoadComponent = {
				type: 'load',
				id: load.id,
				bus,
				connections: conn ? [conn] : [],
				distance_from_source: 0,
			};
			this.components.set(load.id, component);
		}

		// Pass 4 — capacitors
		for (const cap of raw.capacitors) {
			if (!cap.id) continue;

			const bus = cap.bus ? this.resolve_bus(cap.bus.busId) : undefined;
			if (!bus) {
				console.warn(`Capacitor ${cap.id}: could not resolve bus — skipping`);
				continue;
			}

			const conn = this.build_bus_connection(cap.bus!);
			const component: CapacitorComponent = {
				type: 'capacitor',
				id: cap.id,
				bus,
				connections: conn ? [conn] : [],
				distance_from_source: 0,
			};
			this.components.set(cap.id, component);
		}

		// Pass 5 — transformers
		for (const transformer of raw.transformers) {
			if (!transformer.id) continue;

			const component: TransformerComponent = {
				type: 'transformer',
				id: transformer.id,
				connections: [],
				distance_from_source: 0,
			};
			component.connections = (transformer.busConnections ?? [])
				.map((bc) => this.build_bus_connection(bc))
				.filter((c): c is FeederConnection => c !== undefined);
			this.components.set(transformer.id, component);
		}

		// Pass 6 — regulators
		for (const regulator of raw.regulators) {
			if (!regulator.id) continue;

			const transformer = regulator.transformerId
				? (this.components.get(regulator.transformerId) as TransformerComponent | undefined)
				: undefined;

			const component: RegulatorComponent = {
				type: 'regulator',
				id: regulator.id,
				transformer,
				connections: [],
				distance_from_source: 0,
			};
			if (transformer) {
				component.connections = [{ target: transformer, phases: new Set<Phase>() }];
			}
			this.components.set(regulator.id, component);
		}

		this.add_reciprocal_connections();
		this.orient_connections();
		this.prune_lonely_components();

		// Free construction-time data
		this.line_init.clear();

		const source_bus_component = this.components.get(this.raw.sourceBusId);
		if (!source_bus_component || source_bus_component.type !== 'bus') {
			throw new Error('Source bus must be a bus');
		}
		this.source_bus = source_bus_component;
	}

	// ─── Public API ─────────────────────────────────────────────────────────────

	public get_components(): IterableIterator<FeederComponent> {
		return this.components.values();
	}

	public get_components_by_type<T extends FeederComponent['type']>(type: T) {
		return Array.from(this.components.values()).filter(
			(c): c is FeederComponent & { type: T } => c.type === type
		);
	}

	public get_component_by_id(id: number): FeederComponent | undefined {
		return this.components.get(id);
	}

	/**
	 * Depth-first walk from a starting component following oriented connections.
	 * Returns the accumulated values from leaf nodes.
	 */
	public walk<T = void>(
		callback: (
			component: FeederComponent,
			hops: number,
			distance: number,
			accumulator: T | undefined
		) => T,
		settings: {
			starting_component?: FeederComponent;
			direction?: 'upstream' | 'downstream';
			starting_distance?: number;
			starting_hops?: number;
			starting_accumulator?: T;
		} = {}
	): T[] {
		const direction = settings.direction ?? 'downstream';
		const origin = settings.starting_component ?? this.components.get(this.raw.sourceBusId!)!;
		const hops = settings.starting_hops ?? 0;
		const distance = settings.starting_distance ?? 0;

		const acc = callback(origin, hops, distance, settings.starting_accumulator);

		const next_distance = distance + (origin.type === 'line' ? origin.length_meters : 0);
		const children = origin.connections.filter((c) => c.direction === direction);

		if (children.length === 0) {
			return [acc];
		}

		return children.flatMap((connection) =>
			this.walk(callback, {
				starting_component: connection.target,
				direction,
				starting_distance: next_distance,
				starting_hops: hops + 1,
				starting_accumulator: acc,
			})
		);
	}

	// ─── Private helpers ─────────────────────────────────────────────────────────

	/** Look up a bus by ID. Returns undefined (with optional warning) if not found. */
	private resolve_bus(bus_id: number | null | undefined): BusComponent | undefined {
		if (!bus_id) return undefined;
		const component = this.components.get(bus_id);
		if (!component || component.type !== 'bus') {
			console.warn(`Could not resolve bus id ${bus_id}`);
			return undefined;
		}
		return component;
	}

	/** Build a generic FeederConnection from a proto BusConnection. */
	private build_bus_connection(bc: sd3.IBusConnection): FeederConnection | undefined {
		const target = this.resolve_bus(bc.busId ?? undefined);
		if (!target) return undefined;

		const phases = new Set<Phase>();
		if (bc.phaseA) phases.add('A');
		if (bc.phaseB) phases.add('B');
		if (bc.phaseC) phases.add('C');

		return { target, phases };
	}

	private add_reciprocal_connections() {
		for (const component of this.components.values()) {
			for (const connection of component.connections) {
				const already_has_reciprocal = connection.target.connections.some(
					(c) => c.target === component
				);
				if (already_has_reciprocal) continue;

				const reciprocal: FeederConnection = {
					target: component,
					reciprocal: connection,
					phases: new Set(connection.phases),
				};
				connection.reciprocal = reciprocal;
				connection.target.connections.push(reciprocal);
			}
		}
	}

	private orient_connections() {
		const source = this.components.get(this.raw.sourceBusId!)!;
		source.distance_from_source = 0;

		// Iterative DFS. Each stack entry is the component to process.
		const stack: FeederComponent[] = [source];

		while (stack.length > 0) {
			const current = stack.pop()!;

			const distance_from_source = current.distance_from_source;
			const next_distance =
				distance_from_source +
				(current.type === 'line' ? current.length_meters : 0);

			for (const connection of current.connections) {
				if (connection.direction !== undefined) continue; // already oriented

				connection.direction = 'downstream';
				connection.reciprocal!.direction = 'upstream';
				connection.target.distance_from_source = next_distance;

				if (connection.target.type === 'line') {
					const line = connection.target as LineComponent;
					const init = this.line_init.get(line.id);
					if (init) {
						const upstream_bus = this.find_nearest_upstream_bus(current);
						if (upstream_bus) {
							if (init.from_bus === upstream_bus || init.to_bus !== upstream_bus) {
								line.upstream_bus = init.from_bus;
								line.downstream_bus = init.to_bus;
							} else {
								line.upstream_bus = init.to_bus;
								line.downstream_bus = init.from_bus;
							}
						}
					}
				}

				stack.push(connection.target);
			}
		}
	}

	/**
	 * Walk upstream from a component to find the nearest bus ancestor.
	 * Iterative with a visited set to avoid cycles in unoriented portions of the graph.
	 */
	private find_nearest_upstream_bus(component: FeederComponent): BusComponent | undefined {
		const visited = new Set<number>();
		const stack: FeederComponent[] = [component];

		while (stack.length > 0) {
			const current = stack.pop()!;
			if (visited.has(current.id)) continue;
			visited.add(current.id);

			if (current.type === 'bus') return current;

			for (const connection of current.connections) {
				if (connection.direction === 'upstream' || connection.direction === undefined) {
					stack.push(connection.target);
				}
			}
		}

		return undefined;
	}

	private prune_lonely_components() {
		const touched_ids = new Set<number>();
		this.walk((component) => {
			touched_ids.add(component.id);
		});
		for (const [id] of this.components) {
			if (!touched_ids.has(id)) {
				this.components.delete(id);
			}
		}
	}

	public static async load(feeder_path: string): Promise<Feeder> {
		const response = await fetch(feeder_path);
		const buffer = await response.arrayBuffer();
		const raw = sd3.Feeder.decode(new Uint8Array(buffer));
		return new Feeder(raw);
	}
}
