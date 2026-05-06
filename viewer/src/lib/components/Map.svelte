<script lang="ts">
	import * as d3 from 'd3';
	import { type LineComponent, type BusComponent } from '$lib/feeder';

	import { seek } from '$lib/scenario';
	import { app_state } from '$lib/state.svelte';
	import { type ComponentSelectEvent } from '../events';
	import type { Attachment } from 'svelte/attachments';
	import type { Snippet } from 'svelte';

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

	const interpolate_red_green = interpolate_through_line(colors.red, colors.green);

	const interpolate_red_black_red = interpolate_through_line(colors.red, colors.red);

	function interpolate_through_line(start: colors.Color, end: colors.Color) {
		const start_to_line = colors.interpolate_color(start.to_css(), colors.power_line.to_css());
		const line_to_end = colors.interpolate_color(colors.power_line.to_css(), end.to_css());
		return (t: number) => {
			t = Math.max(Math.min(1, t), 0);
			if (t < 0.5) {
				return start_to_line(t * 2);
			}
			return line_to_end((t - 0.5) * 2);
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
			.data(
				app_state.feeder
					.get_components_by_type('line')
					.sort((a, b) => b.distance_from_source - a.distance_from_source)
			)
			.join('line')
			.attr('x1', (d) => d.upstream_bus.x)
			.attr('y1', (d) => d.upstream_bus.y)
			.attr('x2', (d) => d.downstream_bus.x)
			.attr('y2', (d) => d.downstream_bus.y)
			.attr('stroke', colors.power_line.to_css())
			.attr('stroke-linecap', 'round')
			.attr('stroke-width', 10)
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
				return colors.power_line.to_css();
			}
			const timepoint = seek(data.timeseries, app_state.timestamp);
			const baseline_timepoint = seek(baseline_data.timeseries, app_state.timestamp);
			if (!timepoint || !baseline_timepoint) {
				console.log('missing timepoint for line ', d.id, ' at timestamp ', app_state.timestamp);
				return colors.power_line.to_css();
			}
			switch (overlay) {
				case 'power':
					return power_scale(timepoint.active_power / baseline_timepoint.active_power);
				case 'voltage':
					return voltage_scale(timepoint.voltage / baseline_timepoint.voltage);
			}
			return colors.power_line.to_css();
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
	};
</script>

<g {@attach d3_attachment} {...props}>
	{#if children}
		{@render children()}
	{/if}
</g>
