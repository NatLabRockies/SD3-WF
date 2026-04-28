<script lang="ts">
	import { graph } from '$lib/charts';
	import { battery_fleet } from '$lib/axis_configs.svelte';
	import * as axis from '$lib/axis_configs.svelte';
	import { app_state } from '$lib/state.svelte';
	import { resolve } from '$app/paths';
	import Map from '$lib/components/Map.svelte';
	import MapContainer from '$lib/components/MapContainer.svelte';
	let map_container: MapContainer;
	import load_map from '$lib/charts/load_map.svelte';

	$effect(() => {
		map_container?.zoomTo(9, 1285, 1440);
	});
	let battery_variable: axis.BatteryVariable = $state('state_of_charge');
</script>

<div class="header-card">
	<h1 class="page-header">Battery Status Dashboard</h1>
</div>

<div class="dashboard-grid wide">
	<div class="card feature-cell no-pad">
		<MapContainer class="h-full w-full" bind:this={map_container}>
			<Map overlay="none"></Map>
			<g {@attach load_map()}></g>
		</MapContainer>
	</div>
	<!-- Command Signal -->
	<div class="card cell-md">
		<h2 class="card-title">Fleet Command Signal</h2>
		<svg {@attach graph(battery_fleet('received_signal'))} class="chart-svg"></svg>
	</div>

	<!-- State of Charge -->
	<div class="card cell-md">
		<h2 class="card-title">Fleet State of Charge</h2>
		<svg {@attach graph(battery_fleet('state_of_charge'))} class="chart-svg"></svg>
	</div>

	<!-- Active Power -->
	<div class="card cell-md">
		<h2 class="card-title">Fleet Active Power</h2>
		<svg {@attach graph(battery_fleet('active_power'))} class="chart-svg"></svg>
	</div>

	<!-- Operating Mode -->
	<div class="card cell-md">
		<h2 class="card-title">Fleet Operating Mode</h2>
		<svg {@attach graph(battery_fleet('operating_mode'))} class="chart-svg"></svg>
	</div>
</div>
<div class="header-card">
	<h2 class="section-header">Batteries</h2>
	<div class="right flex" style:flex-wrap="wrap">
		{#each [['state_of_charge', 'State of Charge'], ['operating_mode', 'Mode'], ['active_power', 'Power'], ['received_signal', 'Control Signal']] as [option, name] (option)}
			<label>
				<input type="radio" name="battery_variable" value={option} bind:group={battery_variable} />
				{name}
			</label>
		{/each}
	</div>
</div>
<div class="dashboard-grid wide">
	{#each app_state.feeder.get_components_by_type('load') as load (load.id)}
		{@const battery_axis = axis.battery(load.id, battery_variable)}
		{#if battery_axis}
			<div class="card cell-sm">
				<a class="link" href={resolve('/buildings/[id]', { id: `${load.id}` })}
					><h2 class="card-title">Battery #{load.id}</h2></a
				>
				<svg {@attach graph(battery_axis)} class="chart-svg" />
			</div>
		{/if}
	{/each}
</div>

<style>
	.chart-svg {
		width: 100%;
		height: 100%;
		min-height: 0;
	}
</style>
