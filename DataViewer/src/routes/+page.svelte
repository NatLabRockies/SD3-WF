<script lang="ts">
	import { parseCSV, parsePowerFlowCSV, mergeCommercialLoadData } from '$lib/parser';
	import * as Chart from '$lib/components/ui/chart/index';
	import * as Card from '$lib/components/ui/card/index';
	import * as Select from '$lib/components/ui/select/index';
	import ChartContainer from '$lib/components/ui/chart/chart-container.svelte';
	import {
		Area,
		AreaChart,
		ChartClipPath,
		type SeriesData,
		Chart as RegularChart,
		Layer,
		Axis
	} from 'layerchart';
	import type { DomainType } from 'layerchart/utils/scales.svelte';

	const COLORS = [
		'var(--chart-1)',
		'var(--chart-2)',
		'var(--chart-3)',
		'var(--chart-4)',
		'var(--chart-5)'
	];
	let powerBreakerData: Map<
		string,
		{
			timestamp: Date;
			[key: string]: any;
		}[]
	> = $state(new Map());
	$effect(() => {
		fetch('/data/baseline-s.power.breaker.csv')
			.then((r: Response) => r.text())
			.then((text: string) => {
				powerBreakerData = parsePowerFlowCSV(text, { keyColumn: 'name' });
			});
	});
	let selectedPowerBreakers = $state([]);
	let powerBreakerCharts = [
		{
			name: 'Frequency',
			key: 'freq'
		},
		{
			name: 'Voltage',
			key: 'voltage'
		},
		{
			name: 'Current',
			key: 'current'
		},
		{
			name: 'Power',
			key: 'power'
		}
	];
	let powerBreakerSeries: {
		key: string;
		label: string;
		color: string;
		data: { timestamp: Date; [key: string]: any }[];
	}[] = $derived.by(() => {
		return selectedPowerBreakers.map((name, index) => ({
			key: name,
			label: name,
			color: COLORS[index % COLORS.length],
			data: powerBreakerData.get(name) || []
		}));
	});

	let powerBusData = $state(new Map());
	$effect(() => {
		fetch('/data/baseline-s.power.bus.csv')
			.then((r: Response) => r.text())
			.then((text: string) => {
				powerBusData = parsePowerFlowCSV(text, { keyColumn: 'name' });
			});
	})
	let selectedPowerBuses = $state([]);
	let powerBusCharts = [
		{
			name: 'Voltage',
			key: 'voltage'
		}];
	let powerBusSeries: {
		key: string;
		label: string;
		color: string;
		data: { timestamp: Date; [key: string]: any }[];
	}[] = $derived.by(() => {
		return selectedPowerBuses.map((name, index) => ({
			key: name,
			label: name,
			color: COLORS[index % COLORS.length],
			data: powerBusData.get(name) || []
		}));
	});

	let powerCapacitorData = $state(new Map());
	$effect(() => {
		fetch('/data/baseline-s.power.capacitor.csv')
			.then((r: Response) => r.text())
			.then((text: string) => {
				powerCapacitorData = parsePowerFlowCSV(text, { keyColumn: 'name' });
			});
	});
	let selectedPowerCapacitors = $state([]);
	let powerCapacitorCharts = [
		{
			name: 'Voltage',
			key: 'voltage'
		},
		{
			name: 'Frequency',
			key: 'freq'
		},
		{
			name: 'Current',
			key: 'current'
		},
		{
			name: 'Power',
			key: 'power'
		}
	];
	let powerCapacitorSeries: {
		key: string;
		label: string;
		color: string;
		data: { timestamp: Date; [key: string]: any }[];
	}[] = $derived.by(() => {
		return selectedPowerCapacitors.map((name, index) => ({
			key: name,
			label: name,
			color: COLORS[index % COLORS.length],
			data: powerCapacitorData.get(name) || []
		}));
	});

	let powerLineData = $state(new Map());
	$effect(() => {
		fetch('/data/baseline-s.power.line.csv')
			.then((r: Response) => r.text())
			.then((text: string) => {
				powerLineData = parsePowerFlowCSV(text, { keyColumn: 'name' });
			});
	});
	let selectedPowerLines = $state([]);
	let powerLineCharts = [
		{
			name: 'From Voltage',
			key: 'from_voltage'
		},
		{
			name: 'To Voltage',
			key: 'to_voltage'
		},
		{
			name: 'From Current',
			key: 'from_current'
		},
		{
			name: 'To Current',
			key: 'to_current'
		},
		{
			name: 'From Active Power',
			key: 'from_active_power'
		},
		{
			name: 'To Active Power',
			key: 'to_active_power'
		},
		{
			name: 'From Reactive Power',
			key: 'from_reactive_power'
		},
		{
			name: 'To Reactive Power',
			key: 'to_reactive_power'
		}
	];
	let powerLineSeries: {
		key: string;
		label: string;
		color: string;
		data: { timestamp: Date; [key: string]: any }[];
	}[] = $derived.by(() => {
		return selectedPowerLines.map((name, index) => ({
			key: name,
			label: name,
			color: COLORS[index % COLORS.length],
			data: powerLineData.get(name) || []
		}));
	});

	let powerLoadData = $state(new Map());
	$effect(() => {
		fetch('/data/baseline-s.power.load.csv')
			.then((r: Response) => r.text())
			.then((text: string) => {
				powerLoadData = parsePowerFlowCSV(text, { keyColumn: 'name'
			});
		});
	});
	let selectedPowerLoads = $state([]);
	let powerLoadCharts = [
		{
			name: 'Voltage',
			key: 'voltage'
		},
		{
			name: 'Current',
			key: 'current'
		},
		{
			name: 'Active Power',
			key: 'active_power'
		},
		{
			name: 'Reactive Power',
			key: 'reactive_power'
		}
	];
	let powerLoadSeries: {
		key: string;
		label: string;
		color: string;
		data: { timestamp: Date; [key: string]: any }[];
	}[] = $derived.by(() => {
		return selectedPowerLoads.map((name, index) => ({
			key: name,
			label: name,
			color: COLORS[index % COLORS.length],
			data: powerLoadData.get(name) || []
		}));
	});

	let powerRegulatorData = $state(new Map());
	$effect(() => {
		fetch('/data/baseline-s.power.regulator.csv')
			.then((r: Response) => r.text())
			.then((text: string) => {
				powerRegulatorData = parsePowerFlowCSV(text, { keyColumn: 'name'});
		});
	});
	let selectedPowerRegulators = $state([]);
	let powerRegulatorCharts = [
		{
			name: 'Voltage',
			key: 'voltage'
		},
		{
			name: 'Current',
			key: 'current'
		},
		{
			name: 'Power',
			key: 'power'
		},
		{
			name: 'Frequency',
			key: 'freq'
		}
	];
	let powerRegulatorSeries: {
		key: string;
		label: string;
		color: string;
		data: { timestamp: Date; [key: string]: any }[];
	}[] = $derived.by(() => {
		return selectedPowerRegulators.map((name, index) => ({
			key: name,
			label: name,
			color: COLORS[index % COLORS.length],
			data: powerRegulatorData.get(name) || []
		}));
	});

	let powerTransformerData = $state(new Map());
	$effect(() => {
		fetch('/data/baseline-s.power.transformer.csv')
			.then((r: Response) => r.text())
			.then((text: string) => {
				powerTransformerData = parsePowerFlowCSV(text, { keyColumn: 'name'
			});
		});
	});
	let selectedPowerTransformers = $state([]);
	let powerTransformerCharts = [
		{
			name: 'From Voltage',
			key: 'from_voltage'
		},
		{
			name: 'To Voltage',
			key: 'to_voltage'
		},
		{
			name: 'From Current',
			key: 'from_current'
		},
		{
			name: 'To Current',
			key: 'to_current'
		},
		{
			name: 'From active Power',
			key: 'from_active_power'
		},
		{
			name: 'To active Power',
			key: 'to_active_power'
		},
		{
			name: 'From reactive Power',
			key: 'from_reactive_power'
		},
		{
			name: 'To reactive Power',
			key: 'to_reactive_power'
		}
	];
	let powerTransformerSeries: {
		key: string;
		label: string;
		color: string;
		data: { timestamp: Date; [key: string]: any }[];
	}[] = $derived.by(() => {
		return selectedPowerTransformers.map((name, index) => ({
			key: name,
			label: name,
			color: COLORS[index % COLORS.length],
			data: powerTransformerData.get(name) || []
		}));
	});

	const commercialLoadFiles = [
		'baseline-s.commercial.active_power.csv',
		'baseline-s.commercial.activePowerStatusBattery.csv',
		'baseline-s.commercial.batteryCurrent.csv',
		'baseline-s.commercial.batteryVoltage.csv',
		'baseline-s.commercial.reactive_power.csv',
		'baseline-s.commercial.reactivePowerStatusBattery.csv',
		'baseline-s.commercial.setChargeDischargeRate.csv',
		'baseline-s.commercial.stateOfChargeStatus.csv'
	];

	const commercialCharts = [
		{
			name: 'Active Power',
			key: 'active_power'
		},
		{
			name: 'Reactive Power',
			key: 'reactive_power'
		},
		{
			name: 'Battery Voltage',
			key: 'batteryVoltage'
		},
		{
			name: 'Battery Current',
			key: 'batteryCurrent'
		},
		{
			name: 'State of Charge Status',
			key: 'stateOfChargeStatus'
		},
		{
			name: 'Set Charge Discharge Rate',
			key: 'setChargeDischargeRate'
		},
		{
			name: 'Active Power Status Battery',
			key: 'activePowerStatusBattery'
		},
		{
			name: 'Reactive Power Status Battery',
			key: 'reactivePowerStatusBattery'
		}
	];

	let commercialLoadData: Map<string, { timestamp: Date; [key: string]: any }[]> = $state(
		new Map()
	);

	$effect(() => {
		const csvDataRequests = commercialLoadFiles.map((file) =>
			fetch(`/data/${file}`).then((r: Response) =>
				r.text().then((text: string) => {
					return parsePowerFlowCSV(text, {
						keyColumn: 'load_id',
						variableNameColumn: 'name',
						variableValueColumn: 'value'
					});
				})
			)
		);
		Promise.all(csvDataRequests).then((csvData) => {
			commercialLoadData = mergeCommercialLoadData(...csvData);
		});
	});

	let selectedCommercialLoadIDs: string[] = $state([]);

	let commercialSeries: {
		key: string;
		label: string;
		color: string;
		data: { timestamp: Date; [key: string]: any }[];
	}[] = $derived.by(() => {
		return selectedCommercialLoadIDs.map((load_id, index) => ({
			key: load_id,
			label: load_id,
			color: COLORS[index % COLORS.length],
			data: commercialLoadData.get(load_id) || []
		}));
	});

	let xDomain: DomainType = $state(null);
