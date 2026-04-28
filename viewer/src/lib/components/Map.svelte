<script lang="ts">
	import * as d3 from 'd3';
	import {
		type LineComponent,
		type BusComponent,
		type FeederConnection,
		type LoadComponent
	} from '$lib/feeder';

	import { seek } from '$lib/scenario';
	import { app_state } from '$lib/state.svelte';
	import { type ComponentSelectEvent } from '../events';
	import type { Attachment } from 'svelte/attachments';
	import type { Snippet } from 'svelte';
	import { type Oklch, interpolate } from 'culori';

	type props = {
		overlay: 'power' | 'voltage' | 'phase' | 'none';
		oncomponentclick?: (e: ComponentSelectEvent) => void;
		selected_component?: LineComponent | BusComponent;
		children?: Snippet;
	};

	import * as colors from '$lib/colors';
	import { formatCss } from 'culori';
	const {
		oncomponentclick = undefined,
		overlay = $bindable('power'),
		selected_component,
		children,
		...props
	}: props = $props();

	function interpolate_oklch(start: Oklch, end: Oklch) {
		const interpolator = interpolate([start, end]);
		return (t: number) => {
			return formatCss(interpolator(t));
		};
	}

	const interpolate_red_green = interpolate_oklch_through_black(colors.red, colors.green);

	const interpolate_red_black_red = interpolate_oklch_through_black(colors.red, colors.red);

	function interpolate_oklch_through_black(start: Oklch, end: Oklch) {
		const start_to_black = interpolate_oklch(start, { ...start, l: 0 });
		const black_to_end = interpolate_oklch({ ...end, l: 0 }, end);
		return (t: number) => {
			t = Math.max(0, Math.min(1, t)); // Clamp t to [0, 1]
			if (t < 0.5) {
				return start_to_black(t * 2);
			} else {
				return black_to_end((t - 0.5) * 2);
			}
		};
	}

	const power_scale = d3.scaleSequential(interpolate_red_green).domain([1.2, 0.8]);
	const voltage_scale = d3.scaleSequential(interpolate_red_black_red).domain([1.005, 0.995]);
	const d3_attachment: Attachment<SVGElement> = (element) => {
		const parent = d3.select(element);
		const lines = parent
			.append('g')
			.attr('class', 'lines')
			.selectAll('line')
			.data(app_state.feeder.get_components_by_type('line'))
			.join('line')
			.attr('x1', (d) => d.upstream_bus.x)
			.attr('y1', (d) => d.upstream_bus.y)
			.attr('x2', (d) => d.downstream_bus.x)
			.attr('y2', (d) => d.downstream_bus.y)
			.attr('stroke', 'black')
			.attr('stroke-width', 10)
			.on('click', (e, d) => {
				if (oncomponentclick) {
					const component_click_event: ComponentSelectEvent = e as ComponentSelectEvent;
					component_click_event.targetComponent = d;
					oncomponentclick(e);
				}
			});
		const buses = parent
			.append('g')
			.attr('class', 'buses')
			.selectAll('circle')
			.data(app_state.feeder.get_components_by_type('bus'))
			.join('circle')
			.attr('cx', (d) => d.x)
			.attr('cy', (d) => d.y)
			.attr('r', 4)
			.attr('stroke', 'black')
			.attr('stroke-width', 2)
			.attr('fill', 'blue')
			.on('click', (e, d) => {
				if (oncomponentclick) {
					const component_click_event: ComponentSelectEvent = e as ComponentSelectEvent;
					component_click_event.targetComponent = d;
					oncomponentclick(e);
				}
			});

		function voltage_power_color(d: LineComponent) {
			const data = app_state.scenario.components.get(d.id);
			const baseline_data = app_state.baseline_scenario.components.get(d.id);
			if (data?.type !== 'line' || baseline_data?.type !== 'line') {
				return 'black';
			}
			const timepoint = seek(data.timeseries, app_state.timestamp);
			const baseline_timepoint = seek(baseline_data.timeseries, app_state.timestamp);
			if (!timepoint || !baseline_timepoint) {
				console.log('missing timepoint for line ', d.id, ' at timestamp ', app_state.timestamp);
				return 'black';
			}
			switch (overlay) {
				case 'power':
					return power_scale(timepoint.active_power / baseline_timepoint.active_power);
				case 'voltage':
					return voltage_scale(timepoint.voltage / baseline_timepoint.voltage);
			}
			return 'black';
		}

		const STROKE_COLOR_FUNCTIONS: Record<typeof overlay, (d: LineComponent) => string> = {
			none: () => colors.on_surface.to_css(),
			phase: (d) => {
				const phases = d.connections.reduce((phases, connection) => {
					return phases.union(connection.phases);
				}, new Set<'A' | 'B' | 'C'>());
				return colors.phase_to_color(phases).to_css() || colors.on_surface.to_css();
			},
			power: voltage_power_color,
			voltage: voltage_power_color
		};

		$effect(() => {
			const coloring_function = STROKE_COLOR_FUNCTIONS[overlay];
			lines.attr('stroke', (d) => {
				if (selected_component && d.id === selected_component.id) {
					return formatCss(colors.yellow);
				}
				return coloring_function(d);
			});
		});
		$effect(() => {
			buses.attr('fill', (d) => {
				if (overlay === 'none') {
					return colors.on_surface.to_css();
				} else if (overlay === 'phase') {
					const phases = d.connections.reduce((phases, connection) => {
						return phases.union(connection.phases);
					}, new Set<'A' | 'B' | 'C'>());
					return colors.phase_to_color(phases).to_css() || colors.on_surface.to_css();
				}
				const load_data = d.connections
					.filter(
						(connection): connection is FeederConnection & { target: LoadComponent } =>
							connection.direction === 'downstream' && connection.target.type === 'load'
					)
					.map((connection) => {
						const data = app_state.scenario.components.get(connection.target.id);
						const baseline_data = app_state.baseline_scenario.components.get(connection.target.id);
						if (data?.type !== 'load' || baseline_data?.type !== 'load') {
							return undefined;
						}
						const timepoint = seek(data.timeseries, app_state.timestamp);
						const baseline_timepoint = seek(baseline_data.timeseries, app_state.timestamp);
						if (!timepoint || !baseline_timepoint) {
							console.log(
								'missing timepoint for load ',
								connection.target.id,
								' at timestamp ',
								app_state.timestamp
							);
							return undefined;
						}
						return [timepoint, baseline_timepoint];
					})
					.filter((d) => d !== undefined);

				if (overlay == 'power') {
					const [power, baseline_power] = load_data.reduce(
						([acc_power, acc_baseline_power], [timepoint, baseline_timepoint]) => {
							return [
								acc_power + timepoint.active_power,
								acc_baseline_power + baseline_timepoint.active_power
							];
						},
						[0, 0]
					);
					return power_scale(power / baseline_power);
				} else if (overlay == 'voltage') {
					const [voltage, baseline_voltage] = load_data.reduce(
						([acc_voltage, acc_baseline_voltage], [timepoint, baseline_timepoint]) => {
							return [
								acc_voltage + timepoint.voltage,
								acc_baseline_voltage + baseline_timepoint.voltage
							];
						},
						[0, 0]
					);
					return voltage_scale(voltage / baseline_voltage);
				}
				return 'black';
			});
		});
	};
</script>

<g {@attach d3_attachment} {...props}>
	{#if children}
		{@render children()}
	{/if}
</g>
