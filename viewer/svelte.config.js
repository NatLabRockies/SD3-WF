import adapter from '@sveltejs/adapter-static';
import * as child_process from 'node:child_process';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		version: {
			name: child_process.execSync('git rev-parse HEAD').toString().trim()
		},
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			paths: {
				base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
			}
		})
	},
	compilerOptions: {
		experimental: {
			async: true
		}
	}
};

export default config;
