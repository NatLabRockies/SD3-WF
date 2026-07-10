import { type Axis } from '$lib/charts';
import { app_state } from './state.svelte';
import * as colors from '$lib/colors';
import type {
	BuildingData,
	BatteryData,
	BatteryFleetPoint,
	BatteryTimePoint,
	BuildingTimePoint,
	LineTimeSeriesData,
	BusTimeSeriesData,
	BusTimePoint,
	Scenario,
	LineTimePoint
} from '$lib/scenario';
import {
	AppProtocol,
	APP_PROTOCOL_LABELS,
	APP_PROTOCOL_COLORS,
	get_flow_protocols
} from '$lib/cyber';
import type { EntityFlow, TrafficPoint } from '$lib/cyber';

function resolve_pair<T extends Object, V extends string>(
	get_data: (scenario: Scenario, id: number) => T | undefined,
	baseline_or_id: T | number,
	scenario_or_variable_name: T | V,
	variable_name?: V
): { baseline: T | undefined; scenario: T | undefined; variable_name: V } {
	let baseline: T | undefined;
	let scenario: T | undefined;
	if (typeof baseline_or_id === 'number') {
		const id = baseline_or_id;
		baseline = get_data(app_state.baseline_scenario, id);
		scenario = get_data(app_state.scenario, id);
		if (typeof scenario_or_variable_name !== 'string') {
			throw Error('Argument 2 must be a valid variable_name');
		}
		variable_name = scenario_or_variable_name;
	} else {
		if (typeof scenario_or_variable_name === 'string') {
			throw Error('Argument 2 must be BuildingData');
		}
		baseline = baseline_or_id;
		scenario = scenario_or_variable_name;
		if (!variable_name) {
			throw Error('Argument 3 must be a valid variable_name');
		}
	}
	return {
		baseline,
		scenario,
		variable_name
	};
}

export function network_traffic(
	traffic_points: TrafficPoint[],
	variable_name: NetworkVariable = 'bytes'
): Axis<TrafficPoint> {
	if (variable_name === 'protocols') {
		const protocols = traffic_points.reduce((protocols, point) => {
			const _protocols = Object.keys(point.protocols) as unknown as Array<
				keyof TrafficPoint['protocols']
			>;
			return new Set(_protocols).union(protocols);
		}, new Set<AppProtocol>());
		return {
			title: 'Traffic by Protocol',
			units: 'kbps',
			series: Array.from(protocols).map((protocol) => ({
				data: traffic_points,
				name: APP_PROTOCOL_LABELS[protocol],
				color: APP_PROTOCOL_COLORS[protocol],
				y_accessor: (d: TrafficPoint) => ((d.protocols[protocol]?.bytes || 0) * 8) / 1000 / 60
			})),
			y_accessor: () => 0
		};
	}
	const y_accessor: { [variable_name]: (d: TrafficPoint) => number } = {
		bytes: (d) => (d.bytes * 8) / 1000 / 60,
		packets: (d) => d.packets / 60,
		resets: (d) => d.rst_count / 60
	};
	const units = {
		bytes: 'kbps',
		packets: 'pps',
		resets: 'RST/s',
		protocols: 'kbps'
	}[variable_name];
	const color = {
		bytes: colors.on_surface.to_css(),
		packets: colors.on_surface.to_css(),
		resets: colors.red.to_css()
	}[variable_name];
	return {
		title: 'Total Network Traffic',
		units,
		series: [
			{
				data: traffic_points,
				name: 'Total',
				color
			}
		],
		y_accessor: y_accessor[variable_name]
	};
}

