<script lang="ts">
	import './layout.css';
	import { app_state } from '$lib/state.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import ScenarioPicker from '$lib/components/ScenarioPicker.svelte';
	import RangeSelector from '$lib/components/RangeSelector.svelte';

	let { children } = $props();
	let time = $derived(app_state.scenario.seconds_to_date(app_state.timestamp));

	const time_multipliers = [1, 5, 10, 30, 60, 120, 180, 300, 600];

	let time_multiplier_index = $state(5);
	let time_multiplier = $derived(time_multipliers[time_multiplier_index % time_multipliers.length]);
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="layout-grid" style:flex="1" style:place-content="start">
	<header class="full subgrid" style:z-index="10">
		<menu class="wide">
			<nav class="nav-bar left">
				<a href={resolve('/')} class:active={page.url.pathname === '/'}>Overview</a>
				<a href={resolve('/grid')} class:active={page.url.pathname === '/grid'}>Grid</a>
				<a href={resolve('/cyber')} class:active={page.url.pathname === '/cyber'}>Cyber</a>
				<a href={resolve('/batteries')} class:active={page.url.pathname === '/batteries'}
					>Batteries</a
				>
			</nav>

			<div class="row">
				<button
					class="button button-primary"
					style:width="9ch"
					onclick={() => (app_state.playing ? app_state.stop() : app_state.play(time_multiplier))}
					>{app_state.playing ? 'Stop' : 'Play'}</button
				>
				<RangeSelector
					min={0}
					max={Math.floor(
						(app_state.scenario.end_date.getTime() - app_state.scenario.start_date.getTime()) / 1000
					)}
					step={60}
					bind:value={app_state.timestamp}
					bind:range={app_state.seconds_brush}
					ondragstart={() => {
						app_state.stop();
					}}
				>
					{time.toLocaleTimeString('en-US', {
						hour: '2-digit',
						minute: '2-digit',
						hourCycle: 'h24'
					})}</RangeSelector
				>
				<button
					class="button button-primary"
					style:width="9ch"
					onclick={() => {
						time_multiplier_index++;
						if (app_state.playing) {
							app_state.play(time_multiplier);
						}
					}}>{time_multiplier}x</button
				>
			</div>
			<div class="right">
				<ScenarioPicker bind:scenario={app_state.scenario} />
			</div>
		</menu>
	</header>
	{@render children()}
</div>
<footer class="layout-grid">
	<menu class="wide fs-xs center">
		<li>©National Laboratory of the Rockies 2026</li>
	</menu>
</footer>

<style>
	header {
		position: sticky;
		top: 0;
		background-color: var(--surface);
		border-bottom: 1px solid var(--outline);
		padding: var(--sp-sm) var(--sp-md);
		& menu {
			display: grid;
			grid-template-columns: 1fr auto 1fr;
			gap: var(--gap);
			width: 100%;
		}
	}

	footer {
		margin-block-start: var(--sp-xl);
		background-color: var(--surface);
		border-top: var(--border-thickness) solid var(--outline);
		padding-block: var(--sp-md);
	}

	.nav-bar {
		display: flex;
		gap: var(--sp-md);
		z-index: 20;
		position: relative;
	}

	.nav-bar a {
		text-decoration: none;
		color: var(--on-surface-low);
		font-weight: 600;
		font-size: var(--fs-sm);
		padding: 0.25lh 1ch;
		border-radius: var(--br-sm);
		transition:
			background-color 0.15s,
			color 0.15s;
	}

	.nav-bar a:hover {
		color: var(--on-surface);
		background-color: var(--surface-variant);
	}

	.nav-bar a.active {
		color: var(--on-primary);
		background-color: var(--primary);
	}

	.row {
		display: flex;
		gap: var(--gap);
		align-items: center;
	}
</style>
