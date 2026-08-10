import type { Attachment } from 'svelte/attachments';
import { type LineComponent } from '$lib/feeder';
import { seek, type BusTimeSeriesData } from '$lib/scenario';
import * as d3 from 'd3';
import { app_state } from '$lib/state.svelte';
import * as colors from '$lib/colors';

export default function voltage_map(options?: {
	margin_bottom: number;
	margin_left: number;
	margin_right: number;
	margin_top: number;
}): Attachment<SVGElement> {
	const margin_bottom = options?.margin_bottom || 20;
	const margin_left = options?.margin_left || 40;
	const margin_right = options?.margin_right || 20;
	const margin_top = options?.margin_top || 20;
	return (element) => {
		const svg = d3.select(element);
		const x_axis = svg.append('g').attr('class', 'x-axis');
		const y_axis = svg.append('g').attr('class', 'y-axis');

		const lines = app_state.feeder.get_components_by_type('line');

		const lines_group = svg
			.append('g')
			.attr('class', 'lines-group')
			.selectAll('line')
			.data(lines)
			.join('line')
			.style('transition', 'all 0.1s ease')
			.attr('stroke', (line) => {
				const phases = line.connections.reduce(
					(phases, connection) => phases.union(connection.phases),
					new Set<'A' | 'B' | 'C'>()
				);
				return colors.phase_to_color(phases).to_css();
			})
			.attr('stroke-width', 2);

		const distance_domain = lines.reduce(
			([closest, farthest], line) => {
				const line_start = line.upstream_bus.distance_from_source;
				const line_end = line.downstream_bus.distance_from_source;
				return [Math.min(closest, line_start), Math.max(farthest, line_end)];
			},
			[Infinity, -Infinity]
		);

		const lines_with_data = $derived(
			lines
				.map((line) => {
					const upstream_data = app_state.scenario.components.get(line.upstream_bus.id);
					const downstream_data = app_state.scenario.components.get(line.downstream_bus.id);
					return { ...line, upstream_data, downstream_data };
				})
				.filter(
					(
						line
					): line is LineComponent & {
						upstream_data: BusTimeSeriesData;
						downstream_data: BusTimeSeriesData;
					} => line.upstream_data !== undefined && line.downstream_data !== undefined
				)
		);

		const voltage_domain = $derived(
			lines_with_data.reduce(
				([min_voltage, max_voltage], line) => {
					[min_voltage, max_voltage] = line.upstream_data.timeseries.reduce(
						([min_voltage, max_voltage], timepoint) => [
							Math.min(timepoint.voltage, min_voltage),
							Math.max(timepoint.voltage, max_voltage)
						],
						[min_voltage, max_voltage]
					);

					[min_voltage, max_voltage] = line.downstream_data.timeseries.reduce(
						([min_voltage, max_voltage], timepoint) => [
							Math.min(timepoint.voltage, min_voltage),
							Math.max(timepoint.voltage, max_voltage)
						],
						[min_voltage, max_voltage]
					);

					return [min_voltage, max_voltage];
				},
				[Infinity, -Infinity]
			)
		);

		let container_width = $state(element.getBoundingClientRect().width);
		let container_height = $state(element.getBoundingClientRect().height);
		const resize_observer = new ResizeObserver(() => {
			const bounding = element.getBoundingClientRect();
			container_width = bounding.width;
			container_height = bounding.height;
		});
		resize_observer.observe(element);

		const x_scale: d3.ScaleLinear<number, number> = $derived(
			d3
				.scaleLinear()
				.domain(distance_domain)
				.range([margin_left, container_width - margin_right])
		);

		const y_scale = $derived(
			d3
				.scaleLinear()
				.domain(voltage_domain)
				.range([container_height - margin_bottom, margin_top])
		);

		$effect(() => {
			x_axis
				.attr('transform', `translate(0, ${container_height - margin_bottom})`)
				.call(d3.axisBottom(x_scale).ticks(5));
			y_axis.attr('transform', `translate(${margin_left}, 0)`).call(d3.axisLeft(y_scale).ticks(5));

			lines_group
				.attr('x1', (d) => x_scale(d.upstream_bus.distance_from_source))
				.attr('x2', (d) => x_scale(d.downstream_bus.distance_from_source));
		});

		$effect(() => {
			lines_group
				.attr('y1', (d) => {
					const upstream_data = app_state.scenario.components.get(d.upstream_bus.id);
					if (!upstream_data || upstream_data.type !== 'bus') {
						if (!upstream_data) {
							console.warn('Could not find data for bus', d.upstream_bus.id);
						} else {
							console.warn('Data of wrong type for', d.upstream_bus.id);
						}
						return y_scale(0);
					}
					const voltage = seek(upstream_data.timeseries, app_state.timestamp)?.voltage ?? 0;
					return y_scale(voltage);
				})
				.attr('y2', (d) => {
					const downstream_data = app_state.scenario.components.get(d.downstream_bus.id);
					if (!downstream_data || downstream_data.type !== 'bus') {
						if (!downstream_data) {
							console.warn('Could not find data for bus', d.downstream_bus.id);
						} else {
							console.warn('Data of wrong type for', d.downstream_bus.id);
						}
						return y_scale(0);
					}
					const voltage = seek(downstream_data.timeseries, app_state.timestamp)?.voltage ?? 0;
					return y_scale(voltage);
				});
		});

		return () => {
			svg.selectAll('*').remove();
			resize_observer.disconnect();
		};
	};
}
