import { Feeder } from '$lib/feeder';
import { Scenario } from '$lib/scenario';
import { asset } from '$app/paths';
export type AppState = typeof app_state;

const time_resolution = 60;
function round_seconds(value: number) {
	return Math.floor(value / time_resolution) * time_resolution;
}
let timestamp: number = $state(0);
let feeder: Feeder = $state(null!);
let scenario: Scenario = $state(null!);
let baseline_scenario: Scenario = $state(null!);
let seconds_brush: [number, number] = $state([0, 0]);
let ready = $state(false);

export async function init() {
	feeder = await Feeder.load(asset(`/feeders/feeder.buff`));
	scenario = await Scenario.load(asset(`/scenarios/api-attack.buff`));
	baseline_scenario = await Scenario.load(asset(`/scenarios/baseline.buff`));
	seconds_brush = [0, scenario.date_to_seconds(scenario.end_date)];
	ready = true;
}

let play_interval_id: number = $state(0);

function play(speed: number = 360) {
	if (play_interval_id != 0) {
		window.clearInterval(play_interval_id);
	}
	play_interval_id = window.setInterval(
		() => {
			timestamp += time_resolution;
			if (timestamp > seconds_brush[1]) {
				timestamp = seconds_brush[0];
			}
		},
		(1000 * time_resolution) / speed
	);
}

function stop() {
	window.clearInterval(play_interval_id);
	play_interval_id = 0;
}

export const app_state = {
	init,
	play,
	stop,
	get ready() {
		return ready;
	},
	get playing() {
		return play_interval_id != 0;
	},
	set playing(value) {
		if (value) {
			play();
		} else {
			stop();
		}
	},
	get feeder() {
		return feeder;
	},
	set feeder(value: Feeder) {
		feeder = value;
	},
	get scenario() {
		return scenario;
	},
	set scenario(value: Scenario) {
		scenario = value;
	},
	get baseline_scenario() {
		return baseline_scenario;
	},
	set baseline_scenario(value: Scenario) {
		baseline_scenario = value;
	},
	get timestamp() {
		return timestamp;
	},
	set timestamp(value: number) {
		timestamp = round_seconds(value);
	},
	get seconds_brush() {
		return seconds_brush;
	},
	set seconds_brush([min, max]: [number, number]) {
		seconds_brush = [round_seconds(min), round_seconds(max)];
	}
};
