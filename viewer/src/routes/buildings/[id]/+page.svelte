<script lang="ts">
	import type { PageProps } from './$types';
	import { graph } from '$lib/charts';
	import * as axis from '$lib/axis_configs.svelte';
	import { app_state } from '$lib/state.svelte';
	import type { LoadTimeSeriesData } from '$lib/scenario';
	import load_map from '$lib/charts/load_map.svelte';
	import MapContainer from '$lib/components/MapContainer.svelte';
	import Map from '$lib/components/Map.svelte';
	import { colors } from '$lib';
	import { resolve } from '$app/paths';

	let { data }: PageProps = $props();
	const { load, previous_load, next_load } = $derived(data);
	const load_data = $derived(app_state.scenario.components.get(load.id)) as LoadTimeSeriesData;
	const load_baseline_data = $derived(
		app_state.baseline_scenario.components.get(load.id)
	) as LoadTimeSeriesData;
	let map_container: MapContainer | undefined = $state(undefined);
	$effect(() => {
		map_container?.zoomTo(10, load.bus.x, load.bus.y, true);
	});
</script>

<div class="header-card">
	<a
		href={resolve('/buildings/[id]', { id: `${previous_load.id}` })}
		class="button button-primary left">&lt; Load #{previous_load.id}</a
	>
	<h1 class="page-header">Dashboard for Load #{load.id}</h1>
	<a
		href={resolve('/buildings/[id]', { id: `${next_load.id}` })}
		class="button button-primary right">Load #{next_load.id} &gt;</a
	>
</div>
<div class="dashboard-grid wide">
	<div class="card feature-cell no-pad">
		<MapContainer class="h-full w-full" bind:this={map_container}>
			<Map overlay="none"></Map>
			<g {@attach load_map()}></g>
			<g>
				<circle
					cx={load.bus.x}
					cy={load.bus.y}
					r="5"
					fill="none"
					stroke={colors.red.to_css()}
					stroke-width="2"
					style:pointer-events="none"
				></circle>
			</g>
		</MapContainer>
	</div>
	{#if load_data.building && load_baseline_data.building}
		<div class="card cell-md">
			<h2 class="card-title">Net Power</h2>
			<svg
				class="chart"
				{@attach graph(axis.building(load_baseline_data.building, load_data.building, 'net_power'))}
			></svg>
		</div>
		<div class="card cell-md">
			<h2 class="card-title">Total Power</h2>
			<svg
				class="chart"
				{@attach graph(axis.building(load_baseline_data.building, load_data.building, 'power'))}
			></svg>
		</div>
	{/if}
</div>
{#if load_data.battery && load_baseline_data.battery}
	<div class="header-card">
		<h2 class="section-header">Battery Vitals</h2>
	</div>
	<div class="dashboard-grid wide">
		<div class="card cell-md">
			<h2 class="card-title">Operating Mode</h2>
			<svg
				class="chart"
				{@attach graph(
					axis.battery(load_baseline_data.battery, load_data.battery, 'operating_mode')
				)}
			></svg>
		</div>
		<div class="card cell-md">
			<h2 class="card-title">State of Charge</h2>
			<svg
				class="chart"
				{@attach graph(
					axis.battery(load_baseline_data.battery, load_data.battery, 'state_of_charge')
				)}
			></svg>
		</div>
		<div class="card cell-md">
			<h2 class="card-title">Battery Active Power</h2>
			<svg
				class="chart"
				{@attach graph(axis.battery(load_baseline_data.battery, load_data.battery, 'active_power'))}
			></svg>
		</div>
	</div>
{/if}
{#if load_data.cyber}
	{@const bandwidth_axis = axis.network_entity_flows(load_data.cyber.flows, load_data.cyber.id)}
	{@const traffic_axis = axis.network_entity_flows(
		load_data.cyber.flows,
		load_data.cyber.id,
		'packets'
	)}
	{@const resets_axis = axis.network_entity_flows(
		load_data.cyber.flows,
		load_data.cyber.id,
		'resets'
	)}
	{@const protocol_axis = axis.network_entity_flows(
		load_data.cyber.flows,
		load_data.cyber.id,
		'protocols'
	)}
	<div class="header-card">
		<h2 class="section-header">Network Vitals</h2>
	</div>
	<div class="dashboard-grid wide">
		{#if bandwidth_axis}
			<div class="card cell-md">
				<h2 class="card-title">Bandwidth</h2>
				<svg class="chart" {@attach graph(bandwidth_axis)}></svg>
			</div>
		{/if}
		{#if traffic_axis}
			<div class="card cell-md">
				<h2 class="card-title">Traffic</h2>
				<svg class="chart" {@attach graph(traffic_axis)}></svg>
			</div>
		{/if}
		{#if resets_axis}
			<div class="card cell-md">
				<h2 class="card-title">Resets</h2>
				<svg class="chart" {@attach graph(resets_axis)}></svg>
			</div>
		{/if}
		{#if protocol_axis}
			<div class="card cell-md">
				<h2 class="card-title">Protocols by Device</h2>
				<svg class="chart" {@attach graph(protocol_axis)}></svg>
			</div>
		{/if}
	</div>
{/if}

<style>
	.chart {
		width: 100%;
		height: 100%;
	}
</style>
