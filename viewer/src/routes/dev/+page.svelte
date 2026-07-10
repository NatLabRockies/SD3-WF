<script lang="ts">
	import { app_state } from '$lib';
	import { graph } from '$lib/charts';
	import * as axis from '$lib/axis_configs.svelte';
	let component_id = $state('');
	let component = $derived(app_state.feeder.get_component_by_id(parseInt(component_id)));
</script>

<label
	>Component id
	<input type="text" bind:value={component_id} />
</label>
{#if component}
	<h2>Component Type: {component.type}</h2>
	{@const baseline_data = app_state.baseline_scenario.get_data_for_component(component)}
	{@const scenario_data = app_state.scenario.get_data_for_component(component)}
	{#if baseline_data}
		Baseline data length: {baseline_data.timeseries.length}
	{/if}
	{#if scenario_data}
		Scenario data length: {scenario_data.timeseries.length}
	{/if}
	{#if baseline_data && scenario_data}
		{#if baseline_data.type == 'bus' && scenario_data.type == 'bus'}
			<svg {@attach graph(axis.bus(baseline_data, scenario_data, 'voltage'))}></svg>
		{/if}
	{:else}
		<h2>No Data</h2>
	{/if}
{/if}
