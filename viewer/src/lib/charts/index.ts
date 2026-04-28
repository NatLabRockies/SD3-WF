import type { HasSeconds } from '$lib/scenario';

export { graph } from './graph.svelte.ts';
export type Series<T extends HasSeconds> = {
	name: string;
	color: string;
	data: Array<T>;
	y_accessor?: (d: T) => number;
};

export type Axis<T extends HasSeconds> = {
	series: Array<Series<T>>;
	/** Defaults to (d) => d.seconds if omitted. */
	x_accessor?: (d: T) => number;
	y_accessor: (d: T) => number;
	units?: string;
	y_range?: [number, number];
	y_scale?: 'linear' | 'log';
	x_range?: [number, number];
	title?: string;
};

/** Resolve the x_accessor for an axis, falling back to seconds. */
export function resolve_x<T extends HasSeconds>(axis: Axis<T>): (d: T) => number {
	return axis.x_accessor ?? ((d: T) => d.seconds);
}

export function series_extent<T extends HasSeconds>(
	series: Series<T>,
	x_accessor: (d: T) => number,
	y_accessor: (d: T) => number
): { min_x: number; max_x: number; min_y: number; max_y: number } {
	return series.data.reduce(
		({ min_x, max_x, min_y, max_y }, datum) => {
			const x = x_accessor(datum);
			const y = y_accessor(datum);
			return {
				min_x: Math.min(min_x, x),
				max_x: Math.max(max_x, x),
				min_y: Math.min(min_y, y),
				max_y: Math.max(max_y, y)
			};
		},
		{ min_x: Infinity, max_x: -Infinity, min_y: Infinity, max_y: -Infinity }
	);
}

export function axis_extent<T extends HasSeconds>(axis: Axis<T>): {
	min_x: number;
	max_x: number;
	min_y: number;
	max_y: number;
} {
	const xa = resolve_x(axis);
	return axis.series
		.map((series) => series_extent(series, xa, series.y_accessor || axis.y_accessor))
		.reduce((acc, series) => {
			return {
				min_x: Math.min(acc.min_x, series.min_x),
				max_x: Math.max(acc.max_x, series.max_x),
				min_y: Math.min(acc.min_y, series.min_y),
				max_y: Math.max(acc.max_y, series.max_y)
			};
		});
}
