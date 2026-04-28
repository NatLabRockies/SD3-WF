import { type Oklch, formatCss, formatHex, formatRgb } from 'culori';
export type Color = {
	toString: () => string;
	to_css: () => string;
	to_hex: () => string;
	to_rgb: () => string;
};

function css(variable_name: string): Color {
	function toString(): string {
		return `var(--${variable_name})`;
	}
	return {
		toString,
		to_css: toString,
		to_hex: toString,
		to_rgb: toString
	};
}
function oklch(l: number, c: number, h?: number): Oklch & Color {
	return {
		mode: 'oklch',
		l,
		c,
		h,
		toString: function () {
			return formatCss(this);
		},
		to_css: function () {
			return formatCss(this);
		},
		to_hex: function () {
			return formatHex(this);
		},
		to_rgb: function () {
			return formatRgb(this);
		}
	};
}
// export const red: Oklch = { mode: 'oklch', l: 0.7, c: 0.16, h: 16.5 };
export const red = oklch(0.7, 0.16, 16.5);
export const green = oklch(0.7, 0.16, 148);
// export const green: Oklch = { mode: 'oklch', l: 0.7, c: 0.16, h: 148 };
export const blue = oklch(0.7, 0.16, 255);
export const purple = oklch(0.7, 0.16, 324);
export const orange = oklch(0.8, 0.16, 69);
export const yellow = oklch(0.9, 0.16, 105);
export const teal = oklch(0.7, 0.12, 195);

export const white = oklch(1, 0);
export const gray = oklch(0.7, 0, 0);
export const dark_gray = oklch(0.2, 0, 0);

// export const outline = oklch(0.6, 0.00736, 255.04);
export const outline = css('outline');
export const surface = css('surface');
export const on_surface = css('on-surface');

export const scenario = orange;
export const baseline = blue;

export const charging = blue;
export const discharging = purple;
export const idle = gray;

export const series = [blue, orange, purple, green];

export function phase_to_color(phases: Set<'A' | 'B' | 'C'>) {
	if (phases.has('A') && phases.has('B') && phases.has('C')) {
		return on_surface;
	} else if (phases.has('A') && !phases.has('B') && !phases.has('C')) {
		return orange;
	} else if (!phases.has('A') && phases.has('B') && !phases.has('C')) {
		return red;
	} else if (!phases.has('A') && !phases.has('B') && phases.has('C')) {
		return yellow;
	}
	return on_surface;
}