export type NetworkVariable = 'bytes' | 'packets' | 'resets' | 'protocols';
export function network_entity_flows(
	entity_flows: EntityFlow[],
	perspective_id: number,
	variable_name: NetworkVariable = 'bytes'
): Axis<TrafficPoint> | undefined {
	const perspective_entity = app_state.scenario.cyber.entities.get(perspective_id);
	const every_entity_exists = entity_flows.every(
		(flow) =>
			app_state.scenario.cyber.entities.has(flow.source_id) &&
			app_state.scenario.cyber.entities.has(flow.dest_id)
	);
	if (!perspective_entity || !every_entity_exists) return undefined;

	function perspective_title(flow: EntityFlow) {
		return flow.source_id === perspective_entity!.id
			? `To ${app_state.scenario.cyber.entities.get(flow.dest_id)!.label}`
			: `From ${app_state.scenario.cyber.entities.get(flow.source_id)!.label}`;
	}

	if (variable_name === 'protocols') {
		return {
			series: entity_flows.flatMap((flow) => {
				const protocols = get_flow_protocols(flow);
				const name_suffix = perspective_title(flow);
				return Array.from(protocols).map((protocol): Axis<TrafficPoint>['series'][number] => ({
					data: flow.timeseries,
					name: `${APP_PROTOCOL_LABELS[protocol]} ${name_suffix}`,
					color: APP_PROTOCOL_COLORS[protocol],
					y_accessor: (d) => ((d.protocols[protocol]?.bytes || 0) * 8) / 1000 / 60
				}));
			}),
			y_accessor: () => 0,
			title: `Network Traffic by Device and Protocol`,
			units: 'kbps'
		};
	}
	const y_accessor: { [variable_name]: (d: TrafficPoint) => number } = {
		bytes: (d) => (d.bytes * 8) / 1000 / 60,
		packets: (d) => d.packets / 60,
		resets: (d) => d.rst_count / 60
	};
	const units = {
		bytes: 'kbps',
		packets: 'pps',
		resets: 'RST/s',
		protocols: 'kbps'
	}[variable_name];
	const title = {
		bytes: `Network Traffic with ${perspective_entity.label}`,
		packets: `Network Traffic with ${perspective_entity.label}`,
		resets: `Connection Resets with ${perspective_entity.label}`,
		protocols: `Protocol Breakdown for `
	}[variable_name];
	return {
		title,
		units,
		series: entity_flows.map((flow, i) => ({
			data: flow.timeseries,
			name:
				flow.source_id === perspective_entity.id
					? `To ${app_state.scenario.cyber.entities.get(flow.dest_id)!.label}`
					: `From ${app_state.scenario.cyber.entities.get(flow.source_id)!.label}`,
			color: colors.series[i % colors.series.length].to_css()
		})),

		y_accessor: y_accessor[variable_name]
	};
}

type LineVariable = Exclude<keyof LineTimePoint, 'seconds'>;
export function line(id: number, variable_name: LineVariable): Axis<LineTimePoint> | undefined;
export function line(
	baseline: LineTimeSeriesData,
	scenario: LineTimeSeriesData,
	variable_name: LineVariable
): Axis<LineTimePoint>;

export function line(
	baseline_or_id: LineTimeSeriesData | number,
	scenario_or_variable_name: LineTimeSeriesData | LineVariable,
	variable_name?: LineVariable
): Axis<LineTimePoint> | undefined {
	const { baseline, scenario, ...params } = resolve_pair(
		(s, id) => s.components.get(id) as LineTimeSeriesData,
		baseline_or_id,
		scenario_or_variable_name,
		variable_name
	);
	if (!baseline || !scenario) {
		return undefined;
	}
	variable_name = params.variable_name;
	const title = {
		voltage: 'Line Voltage',
		current: 'Line Current',
		active_power: 'Line Active Power',
		reactive_power: 'Line Reactive Power'
	}[variable_name];
	const units = {
		voltage: 'p.u.',
		current: 'A',
		active_power: 'kW',
		reactive_power: 'kVAR'
	}[variable_name];

	const a: Axis<LineTimeSeriesData['timeseries'][number]> = {
		title,
		units,
		series: [
			{
				name: app_state.scenario.name,
				color: colors.scenario.to_css(),
				data: scenario.timeseries || []
			},
			{
				name: app_state.baseline_scenario.name,
				color: colors.baseline.to_css(),
				data: baseline.timeseries || []
			}
		],
		y_accessor: (d) => d[variable_name]
	};

	if (variable_name === 'voltage') {
		a.y_range = [1.0, 1.05];
	}
	return a;
}

type BusVariable = Exclude<keyof BusTimePoint, 'seconds'>;
export function bus(id: number, variable_name: BusVariable): Axis<BusTimePoint> | undefined;
export function bus(
	baseline: BusTimeSeriesData,
	scenario: BusTimeSeriesData,
	variable_name: BusVariable
): Axis<BusTimePoint>;

