<script module lang="ts">
	import { asset } from '$app/paths';
	const scenarios: Map<
		string,
		{
			name: string;
			path: string;
		}
	> = new Map([
		[
			'baseline',
			{
				name: 'Baseline',
				path: asset('/scenarios/baseline.buff')
			}
		],
		[
			'api-attack',
			{
				name: 'API Attack',
				path: asset('/scenarios/api-attack.buff')
			}
		],
		[
			'api-mitigation',
			{
				name: 'API Mitigation',
				path: asset('/scenarios/api-mitigation.buff')
			}
		],
		[
			'dns-attack',
			{
				name: 'DNS Attack',
				path: asset('/scenarios/dns-attack.buff')
			}
		],
		[
			'dns-mitigation',
			{
				name: 'DNS Mitigation',
				path: asset('/scenarios/dns-mitigation.buff')
			}
		]
	]);
</script>

<script lang="ts">
	import { Scenario } from '$lib/scenario';
	type props = { scenario?: Scenario; onscenariochange?: (scenario: Scenario) => void };

	let { scenario = $bindable(), onscenariochange }: props = $props();
</script>

<select
	value={scenario?.name}
	onchange={(e) => {
		const id = e.currentTarget.value;
		const scenario_spec = scenarios.get(id);
		if (!scenario_spec) {
			console.error(`Scenario with id ${id} not found`);
			return;
		}
		Scenario.load(scenario_spec.path).then((loaded_scenario) => {
			scenario = loaded_scenario;
			if (onscenariochange) {
				onscenariochange(loaded_scenario);
			}
		});
	}}
>
	{#each scenarios.entries() as [id, scenario] (id)}
		<option value={id}>{scenario.name}</option>
	{/each}
</select>
