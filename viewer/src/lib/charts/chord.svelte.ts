/**
 * Chord diagram D3 attachment for cyber traffic visualization.
 *
 * Shows role-to-role traffic flows aggregated over the whole scenario.
 * The diagram is stable — it does NOT react to the timeline scrubber.
 * Clicking a ribbon invokes onPairSelect(source, dest).
 * Pass selectedPair to highlight the selected ribbon (others dim).
 */

import * as d3 from 'd3';
import { type Attachment } from 'svelte/attachments';
import { type CyberData, type Role, ROLE_COLORS, ROLE_LABELS } from '$lib/cyber';

export interface ChordPair {
	source: Role;
	dest: Role;
}

export interface ChordOptions {
	cyberData: CyberData;
	selected_pair: ChordPair | null;
	onPairSelect: (pair: ChordPair | null) => void;
}

export function chord(options: ChordOptions): Attachment<SVGSVGElement> {
	return (element) => {
		const { cyberData, onPairSelect } = options;

		const svg = d3.select(element).style('cursor', 'default');
		const container = svg.append('g');

		// Tooltip
		const tooltip = svg
			.append('g')
			.style('pointer-events', 'none')
			.style('font-size', 'var(--fs-xs)');
		const tooltipRect = tooltip
			.append('rect')
			.attr('fill', 'white')
			.attr('stroke', '#aaa')
			.attr('stroke-width', 1)
			.attr('rx', '0.125rem')
			.attr('ry', '0.125rem');
		const tooltipText = tooltip.append('text').attr('fill', 'black').style('font-weight', 400);
		const tooltipLine1 = tooltipText.append('tspan').attr('x', '0.5em').attr('dy', '1.2em');
		const tooltipLine2 = tooltipText.append('tspan').attr('x', '0.5em').attr('dy', '1.2em');
		tooltip.style('display', 'none');

		// Compute the aggregate chord matrix once — stable for the lifetime of this attachment
		const { matrix, roles } = cyberData.chord_aggregate_matrix();

		const resize_observer = new ResizeObserver(render);
		resize_observer.observe(element);

		// Track current selected pair for highlight updates without full re-render
		let currentSelectedPair: ChordPair | null = options.selected_pair;

		function render() {
			const { width, height } = element.getBoundingClientRect();
			const size = Math.min(width, height);
			const outerRadius = size / 2 - 48;
			const innerRadius = outerRadius - 20;

			if (outerRadius <= 0) return;

			container.attr('transform', `translate(${width / 2}, ${height / 2})`);

			const hasTraffic = matrix.some((row) => row.some((v) => v > 0));

			const chordLayout = d3.chord().padAngle(0.05).sortSubgroups(d3.descending);
			const chords = hasTraffic ? chordLayout(matrix) : [];

			const arcGen = d3.arc<d3.ChordGroup>().innerRadius(innerRadius).outerRadius(outerRadius);
			const ribbonGen = d3.ribbon<d3.Chord, d3.ChordSubgroup>().radius(innerRadius);

			// Arcs
			container
				.selectAll<SVGPathElement, d3.ChordGroup>('path.arc')
				.data(hasTraffic ? chords.groups : [], (d) => roles[d.index])
				.join(
					(enter) =>
						enter
							.append('path')
							.attr('class', 'arc')
							.attr('d', arcGen)
							.attr('fill', (d) => ROLE_COLORS[roles[d.index]])
							.attr('stroke', '#fff')
							.attr('stroke-width', 1),
					(update) =>
						update
							.transition()
							.duration(300)
							.attr('d', arcGen)
							.attr('fill', (d) => ROLE_COLORS[roles[d.index]]),
					(exit) => exit.transition().duration(200).style('opacity', 0).remove()
				);

			// Ribbons
			container
				.selectAll<SVGPathElement, d3.Chord>('path.ribbon')
				.data(hasTraffic ? chords : [], (d) => `${roles[d.source.index]}-${roles[d.target.index]}`)
				.join(
					(enter) =>
						enter
							.append('path')
							.attr('class', 'ribbon')
							.attr('d', ribbonGen as unknown as string)
							.attr('fill', (d) => ROLE_COLORS[roles[d.source.index]])
							.attr('fill-opacity', (d) => ribbonOpacity(d, currentSelectedPair, roles))
							.attr('stroke', '#fff')
							.attr('stroke-width', 0.5)
							.style('cursor', 'pointer')
							.on('click', handleRibbonClick)
							.on('mouseover', handleRibbonHover)
							.on('mousemove', handleRibbonMove)
							.on('mouseout', handleRibbonOut),
					(update) =>
						update
							.transition()
							.duration(300)
							.attr('d', ribbonGen as unknown as string)
							.attr('fill', (d) => ROLE_COLORS[roles[d.source.index]])
							.attr('fill-opacity', (d) => ribbonOpacity(d, currentSelectedPair, roles)),
					(exit) => exit.transition().duration(200).style('opacity', 0).remove()
				);

			// Labels — skip arcs too narrow to label
			const MIN_ARC_ANGLE = 0.1;
			const labelGroups = hasTraffic
				? chords.groups.filter((d) => d.endAngle - d.startAngle >= MIN_ARC_ANGLE)
				: [];

			container
				.selectAll<SVGTextElement, d3.ChordGroup>('text.role-label')
				.data(labelGroups, (d) => roles[d.index])
				.join(
					(enter) =>
						enter
							.append('text')
							.attr('class', 'role-label')
							.attr('dy', '0.35em')
							.attr('text-anchor', (d) => (midAngle(d) > Math.PI ? 'end' : 'start'))
							.attr('transform', (d) => labelTransform(d, outerRadius + 8))
							.style('font-size', 'var(--fs-xs)')
							.style('font-weight', 600)
							.attr('fill', 'var(--on-surface)')
							.text((d) => ROLE_LABELS[roles[d.index]]),
					(update) =>
						update
							.attr('text-anchor', (d) => (midAngle(d) > Math.PI ? 'end' : 'start'))
							.attr('transform', (d) => labelTransform(d, outerRadius + 8))
							.text((d) => ROLE_LABELS[roles[d.index]]),
					(exit) => exit.remove()
				);

			// "No traffic" message
			container
				.selectAll<SVGTextElement, boolean>('text.no-data')
				.data(hasTraffic ? [] : [true])
				.join(
					(enter) =>
						enter
							.append('text')
							.attr('class', 'no-data')
							.attr('text-anchor', 'middle')
							.attr('dy', '0.35em')
							.attr('fill', 'var(--on-surface-low)')
							.style('font-size', 'var(--fs-sm)')
							.text('No traffic in this scenario'),
					(update) => update,
					(exit) => exit.remove()
				);

			// Click on SVG background to deselect
			svg.on('click', (event: MouseEvent) => {
				if (event.target === element) {
					onPairSelect(null);
				}
			});
		}

		/** Update only ribbon opacity without full re-render (called from $effect in page). */
		function updateHighlight(pair: ChordPair | null) {
			currentSelectedPair = pair;
			container
				.selectAll<SVGPathElement, d3.Chord>('path.ribbon')
				.attr('fill-opacity', (d) => ribbonOpacity(d, pair, roles));
		}

		function ribbonOpacity(d: d3.Chord, pair: ChordPair | null, roles: Role[]): number {
			if (!pair) return 0.65;
			const src = roles[d.source.index];
			const dst = roles[d.target.index];
			const match =
				(src === pair.source && dst === pair.dest) || (src === pair.dest && dst === pair.source);
			return match ? 0.85 : 0.15;
		}

		function midAngle(d: d3.ChordGroup): number {
			return (d.startAngle + d.endAngle) / 2;
		}

		function labelTransform(d: d3.ChordGroup, radius: number): string {
			const angle = midAngle(d);
			return `translate(${Math.sin(angle) * radius}, ${-Math.cos(angle) * radius})`;
		}

		function formatRate(bytes: number): string {
			const kbps = (bytes * 8) / 1000 / 60 / Math.max(1, cyberData.time_bins.length);
			if (kbps >= 1000) return `${(kbps / 1000).toFixed(1)} Mbps avg`;
			if (kbps >= 1) return `${kbps.toFixed(1)} kbps avg`;
			return `${(kbps * 1000).toFixed(0)} bps avg`;
		}

		function handleRibbonClick(_event: MouseEvent, d: d3.Chord) {
			_event.stopPropagation();
			const src = roles[d.source.index];
			const dst = roles[d.target.index];
			// Toggle off if same pair clicked again
			if (
				currentSelectedPair &&
				((currentSelectedPair.source === src && currentSelectedPair.dest === dst) ||
					(currentSelectedPair.source === dst && currentSelectedPair.dest === src))
			) {
				onPairSelect(null);
			} else {
				onPairSelect({ source: src, dest: dst });
			}
		}

		function handleRibbonHover(_event: MouseEvent, d: d3.Chord) {
			const srcLabel = ROLE_LABELS[roles[d.source.index]];
			const dstLabel = ROLE_LABELS[roles[d.target.index]];
			const bytes = matrix[d.source.index][d.target.index];
			tooltipLine1.text(`${srcLabel} ↔ ${dstLabel}`);
			tooltipLine2.text(formatRate(bytes));
			tooltip.style('display', null);
			updateTooltipSize();
		}

		function handleRibbonMove(event: MouseEvent) {
			const { x: cx, y: cy } = element.getBoundingClientRect();
			tooltip.attr(
				'transform',
				`translate(${event.clientX - cx + 12}, ${event.clientY - cy - 10})`
			);
		}

		function handleRibbonOut() {
			tooltip.style('display', 'none');
		}

		function updateTooltipSize() {
			const node = tooltipText.node();
			if (!node) return;
			const bb = node.getBBox();
			const pad = 6;
			tooltipRect
				.attr('x', bb.x - pad)
				.attr('y', bb.y - pad)
				.attr('width', bb.width + pad * 2)
				.attr('height', bb.height + pad * 2);
		}

		render();

		// React to selected_pair changes without re-running the full attachment
		$effect(() => {
			const pair = options.selected_pair;
			updateHighlight(pair);
		});

		return () => {
			resize_observer.unobserve(element);
			resize_observer.disconnect();
			svg.selectAll('*').remove();
		};
	};
}
