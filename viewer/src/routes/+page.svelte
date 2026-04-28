<script lang="ts">
	import { app_state, axis } from '$lib';
	import { graph } from '$lib/charts';
</script>

<!-- Header -->
<div class="header-card">
	<h1 class="page-header">Overview Dashboard</h1>
</div>

<div class="dashboard-grid wide">
	<div class="card cell-wide">
		<h2 class="card-title">Building Net Power</h2>
		<svg {@attach graph(axis.building_fleet('net_power'))} class="chart-svg"></svg>
	</div>
	<div class="card cell-wide">
		<h2 class="card-title">State of Charge</h2>
		<svg {@attach graph(axis.battery_fleet('state_of_charge'))} class="chart-svg"></svg>
	</div>
	<div class="card cell-wide">
		<h2 class="card-title">Battery Active Power</h2>
		<svg {@attach graph(axis.battery_fleet('active_power'))} class="chart-svg"></svg>
	</div>
	<div class="card cell-wide">
		<h2 class="card-title">Network Traffic</h2>
		<svg
			{@attach graph(axis.network_traffic(app_state.scenario.cyber.total_traffic))}
			class="chart-svg"
		></svg>
	</div>
</div>

<style>
	.chart-svg {
		height: 100%;
		width: 100%;
	}
</style>
