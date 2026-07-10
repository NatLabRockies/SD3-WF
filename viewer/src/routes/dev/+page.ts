import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { dev } from '$app/environment';

export const load: PageLoad = async function () {
	if (!dev) {
		return error(404);
	}
	return;
};