</script>

<main>
	<h1 class="mb-6 text-4xl font-bold">Data Interactive</h1>
	<section>
		<div class="mb-4 flex items-center">
			<h2 class="text-2xl font-semibold">Commercial Load Data Visualizations</h2>
			<Select.Root type="multiple" bind:value={selectedCommercialLoadIDs}>
				<Select.Trigger class="ml-auto">
					{selectedCommercialLoadIDs.join(', ')}
				</Select.Trigger>
				<Select.Content>
					{#each commercialLoadData.keys() as load_id}
						<Select.Item value={load_id}>
							{load_id}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
		<div class="my-6 grid grid-cols-2 gap-6">
			{#each commercialCharts as chart}
				<Card.Root>
					<Card.Header class="flex">
						<div class="flex flex-col">
							<Card.Title>{chart.name}</Card.Title>
						</div>
					</Card.Header>
					<Card.Content>
						<ChartContainer config={{}}>
							<AreaChart
								x="timestamp"
								y={chart.key}
								series={commercialSeries}
								brush={{ onBrushEnd: (e) => (xDomain = e.xDomain) }}
								{xDomain}
							>
								{#snippet tooltip()}
									<Chart.Tooltip />
								{/snippet}
							</AreaChart>
						</ChartContainer>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</section>
	<section>
		<div class="mb-4 flex items-center">
			<h2 class="text-2xl font-semibold">Power Breaker Data Visualization</h2>
			<Select.Root type="multiple" bind:value={selectedPowerBreakers}>
				<Select.Trigger class="ml-auto">
					{selectedPowerBreakers.join(', ')}
				</Select.Trigger>
				<Select.Content>
					{#each powerBreakerData.keys() as name}
						<Select.Item value={name}>
							{name}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
		<div class="my-6 grid grid-cols-2 gap-6">
			{#each powerBreakerCharts as chart}
				<Card.Root>
					<Card.Header class="flex">
						<div class="flex flex-col">
							<Card.Title>{chart.name}</Card.Title>
						</div>
					</Card.Header>
					<Card.Content>
						<ChartContainer config={{}}>
							<AreaChart x="timestamp" y={chart.key} series={powerBreakerSeries} brush={{ onBrushEnd: (e) => (xDomain = e.xDomain) }}
								{xDomain}>
								{#snippet tooltip()}
									<Chart.Tooltip />
								{/snippet}
							</AreaChart>
						</ChartContainer>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</section>
	<section>
		<div class="mb-4 flex items-center">
			<h2 class="text-2xl font-semibold">Power Bus Data Visualization</h2>
			<Select.Root type="multiple" bind:value={selectedPowerBuses}>
				<Select.Trigger class="ml-auto">
					{selectedPowerBuses.join(', ')}
				</Select.Trigger>
				<Select.Content>
					{#each powerBusData.keys() as name}
						<Select.Item value={name}>
							{name}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
		<div class="my-6 grid grid-cols-2 gap-6">
			{#each powerBusCharts as chart}
				<Card.Root>
					<Card.Header class="flex">
						<div class="flex flex-col">
							<Card.Title>{chart.name}</Card.Title>
						</div>
					</Card.Header>
					<Card.Content>
						<ChartContainer config={{}}>
							<AreaChart x="timestamp" y={chart.key} series={powerBusSeries} brush={{ onBrushEnd: (e) => (xDomain = e.xDomain) }}
								{xDomain}>
								{#snippet tooltip()}
									<Chart.Tooltip />
								{/snippet}
							</AreaChart>
						</ChartContainer>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</section>
	<section>
		<div class="mb-4 flex items-center">
			<h2 class="text-2xl font-semibold">Power Capacitor Data Visualization</h2>
			<Select.Root type="multiple" bind:value={selectedPowerCapacitors}>
				<Select.Trigger class="ml-auto">
					{selectedPowerCapacitors.join(', ')}
				</Select.Trigger>
				<Select.Content>
					{#each powerCapacitorData.keys() as name}
						<Select.Item value={name}>
							{name}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
		<div class="my-6 grid grid-cols-2 gap-6">
			{#each powerCapacitorCharts as chart}
				<Card.Root>
					<Card.Header class="flex">
						<div class="flex flex-col">
							<Card.Title>{chart.name}</Card.Title>
						</div>
					</Card.Header>
					<Card.Content>
						<ChartContainer config={{}}>
							<AreaChart x="timestamp" y={chart.key} series={powerCapacitorSeries} brush={{ onBrushEnd: (e) => (xDomain = e.xDomain) }}
								{xDomain}>
								{#snippet tooltip()}
									<Chart.Tooltip />
								{/snippet}
							</AreaChart>
						</ChartContainer>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</section>
	<section>
		<div class="mb-4 flex items-center">
			<h2 class="text-2xl font-semibold">Power Line Data Visualization</h2>
			<Select.Root type="multiple" bind:value={selectedPowerLines}>
				<Select.Trigger class="ml-auto">
					{selectedPowerLines.join(', ')}
				</Select.Trigger>
				<Select.Content>
					{#each powerLineData.keys() as name}
						<Select.Item value={name}>
							{name}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
		<div class="my-6 grid grid-cols-2 gap-6">
			{#each powerLineCharts as chart}
				<Card.Root>
					<Card.Header class="flex">
						<div class="flex flex-col">
							<Card.Title>{chart.name}</Card.Title>
						</div>
					</Card.Header>
					<Card.Content>
						<ChartContainer config={{}}>
							<AreaChart x="timestamp" y={chart.key} series={powerLineSeries} brush={{ onBrushEnd: (e) => (xDomain = e.xDomain) }}
								{xDomain}>
								{#snippet tooltip()}
									<Chart.Tooltip />
								{/snippet}
							</AreaChart>
						</ChartContainer>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</section>
	<section>
		<div class="mb-4 flex items-center">
			<h2 class="text-2xl font-semibold">Power Load Data Visualization</h2>
			<Select.Root type="multiple" bind:value={selectedPowerLoads}>
				<Select.Trigger class="ml-auto">
					{selectedPowerLoads.join(', ')}
				</Select.Trigger>
				<Select.Content>
					{#each powerLoadData.keys() as name}
						<Select.Item value={name}>
							{name}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
		<div class="my-6 grid grid-cols-2 gap-6">
			{#each powerLoadCharts as chart}
				<Card.Root>
					<Card.Header class="flex">
						<div class="flex flex-col">
							<Card.Title>{chart.name}</Card.Title>
						</div>
					</Card.Header>
					<Card.Content>
						<ChartContainer config={{}}>
							<AreaChart x="timestamp" y={chart.key} series={powerLoadSeries} brush={{ onBrushEnd: (e) => (xDomain = e.xDomain) }}
								{xDomain}>
								{#snippet tooltip()}
									<Chart.Tooltip />
								{/snippet}
							</AreaChart>
						</ChartContainer>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</section>
	<section>
		<div class="mb-4 flex items-center">
			<h2 class="text-2xl font-semibold">Power Regulator Data Visualization</h2>
			<Select.Root type="multiple" bind:value={selectedPowerRegulators}>
				<Select.Trigger class="ml-auto">
					{selectedPowerRegulators.join(', ')}
				</Select.Trigger>
				<Select.Content>
					{#each powerRegulatorData.keys() as name}
						<Select.Item value={name}>
							{name}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
		<div class="my-6 grid grid-cols-2 gap-6">
			{#each powerRegulatorCharts as chart}
				<Card.Root>
					<Card.Header class="flex">
						<div class="flex flex-col">
							<Card.Title>{chart.name}</Card.Title>
						</div>
					</Card.Header>
					<Card.Content>
						<ChartContainer config={{}}>
							<AreaChart x="timestamp" y={chart.key} series={powerRegulatorSeries} brush={{ onBrushEnd: (e) => (xDomain = e.xDomain) }}
								{xDomain}>
								{#snippet tooltip()}
									<Chart.Tooltip />
								{/snippet}
							</AreaChart>
						</ChartContainer>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</section>
	<section>
		<div class="mb-4 flex items-center">
			<h2 class="text-2xl font-semibold">Power Regulator Data Visualization</h2>
			<Select.Root type="multiple" bind:value={selectedPowerTransformers}>
				<Select.Trigger class="ml-auto">
					{selectedPowerTransformers.join(', ')}
				</Select.Trigger>
				<Select.Content>
					{#each powerTransformerData.keys() as name}
						<Select.Item value={name}>
							{name}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
		<div class="my-6 grid grid-cols-2 gap-6">
			{#each powerTransformerCharts as chart}
				<Card.Root>
					<Card.Header class="flex">
						<div class="flex flex-col">
							<Card.Title>{chart.name}</Card.Title>
						</div>
					</Card.Header>
					<Card.Content>
						<ChartContainer config={{}}>
							<AreaChart x="timestamp" y={chart.key} series={powerTransformerSeries} brush={{ onBrushEnd: (e) => (xDomain = e.xDomain) }}
								{xDomain}>
								{#snippet tooltip()}
									<Chart.Tooltip />
								{/snippet}
							</AreaChart>
						</ChartContainer>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</section>
</main>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
