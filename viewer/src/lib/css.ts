export function resolve_calc(expression: string, parent: HTMLElement = document.body): string {
	const temp_el = document.createElement('div');
	temp_el.style.position = 'absolute';
	temp_el.style.visibility = 'hidden';
	temp_el.style.width = expression;

	parent.appendChild(temp_el);
	const value = window.getComputedStyle(temp_el).width;
	parent.removeChild(temp_el);
	return value;
}

export function get_var(variable_name: string, parent: HTMLElement = document.body): string {
	return getComputedStyle(parent).getPropertyValue('--' + variable_name);
}

export const br_sm = resolve_calc(get_var('br-sm'));
