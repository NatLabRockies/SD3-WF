import { sd3 } from '$lib/generated';
import { CyberData, type EntityFlow, type NetworkEntity } from '$lib/cyber';
import type { FeederComponent } from './feeder';
import * as d3 from 'd3';

// ---------------------------------------------------------------------------
// Assertion helper — throws on null/undefined instead of silently coalescing.
// Use for required proto fields; ?? 0 only for semantically optional data.
// ---------------------------------------------------------------------------

function required<T>(value: T | null | undefined, label: string): T {
	if (value == null) throw new Error(`required field missing: ${label}`);
	return value;
}

// ---------------------------------------------------------------------------
// Shared base interface — all time-series points carry seconds
// ---------------------------------------------------------------------------

export interface HasSeconds {
	seconds: number;
}

// ---------------------------------------------------------------------------
// Grid component time-point types
// ---------------------------------------------------------------------------

/** Shared base for grid power components (line, load, transformer). */
export interface PowerTimePoint extends HasSeconds {
	voltage: number;
	current: number;
	active_power: number;
	reactive_power: number;
}

/** Line-specific time point. Currently identical to PowerTimePoint but
 *  exists as a separate type so fields can be added without refactoring. */
export interface LineTimePoint extends PowerTimePoint {}

/** Transformer-specific time point. */
export interface TransformerTimePoint extends PowerTimePoint {}

/** Load-specific time point. */
export interface LoadTimePoint extends PowerTimePoint {}

/** Bus time point — voltage only. */
export interface BusTimePoint extends HasSeconds {
	voltage: number;
}

/** Capacitor time point. */
export interface CapacitorTimePoint extends HasSeconds {
	voltage: number;
	current: number;
	power: number;
}

/** Breaker time point. */
export interface BreakerTimePoint extends HasSeconds {
	voltage: number;
	current: number;
	power: number;
	status: boolean;
}

/** Regulator time point. */
export interface RegulatorTimePoint extends HasSeconds {
	voltage: number;
	current: number;
	power: number;
	status: number;
}

// ---------------------------------------------------------------------------
// Component time-series data — discriminated union
// ---------------------------------------------------------------------------

export interface BusTimeSeriesData {
	type: 'bus';
	timeseries: BusTimePoint[];
}

export interface LineTimeSeriesData {
	type: 'line';
	timeseries: LineTimePoint[];
}

export interface LoadTimeSeriesData {
	type: 'load';
	timeseries: LoadTimePoint[];
	/** Battery attached to this load (via shared ID), if any. */
	battery?: BatteryData;
	/** Building attached to this load (via shared ID), if any. */
	building?: BuildingData;
	cyber?: CyberEntityData;
}

export interface CapacitorTimeSeriesData {
	type: 'capacitor';
	timeseries: CapacitorTimePoint[];
}

export interface TransformerTimeSeriesData {
	type: 'transformer';
	timeseries: TransformerTimePoint[];
}

export type ComponentTimeSeriesData =
	| BusTimeSeriesData
	| LineTimeSeriesData
	| LoadTimeSeriesData
	| CapacitorTimeSeriesData
	| TransformerTimeSeriesData;

// ---------------------------------------------------------------------------
// Battery types
// ---------------------------------------------------------------------------

/** One time-step of battery EMS data for a single battery. */
export interface BatteryTimePoint extends HasSeconds {
	/** EMS setChargeDischargeRate command received (W) */
	received_signal: number;
	/** Operating mode — 0=IDLE, 1=DISCHARGING, 2=CHARGING (per proto enum) */
	status: number;
	/** State of charge, 0–1 fraction */
	state_of_charge: number;
	/** Active power (W) */
	active_power: number;
	/** Reactive power (W) */
	reactive_power: number;
}

export interface CyberEntityData {
	id: number;
	entity: NetworkEntity;
	flows: EntityFlow[];
}

/** All time-steps for one battery. */
export interface BatteryData {
	id: number;
	timeseries: BatteryTimePoint[];
}

// ---------------------------------------------------------------------------
// Building types
// ---------------------------------------------------------------------------

export interface BuildingTimePoint extends HasSeconds {
	power: number;
	net_power: number;
	purchased_power: number;
	surplus_power: number;
}

export interface BuildingData {
	id: number;
	timeseries: BuildingTimePoint[];
}

// ---------------------------------------------------------------------------
// Battery fleet aggregate
// ---------------------------------------------------------------------------