export function bus(
	baseline_or_id: BusTimeSeriesData | number,
	scenario_or_variable_name: BusTimeSeriesData | BusVariable,
	variable_name?: BusVariable
): Axis<BusTimePoint> | undefined {
	const { baseline, scenario, ...params } = resolve_pair(
		(s, id) => s.components.get(id) as BusTimeSeriesData,
		baseline_or_id,
		scenario_or_variable_name,
		variable_name
	);
	if (!baseline || !scenario) {
		return undefined;
	}
	variable_name = params.variable_name;
	const title = {
		voltage: 'Bus Voltage',
		current: 'Bus Current',
		active_power: 'Bus Active Power',
		reactive_power: 'Bus Reactive Power'
	}[variable_name];
	const units = {
		voltage: 'p.u.',
		current: 'A',
		active_power: 'kW',
		reactive_power: 'kVAR'
	}[variable_name];

	const a: Axis<BusTimeSeriesData['timeseries'][number]> = {
		title,
		units,
		series: [
			{
				name: app_state.scenario.name,
				color: colors.scenario.to_css(),
				data: scenario.timeseries || []
			},
			{
				name: app_state.baseline_scenario.name,
				color: colors.baseline.to_css(),
				data: baseline.timeseries || []
			}
		],
		y_accessor: (d) => d[variable_name]
	};

	if (variable_name === 'voltage') {
		a.y_range = [1.0, 1.05];
	}
	return a;
}

export type BuildingVariable = Exclude<keyof BuildingTimePoint, 'seconds'>;
export function building(
	id: number,
	variable_name: BuildingVariable
): undefined | Axis<BuildingTimePoint>;
export function building(
	baseline: BuildingData,
	scenario: BuildingData,
	variable_name: BuildingVariable
): Axis<BuildingTimePoint>;
export function building(
	baseline_or_id: BuildingData | number,
	scenario_or_variable_name: BuildingData | BuildingVariable,
	variable_name?: BuildingVariable
): Axis<BuildingTimePoint> | undefined {
	const { baseline, scenario, ...params } = resolve_pair(
		(s, id) => s.buildings.get(id),
		baseline_or_id,
		scenario_or_variable_name,
		variable_name
	);
	if (!baseline || !scenario) {
		return undefined;
	}
	variable_name = params.variable_name;
	const title = {
		power: 'Power',
		net_power: 'Net Power',
		purchased_power: 'purchased_power',
		surplus_power: 'Surplus Power'
	}[variable_name];

	const units = {
		power: 'kW',
		net_power: 'kW',
		purchased_power: 'kW',
		surplus_power: 'kW'
	}[variable_name];
	return {
		title,
		units,
		series: [
			{
				name: app_state.scenario.name,
				data: scenario.timeseries,
				color: colors.scenario.to_css()
			},
			{
				name: app_state.baseline_scenario.name,
				data: baseline.timeseries,
				color: colors.baseline.to_css()
			}
		],
		y_accessor: (d) => d[variable_name]
	};
}

export function building_fleet(variable_name: BuildingVariable): Axis<BuildingTimePoint> {
	const y_accessor: { [variable_name]: Axis<BuildingTimePoint>['y_accessor'] } = {
		power: (d) => d.power,
		net_power: (d) => d.net_power
	};
	const title = {
		power: 'Building Power',
		net_power: 'Building Net Power',
		surplus_power: 'Surplus Power',
		purchased_power: 'Purchased Power'
	}[variable_name];

	return {
		title,
		units: 'kW',
		series: [
			{
				name: app_state.scenario.name,
				color: colors.scenario.to_css(),
				data: app_state.scenario.building_fleet
			},
			{
				name: 'Baseline',
				color: colors.baseline.to_css(),
				data: app_state.baseline_scenario.building_fleet
			}
		],
		y_accessor: y_accessor[variable_name]
	};
}

