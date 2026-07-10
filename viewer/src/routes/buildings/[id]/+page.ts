import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { app_state } from '$lib/state.svelte';

export const load: PageLoad = async function ({ params }) {
	if (!app_state.ready) {
		await app_state.init();
	}
	const id = parseInt(params.id);
	const loads = app_state.feeder.get_components_by_type('load');
	const load_index = loads.findIndex((load) => load.id === id);
	if (load_index === -1) {
		error(404, 'Not Found');
	}
	const load = loads[load_index];
	const next_load = loads[(load_index + 1) % loads.length];
	const previous_load = loads[(load_index - 1 + loads.length) % loads.length];
	return {
		load,
		next_load,
		previous_load
	};
};