/** Per-timestep aggregate across the full 43-battery fleet. */
export interface BatteryFleetPoint extends HasSeconds {
	/** Mean EMS command signal across all batteries (W) */
	avg_received_signal: number;
	/** Mean state of charge across all batteries (0–1) */
	avg_state_of_charge: number;
	/** Sum of active power across all batteries (W) */
	total_active_power: number;
	/** Sum of reactive power across all batteries (W) */
	total_reactive_power: number;

	frac_state: {
		idle: number;
		charging: number;
		discharging: number;
	};
}

// ---------------------------------------------------------------------------
// Seek helper — binary search for nearest time point
// ---------------------------------------------------------------------------

const seconds_bisector = d3.bisector<HasSeconds, number>((d) => d.seconds);

export function seek<T extends HasSeconds>(timeseries: T[], seconds: number): T | null {
	if (timeseries.length === 0) return null;
	const idx = seconds_bisector.center(timeseries, seconds);
	return timeseries[idx];
}

// ---------------------------------------------------------------------------
// Scenario class
// ---------------------------------------------------------------------------

export class Scenario {
	readonly name: string;
	readonly start_date: Date;
	readonly end_date: Date;
	readonly components: Map<number, ComponentTimeSeriesData> = new Map();
	readonly batteries: Map<number, BatteryData> = new Map();
	readonly battery_fleet: BatteryFleetPoint[] = [];
	readonly buildings: Map<number, BuildingData> = new Map();
	readonly building_fleet: BuildingTimePoint[] = [];
	/** Set of load IDs that have an attached battery. */
	readonly battery_loads: Set<number> = new Set();
	readonly cyber: CyberData;