export type BatteryVariable = Exclude<keyof BatteryTimePoint, 'seconds'> | 'operating_mode';
export function battery(
	id: number,
	variable_name: BatteryVariable
): Axis<BatteryTimePoint> | undefined;
export function battery(
	baseline: BatteryData,
	scenario: BatteryData,
	variable_name: BatteryVariable
): Axis<BatteryTimePoint>;
export function battery(
	baseline_or_id: BatteryData | number,
	scenario_or_variable_name: BatteryData | BatteryVariable,
	variable_name?: BatteryVariable
): Axis<BatteryTimePoint> | undefined {
	const { baseline, scenario, ...params } = resolve_pair(
		(s, id) => s.batteries.get(id),
		baseline_or_id,
		scenario_or_variable_name,
		variable_name
	);
	if (!baseline || !scenario) {
		return undefined;
	}
	variable_name = params.variable_name;

	if (variable_name === 'operating_mode') {
		return {
			title: 'Battery Fleet Operating Modes',
			units: '%',
			series: [
				{
					name: 'Idle',
					color: colors.idle.to_css(),
					data: scenario.timeseries,
					y_accessor: (d) => (d.received_signal == 0 ? 100 : 0)
				},
				{
					name: 'Charging',
					color: colors.charging.to_css(),
					data: scenario.timeseries,
					y_accessor: (d) => (d.received_signal == 1 ? 100 : 0)
				},
				{
					name: 'Discharging',
					color: colors.discharging.to_css(),
					data: scenario.timeseries,
					y_accessor: (d) => (d.received_signal == 2 ? 100 : 0)
				}
			],
			y_accessor: () => 0,
			y_range: [0, 100]
		};
	}
	const y_accessor: { [variable_name]: Axis<BatteryTimePoint>['y_accessor'] } = {
		received_signal: (d) => d.received_signal,
		state_of_charge: (d) => d.state_of_charge * 100,
		active_power: (d) => d.active_power,
		reactive_power: (d) => d.reactive_power
	};
	const title: { [variable_name]: string } = {
		received_signal: 'Battery Fleet Mean Received Signal',
		state_of_charge: 'Battery Fleet Mean State of Charge',
		active_power: 'Battery Fleet Total Active Power',
		reactive_power: 'Battery Fleet Total Reactive Power'
	};
	const units: { [variable_name]: string } = {
		received_signal: '%',
		state_of_charge: '%',
		active_power: 'kW',
		reactive_power: 'kVAR'
	};
	const axis: Axis<BatteryTimePoint> = {
		title: title[variable_name],
		units: units[variable_name],
		series: [
			{
				name: app_state.scenario.name,
				color: colors.scenario.to_css(),
				data: scenario.timeseries
			},
			{
				name: app_state.baseline_scenario.name,
				color: colors.baseline.to_css(),
				data: baseline.timeseries
			}
		],
		y_accessor: y_accessor[variable_name]
	};
	if (variable_name === 'state_of_charge') {
		axis.y_range = [0, 100];
	}
	return axis;
}

export function battery_fleet(variable_name: BatteryVariable): Axis<BatteryFleetPoint> {
	if (variable_name === 'operating_mode' || variable_name === 'status') {
		return {
			title: 'Battery Fleet Operating Modes',
			units: '%',
			y_range: [0, 100],
			series: [
				{
					name: 'Idle',
					color: colors.idle.to_css(),
					data: app_state.scenario.battery_fleet,
					y_accessor: (d) => d.frac_state.idle * 100
				},
				{
					name: 'Charging',
					color: colors.charging.to_css(),
					data: app_state.scenario.battery_fleet,
					y_accessor: (d) => d.frac_state.charging * 100
				},
				{
					name: 'Discharging',
					color: colors.discharging.to_css(),
					data: app_state.scenario.battery_fleet,
					y_accessor: (d) => d.frac_state.discharging * 100
				}
			],
			y_accessor: () => 0
		};
	}
	const y_accessor: { [variable_name]: Axis<BatteryFleetPoint>['y_accessor'] } = {
		received_signal: (d) => d.avg_received_signal * 100,
		state_of_charge: (d) => d.avg_state_of_charge * 100,
		active_power: (d) => d.total_active_power,
		reactive_power: (d) => d.total_reactive_power
	};
	const title = {
		received_signal: 'Battery Fleet Mean Received Signal',
		state_of_charge: 'Battery Fleet Mean State of Charge',
		active_power: 'Battery Fleet Total Active Power',
		reactive_power: 'Battery Fleet Total Reactive Power',
		status: 'Battery Fleet Status'
	}[variable_name];
	const units = {
		received_signal: '%',
		state_of_charge: '%',
		active_power: 'kW',
		reactive_power: 'kVAR',
		status: ''
	}[variable_name];
	const axis: Axis<BatteryFleetPoint> = {
		title,
		units,
		series: [
			{
				name: app_state.scenario.name,
				color: colors.scenario.to_css(),
				data: app_state.scenario.battery_fleet
			},
			{
				name: app_state.baseline_scenario.name,
				color: colors.baseline.to_css(),
				data: app_state.baseline_scenario.battery_fleet
			}
		],
		y_accessor: y_accessor[variable_name]
	};
	if (variable_name === 'state_of_charge') {
		axis.y_range = [0, 100];
	}
	return axis;
}
