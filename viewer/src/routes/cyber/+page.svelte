<script lang="ts">
	import { resolve } from '$app/paths';
	import { app_state, axis } from '$lib';
	import { type Axis, graph } from '$lib/charts';
	import { chord, type ChordPair } from '$lib/charts/chord.svelte';
	import { type TrafficPoint, ROLE_COLORS, ROLE_LABELS, aggregate_traffic } from '$lib/cyber';

	let selected_pair = $state<ChordPair | null>(null);
	let cyber = $derived(app_state.scenario.cyber);

	// Chord attachment — recreates only when cyber changes (scenario change).
	// selected_pair is behind a getter so changes to it do NOT recreate the chord —
	// only the highlight $effect inside the attachment re-runs.
	let chordAttachment = $derived(
		chord({
			cyberData: cyber,
			get selected_pair() {
				return selected_pair;
			},
			onPairSelect: (pair) => {
				selected_pair = pair;
			}
		})
	);

	const data = $derived(selected_pair ? pairTotalBins(selected_pair) : cyber.total_traffic);

	/** Aggregate total bytes per bin for a specific role-pair (bidirectional). */
	function pairTotalBins(pair: ChordPair): TrafficPoint[] {
		const points_to_combine = cyber.role_flows
			.filter(
				(rf) =>
					(rf.source === pair.source && rf.dest === pair.dest) ||
					(rf.source === pair.dest && rf.dest === pair.source)
			)
			.map((rf) => rf.timeseries);
		return aggregate_traffic(...points_to_combine);
	}

	function pairLabel(pair: ChordPair): string {
		return `${ROLE_LABELS[pair.source]} ↔ ${ROLE_LABELS[pair.dest]}`;
	}

	let totalTrafficAxis = $derived(axis.network_traffic(data));
	let rstAxis = $derived(axis.network_traffic(data, 'resets'));

	// --- ROLE TRAFFIC (bottom-left) ---
	let roleTrafficAxis = $derived.by<Axis<TrafficPoint> | null>(() => {
		if (!cyber.has_cyber_data) return null;
		const byRole = cyber.role_timeseries(selected_pair ?? undefined);
		if (byRole.size === 0) return null;
		const title = selected_pair ? `${pairLabel(selected_pair)}: By Role` : 'Traffic by Role';
		return {
			series: Array.from(byRole.entries()).map(([role, data]) => ({
				data,
				color: ROLE_COLORS[role],
				name: ROLE_LABELS[role]
			})),
			y_accessor: (d) => (d.bytes * 8) / 1000 / 60,
			title,
			units: 'kbps'
		};
	});

	let protocolAxis = $derived(axis.network_traffic(data, 'protocols'));
	let network_variable: axis.NetworkVariable = $state('bytes');
</script>

<div class="header-card">
	<h1 class="page-header">Cyber Security Dashboard</h1>
	{#if selected_pair}
		<div class="right pair-badge">
			<span>{pairLabel(selected_pair)}</span>
			<button class="clear-btn" onclick={() => (selected_pair = null)} aria-label="Clear selection"
				>×</button
			>
		</div>
	{:else}
		<p class="right hint-text">Click a ribbon to filter</p>
	{/if}
</div>
{#if !cyber.has_cyber_data}
	<div class="no-data-state wide">
		<p>No cyber data available for this scenario.</p>
	</div>
{:else}
	<div class="dashboard-grid wide">
		<!-- Center: Chord diagram spanning 2 columns × 2 rows -->
		<div class="card chord-cell feature-cell">
			<svg {@attach chordAttachment} class="chord-svg"></svg>
		</div>

		<!-- Top-left: Total Traffic -->
		<div class="card cell-md">
			{#if totalTrafficAxis}
				<h2 class="card-title">{totalTrafficAxis.title}</h2>
				<svg {@attach graph(totalTrafficAxis)} class="chart-svg"></svg>
			{:else}
				<div class="no-data-msg">No data</div>
			{/if}
		</div>

		<!-- Bottom-left: Traffic by Role -->
		<div class="card cell-md">
			{#if roleTrafficAxis}
				<h2 class="card-title">{roleTrafficAxis.title}</h2>
				<svg {@attach graph(roleTrafficAxis)} class="chart-svg"></svg>
			{:else}
				<div class="no-data-msg">No data</div>
			{/if}
		</div>

		<!-- Top-right: RST Count -->
		<div class="card cell-md">
			{#if !data.every((point) => point.rst_count === 0)}
				<h2 class="card-title">{rstAxis.title}</h2>
				<svg {@attach graph(rstAxis)} class="chart-svg"></svg>
			{:else}
				<div class="no-data-msg">No RST data for this scenario</div>
			{/if}
		</div>

		<!-- Bottom-right: Protocol Breakdown -->
		<div class="card cell-md">
			{#if protocolAxis}
				<h2 class="card-title">{protocolAxis.title}</h2>
				<svg {@attach graph(protocolAxis)} class="chart-svg"></svg>
			{:else}
				<div class="no-data-msg">No data</div>
			{/if}
		</div>
	</div>
{/if}
<div class="header-card">
	<h2 class="section-header">Network Entities</h2>
	<div class="right flex" style:flex-wrap="wrap">
		{#each [['bytes', 'Bandwidth'], ['packets', 'Packets'], ['resets', 'Resets'], ['protocols', 'Protocol']] as [option, name] (option)}
			<label>
				<input type="radio" name="network_variable" value={option} bind:group={network_variable} />
				{name}
			</label>
		{/each}
	</div>
</div>
<div class="dashboard-grid wide">
	{#each app_state.feeder.get_components_by_type('load') as load (load.id)}
		{@const data = app_state.scenario.get_data_for_component(load)}
		{#if data && data.cyber}
			{@const cyber_axis = axis.network_entity_flows(
				data.cyber.flows,
				data.cyber.id,
				network_variable
			)}
			{#if cyber_axis}
				<div class="card cell-sm">
					<a class="link" href={resolve('/buildings/[id]', { id: `${load.id}` })}
						><h2 class="card-title">Load #{load.id}</h2></a
					>
					<svg {@attach graph(cyber_axis)} class="chart-svg"></svg>
				</div>
			{/if}
		{/if}
	{/each}
</div>

<style>
	.pair-badge {
		display: flex;
		align-items: center;
		gap: 0.5ch;
		background-color: var(--primary-variant);
		color: var(--on-primary-variant);
		padding: 0.2lh 1.5ch;
		border-radius: var(--br-sm);
		font-size: var(--fs-xs);
		font-weight: 600;
		white-space: nowrap;
	}

	.clear-btn {
		background: none;
		border: none;
		cursor: pointer;
		font-size: var(--fs-sm);
		color: inherit;
		padding: 0 0.25ch;
		line-height: 1;
	}

	.hint-text {
		font-size: var(--fs-xs);
		color: var(--on-surface-low);
		white-space: nowrap;
	}

	.no-data-state {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--on-surface-low);
	}

	.chart-svg {
		height: 100%;
		width: 100%;
	}

	.chord-svg {
		width: 100%;
		height: 100%;
	}

	/* ---- Empty state inside a cell ---- */
	.no-data-msg {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--on-surface-low);
		font-size: var(--fs-xs);
		text-align: center;
	}
</style>
