<script lang="ts">
	import { type FeederComponent, type LineComponent } from '$lib/feeder';
	import { graph } from '$lib/charts';
	import Map from '$lib/components/Map.svelte';
	import MapContainer from '$lib/components/MapContainer.svelte';
	import voltage_map from '$lib/charts/voltage_map.svelte';
	import load_map from '$lib/charts/load_map.svelte';
	import { axis, app_state } from '$lib';
	import { resolve } from '$app/paths';

	let selected_component: FeederComponent | undefined = $state();

	const selected_line = $derived.by(() => {
		let starting_component = selected_component;
		if (!selected_component) {
			starting_component = app_state.feeder.source_bus;
		}

		if (!selected_component || selected_component.type !== 'line') {
			let selected_line: LineComponent | undefined = undefined;
			app_state.feeder.walk(
				(component) => {
					if (
						component.type === 'line' &&
						!selected_line &&
						app_state.scenario.components.get(component.id)
					) {
						selected_line = component;
					}
				},
				{
					starting_component,
					direction: 'downstream'
				}
			);
			if (!selected_line) {
				throw Error('Could not find line close to starting bus');
			}
			return selected_line;
		} else {
			return selected_component;
		}
	});

	let map_overlay = $state<'power' | 'voltage' | 'none'>('none');
	let building_variable: axis.BuildingVariable = $state('net_power');
</script>

<div class="header-card">
	<h1 class="page-header">Grid Operations Dashboard</h1>
</div>
<div class="dashboard-grid wide">
	<div class="card feature-cell no-pad" style:position="relative" style:isolation="isolate">
		<MapContainer class="h-full w-full">
			<Map
				oncomponentclick={(e) => (selected_component = e.targetComponent)}
				overlay={map_overlay}
				selected_component={selected_line}
			></Map>
			<g {@attach load_map()}></g>
		</MapContainer>
		<div id="map-controls">
			<menu>
				<div class="card">
					<h2 class="card-title">Map Overlay</h2>
					<div class="flex">
						{#each ['voltage', 'power', 'phase', 'none'] as option (option)}
							<label style:text-transform="capitalize">
								<input type="radio" name="overlay" value={option} bind:group={map_overlay} />
								{option}
							</label>
						{/each}
					</div>
				</div>
			</menu>
		</div>
	</div>
	<div class="card cell-md">
		<h2 class="card-title">Voltage</h2>
		<svg {@attach graph(axis.line(selected_line.id, 'voltage')!)} class="chart"></svg>
	</div>
	<div class="card cell-md">
		<h2 class="card-title">Building Power</h2>
		<svg {@attach graph(axis.building_fleet('net_power'))} class="chart"></svg>
	</div>
	<div class="card cell-md">
		<h2 class="card-title">Voltage vs Distance from Source</h2>
		<svg {@attach voltage_map()} class="chart"></svg>
	</div>
</div>
<div class="header-card">
	<h2 class="section-header">Loads</h2>
	<div class="right flex" style:flex-wrap="wrap">
		{#each [['power', 'Total Power'], ['net_power', 'Net Power'], ['purchased_power', 'Purchased Power']] as [option, name] (option)}
			<label>
				<input
					type="radio"
					name="building_variable"
					value={option}
					bind:group={building_variable}
				/>
				{name}
			</label>
		{/each}
	</div>
</div>
<div class="dashboard-grid wide">
	{#each app_state.feeder.get_components_by_type('load') as load (load.id)}
		{@const is_building = !!app_state.scenario.buildings.get(load.id)}
		{@const has_battery = !!app_state.scenario.batteries.get(load.id)}
		{#if is_building && has_battery}
			{@const building_data = app_state.scenario.buildings.get(load.id)}
			{@const baseline_building_data = app_state.baseline_scenario.buildings.get(load.id)}
			{#if !!building_data && !!baseline_building_data}
				<div class="card cell-sm">
					<a class="link" href={resolve('/buildings/[id]', { id: `${load.id}` })}
						><h2 class="card-title">Load #{load.id}</h2></a
					>
					<svg
						class="chart"
						{@attach graph(axis.building(baseline_building_data, building_data, building_variable))}
					/>
				</div>
			{/if}
		{/if}
	{/each}
</div>

<style>
	#map-controls {
		position: absolute;
		left: 0;
		top: 0;
		padding: var(--sp-sm);
		z-index: 10;
	}

	.chart {
		width: 100%;
		height: 100%;
	}
</style>