	constructor(
		scenario: sd3.Scenario,
		public path: string
	) {
		if (!scenario.name) throw new Error('Scenario must have a name');
		if (!scenario.startTime) throw new Error('Scenario must have a start time');

		this.name = scenario.name;
		this.start_date = new Date((scenario.startTime as number) * 1000);
		this.end_date = new Date((scenario.endTime as number) * 1000);

		// --- Grid components ---

		for (const bus of scenario.buses) {
			if (!bus.timeseries || !bus.id) continue;
			this.components.set(bus.id, {
				type: 'bus',
				timeseries: bus.timeseries.map((tp) => ({
					seconds: required(tp.seconds, 'bus.seconds'),
					voltage: required(tp.voltage, 'bus.voltage')
				}))
			});
		}

		for (const line of scenario.lines) {
			if (!line.timeseries || !line.id) continue;
			this.components.set(line.id, {
				type: 'line',
				timeseries: line.timeseries.map((tp) => ({
					seconds: required(tp.seconds, 'line.seconds'),
					voltage: required(tp.voltage, 'line.voltage'),
					current: required(tp.current, 'line.current'),
					active_power: required(tp.activePower, 'line.activePower'),
					reactive_power: required(tp.reactivePower, 'line.reactivePower')
				}))
			});
		}

		for (const load of scenario.loads) {
			if (!load.timeseries || !load.id) continue;
			this.components.set(load.id, {
				type: 'load',
				timeseries: load.timeseries.map((tp) => ({
					seconds: required(tp.seconds, 'load.seconds'),
					voltage: required(tp.voltage, 'load.voltage'),
					current: required(tp.current, 'load.current'),
					active_power: required(tp.activePower, 'load.activePower'),
					reactive_power: required(tp.reactivePower, 'load.reactivePower')
				}))
			});
		}

		for (const cap of scenario.capacitors) {
			if (!cap.timeseries || !cap.id) continue;
			this.components.set(cap.id, {
				type: 'capacitor',
				timeseries: cap.timeseries.map((tp) => ({
					seconds: required(tp.seconds, 'cap.seconds'),
					voltage: required(tp.voltage, 'cap.voltage'),
					current: required(tp.current, 'cap.current'),
					power: required(tp.power, 'cap.power')
				}))
			});
		}

		for (const xfmr of scenario.transformers) {
			if (!xfmr.timeseries || !xfmr.id) continue;
			this.components.set(xfmr.id, {
				type: 'transformer',
				timeseries: xfmr.timeseries.map((tp) => ({
					seconds: required(tp.seconds, 'xfmr.seconds'),
					voltage: required(tp.voltage, 'xfmr.voltage'),
					current: required(tp.current, 'xfmr.current'),
					active_power: required(tp.activePower, 'xfmr.activePower'),
					reactive_power: required(tp.reactivePower, 'xfmr.reactivePower')
				}))
			});
		}

		// --- Batteries ---

		for (const b of scenario.batteries) {
			if (!b.id || !b.timeseries || b.timeseries.length === 0) continue;
			this.batteries.set(b.id, {
				id: b.id,
				timeseries: b.timeseries.map((tp) => ({
					seconds: required(tp.seconds, 'battery.seconds'),
					received_signal: required(tp.receivedSignal, 'battery.receivedSignal'),
					status: tp.status ?? 0,
					state_of_charge: required(tp.stateOfCharge, 'battery.stateOfCharge'),
					active_power: required(tp.activePower, 'battery.activePower'),
					reactive_power: required(tp.reactivePower, 'battery.reactivePower')
				}))
			});
		}

		// --- Buildings ---

		for (const b of scenario.buildings) {
			if (!b.id || !b.timeseries) continue;
			this.buildings.set(b.id, {
				id: b.id,
				timeseries: b.timeseries.map((tp, i) => {
					const point: BuildingTimePoint = {
						seconds: required(tp.seconds, 'building.seconds'),
						power: tp.power ?? 0,
						net_power: tp.netPower ?? 0,
						purchased_power: tp.purchasedPower ?? 0,
						surplus_power: tp.surplusPower ?? 0
					};
					if (this.building_fleet.length <= i) {
						this.building_fleet[i] = { ...point };
					} else {
						const fleet_point = this.building_fleet[i];
						fleet_point.power += point.power;
						fleet_point.net_power += point.net_power;
						fleet_point.purchased_power += point.purchased_power;
						fleet_point.surplus_power += point.surplus_power;
					}
					return point;
				})
			});
		}

		// --- Battery fleet aggregate ---

		if (this.batteries.size > 0) {
			const battery_list = Array.from(this.batteries.values());
			const n = battery_list.length;
			const ref = battery_list[0].timeseries;
			(this.battery_fleet as BatteryFleetPoint[]) = ref.map((_, i) => {
				let sum_signal = 0,
					sum_soc = 0,
					sum_active = 0,
					sum_reactive = 0;
				let n_charging = 0,
					n_discharging = 0;
				for (const bat of battery_list) {
					const tp = bat.timeseries[i];
					if (!tp) continue;
					sum_signal += tp.received_signal;
					sum_soc += tp.state_of_charge;
					sum_active += tp.active_power;
					sum_reactive += tp.reactive_power;
					if (tp.status === 2) n_charging++;
					if (tp.status === 1) n_discharging++;
				}
				return {
					seconds: ref[i].seconds,
					avg_received_signal: sum_signal / n,
					avg_state_of_charge: sum_soc / n,
					total_active_power: sum_active,
					total_reactive_power: sum_reactive,
					frac_state: {
						charging: n_charging / n,
						discharging: n_discharging / n,
						idle: (n - n_charging - n_discharging) / n
					}
				};
			});
		}

		// --- Attach batteries and buildings to their corresponding loads ---
		// Building/battery IDs share the same numeric ID as their load in id_mapping.csv.

		for (const [id, battery] of this.batteries) {
			const component = this.components.get(id);
			if (component && component.type === 'load') {
				component.battery = battery;
				this.battery_loads.add(id);
			}
		}

		for (const [id, building] of this.buildings) {
			const component = this.components.get(id);
			if (component && component.type === 'load') {
				component.building = building;
			}
		}

		this.cyber = new CyberData(scenario.cyber);
		this.cyber.entities.forEach((entity) => {
			const component = this.components.get(entity.grid_component_id);
			if (entity.grid_component_id === 0 || !component) return;
			if (component.type === 'load') {
				component.cyber = {
					id: entity.id,
					entity: this.cyber.entities.get(entity.id)!,
					flows: this.cyber.entity_flows.filter((flow) => {
						return flow.dest_id === entity.id || flow.source_id === entity.id;
					})
				};
			}
		});
	}

	public get_components_by_type<T extends ComponentTimeSeriesData['type']>(type: T) {
		return Array.from(this.components.values()).filter(
			(c): c is ComponentTimeSeriesData & { type: T } => c.type === type
		);
	}

	public get_data_for_component<T extends FeederComponent>(
		component: T
	): (ComponentTimeSeriesData & { type: T['type'] }) | undefined {
		const data = this.components.get(component.id);
		if (!data || data.type !== component.type) {
			return undefined;
		}
		return data;
	}
	public seconds_to_date(seconds: number): Date {
		return new Date(this.start_date.getTime() + seconds * 1000);
	}

	public date_to_seconds(date: Date): number {
		return Math.floor((date.getTime() - this.start_date.getTime()) / 1000);
	}

	public static async load(scenario_path: string): Promise<Scenario> {
		const response = await fetch(scenario_path);
		const buffer = await response.arrayBuffer();
		const scenario = sd3.Scenario.decode(new Uint8Array(buffer));
		return new Scenario(scenario, scenario_path);
	}
}
