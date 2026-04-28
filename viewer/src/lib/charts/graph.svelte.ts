import { type Axis, axis_extent, resolve_x } from '.';
import type { HasSeconds } from '$lib/scenario';
import * as d3 from 'd3';
import { type Attachment } from 'svelte/attachments';
import { untrack } from 'svelte';
import { colors, app_state } from '$lib';
export function graph<T extends HasSeconds>(
	axis: Axis<T>,
	options?: {
		margin_bottom?: number;
		margin_top?: number;
		margin_left?: number;
		margin_right?: number;
	}
): Attachment<SVGSVGElement> {
	const margin_bottom = options?.margin_bottom || 30;
	const margin_top = options?.margin_top || 10;
	const margin_left = options?.margin_left || 40;
	const margin_right = options?.margin_right || 10;
	const xa = resolve_x(axis);
	return (element) => {
		const resize_observer = new ResizeObserver(draw);

		let mouse_x: number | undefined = undefined;
		let mouse_y: number | undefined = undefined;

		const svg = d3.select(element).style('pointer-events', 'all').attr('fill', 'transparent');
		const y_axis_g = svg.append('g');
		const x_axis_g = svg.append('g');
		const series = svg
			.append('g')
			.selectAll('g')
			.data(axis.series)
			.join('path')
			.attr('fill', 'none')
			.attr('stroke-width', 2)
			.attr('stroke-linejoin', 'round')
			.attr('stroke', (d) => d.color.toString() || 'steelblue');

		const x_axis_label = svg
			.append('g')
			.append('text')
			.text('Time')
			.attr('fill', 'black')
			.style('font-weight', 600)
			.style('font-size', 'var(--fs-xs)')
			.attr('text-anchor', 'middle');

		const focus = svg.append('g').attr('class', 'focus');
		const focus_line = focus
			.append('line')
			.attr('stroke-width', 1)
			.attr('stroke', '#aaa')
			.style('stroke-dasharray', '3px, 2px');
		const focus_points = focus
			.selectAll('circle')
			.data(axis.series)
			.join('circle')
			.attr('r', 2)
			.attr('fill', colors.surface.to_css())
			.attr('stroke', (d) => d.color || 'steelblue')
			.attr('cx', 0)
			.attr('stroke-width', 2);

		const tooltip = svg
			.append('g')
			.style('transition', 'transform 80ms ease')
			.style('font-size', 'var(--fs-xs)');
		const tooltip_rect = tooltip
			.append('rect')
			.attr('fill', colors.surface.to_css())
			.attr('stroke', colors.outline.to_css())
			.attr('stroke-width', 'var(--border-thickness)')
			.attr('rx', 'var(--br-sm)');
		const tooltip_text = tooltip
			.append('text')
			.attr('fill', colors.on_surface.to_css())
			.style('font-weight', 600);
		const tooltip_text_x = tooltip_text.append('tspan');
		const tooltip_text_y = tooltip_text
			.selectAll('tspan.y-data')
			.data(axis.series)
			.join('tspan')
			.attr('dy', '1.1em')
			.attr('x', '1em')
			.style('font-weight', 400)
			.style('font-variant-numeric', 'tabular-nums');
		tooltip_text_y.each(function (this, d, i) {
			if (!this) return;
			const box_size = 0.6;
			tooltip
				.append('rect')
				.attr('fill', d.color || 'steelblue')
				.attr('x', 0)
				.attr('y', `${1.1 * i + 0.55}em`)
				.attr('width', `${box_size}em`)
				.attr('height', `${box_size}em`);
		});

		const { min_y, max_y } = axis_extent(axis);

		const x_domain: [number, number] = axis.x_range ?? untrack(() => app_state.seconds_brush);
		const x_linear = untrack(() => d3.scaleLinear().domain(x_domain).clamp(true));
		const x_time = d3.scaleTime().clamp(true);

		const y_scale = d3.scaleLinear().clamp(true);
		if (!axis.y_range) {
			const y_range = max_y - min_y;
			y_scale.domain([min_y - y_range / 4, max_y + y_range / 4]);
		} else {
			y_scale.domain(axis.y_range);
		}

		const x_bisector = d3.bisector(xa);
		resize_observer.observe(element);

		let dragging = false;
		svg.on('mousemove', (event: MouseEvent) => {
			const { x: client_x, y: client_y } = element.getBoundingClientRect();
			if (event.buttons === 1) {
				dragging = true;
			} else {
				dragging = false;
			}
			mouse_x = event.clientX - client_x;
			mouse_y = event.clientY - client_y;
			if (dragging) {
				update_timestamp_from_x(mouse_x);
			}
			draw_tooltip(mouse_x, mouse_y);
			draw_focus(mouse_x);
		});
		svg.on('mousedown', (event: MouseEvent) => {
			const { x: client_x } = element.getBoundingClientRect();
			const x = event.clientX - client_x;
			if (event.button === 0) {
				update_timestamp_from_x(x);
			}
		});
		svg.on('mouseleave', () => {
			untrack(() => {
				mouse_x = undefined;
				mouse_y = undefined;
				const px = x_linear.clamp(true)(app_state.timestamp);
				draw_tooltip(px);
				draw_focus(px);
			});
		});

		function update_timestamp_from_x(px: number) {
			app_state.timestamp = Math.round(x_linear.invert(px));
		}

		function draw_focus(px: number) {
			const { height } = element.getBoundingClientRect();
			const seconds = x_linear.invert(px);
			focus_line.attr('y2', height - margin_bottom).attr('y1', margin_top);
			focus_points.each(function (this, d) {
				if (!this) return;
				const index = x_bisector.center(d.data, seconds);
				const datum = d.data[index];
				px = x_linear(xa(datum));
				const circle = d3.select(this);
				circle.attr('cy', y_scale((d.y_accessor || axis.y_accessor)(datum)));
			});
			focus.attr('transform', `translate(${px}, 0)`);
		}

		function draw_tooltip(mouse_x: number, mouse_y: number = margin_top - 10) {
			const { width, height } = element.getBoundingClientRect();
			if (!tooltip_text.node()) return;
			const seconds = x_linear.invert(mouse_x);
			const date = untrack(() => app_state.scenario.seconds_to_date(seconds));
			tooltip_text_x.text(
				date.toLocaleTimeString('en-US', {
					hour: '2-digit',
					minute: '2-digit',
					hourCycle: 'h24'
				})
			);
			tooltip_text_y
				.each(function (this, d) {
					if (!this) return;
					const index = x_bisector.center(d.data, seconds);
					const datum = d.data[index];
					const tspan = d3.select(this as SVGTSpanElement);
					tspan.text(
						`${d.name}: ${(d.y_accessor || axis.y_accessor)(datum).toFixed(2)} ${axis.units ? `(${axis.units})` : ''}`
					);
				})
				.attr('display', null);
			const text_bb = tooltip_text.node()!.getBBox();

			const tooltip_padding = 7;
			tooltip_rect
				.attr('x', text_bb.x - tooltip_padding)
				.attr('y', text_bb.y - tooltip_padding)
				.attr('width', text_bb.width + tooltip_padding * 2)
				.attr('height', text_bb.height + tooltip_padding * 2);
			const tooltip_bb = tooltip.node()!.getBBox();
			const max_x = width - (tooltip_bb.width + tooltip_bb.x + 0.5);
			const max_y_pos = height - (tooltip_bb.height + tooltip_bb.y + 0.5);
			tooltip.attr(
				'transform',
				`translate(${Math.min(mouse_x + 15, max_x)}, ${Math.min(mouse_y + 33, max_y_pos)})`
			);
		}

		function sync_time_scale() {
			untrack(() => {
				const [s0, s1] = x_linear.domain();
				const [r0, r1] = x_linear.range();
				x_time
					.domain([app_state.scenario.seconds_to_date(s0), app_state.scenario.seconds_to_date(s1)])
					.range([r0, r1]);
			});
		}

		function draw() {
			const { width, height } = element.getBoundingClientRect();
			x_linear.range([margin_left, width - margin_right]);
			y_scale.range([height - margin_bottom, margin_top]);
			sync_time_scale();

			const [x0, x1] = x_linear.domain();

			y_axis_g
				.attr('transform', `translate(${margin_left}, 0)`)
				.call(d3.axisLeft(y_scale).ticks(5))
				.selectAll('.tick')
				.selectAll('line.rule')
				.data([null])
				.join('line')
				.attr('class', 'rule')
				.attr('stroke', '#ccc')
				.attr('x1', width - margin_left - margin_right);
			x_axis_g
				.attr('transform', `translate(0, ${height - margin_bottom})`)
				.call(
					d3
						.axisBottom(x_time)
						.tickFormat(
							d3.timeFormat('%H:%M') as (
								domainValue: Date | d3.NumberValue,
								index: number
							) => string
						)
				);

			const x_label_bb = x_axis_label.node()?.getBBox();
			if (x_label_bb) {
				x_axis_label.attr('x', width / 2).attr('y', height);
			}
			series.attr('d', (d) => {
				const visible = d.data.filter((pt) => {
					const s = xa(pt);
					return s >= x0 && s <= x1;
				});
				const y_accessor = d.y_accessor || axis.y_accessor;
				const line_generator = d3.line<T>(
					(d) => x_linear(xa(d)),
					(d) => y_scale(y_accessor(d))
				);
				return line_generator(visible);
			});
		}
		draw();
		$effect(() => {
			const current_seconds = app_state.timestamp;
			const brush = app_state.seconds_brush;
			const [d0, d1] = x_linear.domain();
			if (d0 !== brush[0] || d1 !== brush[1]) {
				x_linear.domain(brush);
				draw();
			}
			const px = mouse_x || x_linear.clamp(true)(current_seconds);
			if (!dragging) {
				draw_tooltip(px, mouse_y);
				draw_focus(px);
			}
		});

		return () => {
			resize_observer.unobserve(element);
			resize_observer.disconnect();
			svg.selectAll('*').remove();
		};
	};
}
