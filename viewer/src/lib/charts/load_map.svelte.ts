import { type Attachment } from 'svelte/attachments';
import type { SVGAttributes } from 'svelte/elements';
import { app_state } from '$lib/state.svelte';
import * as colors from '$lib/colors';
import * as d3 from 'd3';
import { resolve } from '$app/paths';
import * as css from '$lib/css';

export default function loads(options?: {
	batteries_only?: boolean;
	circle?: SVGAttributes<SVGCircleElement>;
}): Attachment<SVGGElement> {
	const batteries_only = options?.batteries_only || false;

	const circle: SVGAttributes<SVGCircleElement> = options?.circle || {
		r: 5
	};
	return (element) => {
		const loads = app_state.feeder.get_components_by_type('load').filter((load) => {
			if (batteries_only) {
				return app_state.baseline_scenario.batteries.has(load.id);
			}
			return true;
		});

		const group = d3.select(element);
		const links = group
			.append('g')
			.attr('class', 'loads')
			.selectAll('a')
			.data(loads)
			.join('a')
			.attr('href', (d) => {
				return resolve('/buildings/[id]', { id: `${d.id}` });
			});
		const circles = links.append('circle').attr('fill', (d) => {
			if (app_state.baseline_scenario.batteries.has(d.id)) {
				return colors.green.to_css();
			}
			return colors.orange.to_css();
		});
		Object.entries(circle).forEach(([attribute, value]) => {
			circles.attr(attribute, value);
		});
		circles.attr('cx', (d) => d.bus.x).attr('cy', (d) => d.bus.y);
		const tooltip = group
			.append('g')
			.attr('class', 'tooltip')
			.style('transform', 'scale(var(--inverse-scale))')
			.style('display', 'none')
			.style('z-index', -1)
			.style('font-size', 'var(--fs-sm)');
		const tooltip_rect = tooltip
			.append('rect')
			.attr('fill', colors.white.to_css())
			.attr('stroke', colors.outline.to_css())
			.attr('stoke-width', 2)
			.attr('rx', css.br_sm);
		const tooltip_text = tooltip.append('text');

		links.on('mouseover', (event: MouseEvent, d) => {
			tooltip.style('display', null);
			tooltip_text.text(`Load #${d.id}`).attr('y', 0);
			const padding = 7;
			const y_offset = 5;

			let { x, y, width, height } = tooltip_text.node()!.getBBox();
			tooltip_text.attr('x', -width / 2);
			tooltip_text.attr('y', padding - y + y_offset);
			tooltip_rect
				.attr('x', -width / 2 - padding)
				.attr('y', y_offset)
				.attr('width', width + padding * 2)
				.attr('height', height + padding * 2);
			const tooltip_x = d.bus.x;
			const tooltip_y = d.bus.y + 5;
			tooltip
				.style('transform-origin', `0 0 `)
				.style('transform', `translate(${tooltip_x}px, ${tooltip_y}px) scale(var(--inverse-scale))`)
				.style('display', null);
		});

		links.on('mouseleave', (event: MouseEvent, d) => {
			tooltip.style('display', 'none');
		});
	};
}
