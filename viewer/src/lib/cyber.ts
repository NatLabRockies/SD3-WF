/**
 * Cyber data layer — wraps decoded protobuf Cyber data and provides
 * pre-computed aggregations for chord diagrams and time-series charts.
 *
 * Primary storage is entity-level flows (EntityFlow). Role-level aggregates
 * (RoleFlow) are derived from entity flows. Protocol data on TrafficPoint
 * uses a record-keyed map (Partial<Record<AppProtocol, ProtocolMetrics>>)
 * for O(1) lookup.
 */

import type { sd3 } from '$lib/generated';
import type { HasSeconds } from '$lib/scenario';
import * as colors from '$lib/colors';
import { formatCss } from 'culori';

/** Canonical role identifiers used for grouping. */
export const ROLES = [
	'attacker',
	'oem',
	'battery',
	'aggregator',
	'isp',
	'utility',
	'substation',
	'infrastructure'
];
export type Role = (typeof ROLES)[number];

/** Colors assigned to each role for consistent visuals across charts. */
export const ROLE_COLORS: Record<Role, string> = {
	attacker: formatCss(colors.red),
	oem: '#457b9d',
	battery: formatCss(colors.green),
	aggregator: '#e9c46a',
	isp: formatCss(colors.orange),
	utility: '#264653',
	substation: '#6a4c93',
	infrastructure: '#adb5bd'
};

export const ROLE_LABELS: Record<Role, string> = {
	attacker: 'Attacker',
	oem: 'OEM',
	battery: 'Batteries',
	aggregator: 'Aggregator',
	isp: 'ISP',
	utility: 'Utility',
	substation: 'Substation',
	infrastructure: 'Infrastructure'
};

// ---------------------------------------------------------------------------
// Transport & application protocol enums (mirror proto Cyber.Transport and
// Cyber.AppProtocol numeric values — kept in sync with scenario.proto).
// ---------------------------------------------------------------------------

/** Numeric values matching sd3.Cyber.Transport enum. */
export const Transport = {
	TRANSPORT_UNKNOWN: 0,
	TCP: 1,
	UDP: 2,
	ICMP: 3,
	IGMP: 4
} as const;
export type Transport = (typeof Transport)[keyof typeof Transport];

/** Numeric values matching sd3.Cyber.AppProtocol enum. */
export const AppProtocol = {
	APP_UNKNOWN: 0,
	HTTP: 1,
	TLS: 2,
	DNS: 3,
	SSH: 4,
	IEEE_2030_5: 5,
	EPHEMERAL: 6
} as const;
export type AppProtocol = (typeof AppProtocol)[keyof typeof AppProtocol];

export const APP_PROTOCOL_LABELS: Record<AppProtocol, string> = {
	[AppProtocol.APP_UNKNOWN]: 'Unknown',
	[AppProtocol.HTTP]: 'HTTP',
	[AppProtocol.TLS]: 'TLS',
	[AppProtocol.DNS]: 'DNS',
	[AppProtocol.SSH]: 'SSH',
	[AppProtocol.IEEE_2030_5]: 'IEEE 2030.5',
	[AppProtocol.EPHEMERAL]: 'Ephemeral'
};

export const APP_PROTOCOL_COLORS: Record<AppProtocol, string> = {
	[AppProtocol.APP_UNKNOWN]: '#adb5bd',
	[AppProtocol.HTTP]: formatCss(colors.red),
	[AppProtocol.TLS]: formatCss(colors.teal),
	[AppProtocol.DNS]: formatCss(colors.yellow),
	[AppProtocol.SSH]: formatCss(colors.blue),
	[AppProtocol.IEEE_2030_5]: formatCss(colors.orange),
	[AppProtocol.EPHEMERAL]: '#dee2e6'
};

// ---------------------------------------------------------------------------
// Core data types
// ---------------------------------------------------------------------------

/** Clean network entity — extracted from proto at construction time. */
export interface NetworkEntity {
	id: number;
	ip_address: string;
	label: string;
	role: Role;
	/** FK to grid component id; 0 = no link */
	grid_component_id: number;
}

/** Per-protocol metrics within a single time bin. */
export interface ProtocolMetrics {
	bytes: number;
	packets: number;
	rst_count: number;
}

/** A single time-bin's traffic data with record-keyed protocol breakdown. */
export interface TrafficPoint extends HasSeconds {
	bytes: number;
	packets: number;
	rst_count: number;
	/** Per-AppProtocol breakdown — only protocols with traffic at this bin are present. */
	protocols: Partial<Record<AppProtocol, ProtocolMetrics>>;
}

/** An entity-to-entity flow — primary storage in CyberData. */
export interface EntityFlow {
	source_id: number;
	dest_id: number;
	timeseries: TrafficPoint[];
}

/** A role-to-role flow — derived from entity flows. */
export interface RoleFlow {
	source: Role;
	dest: Role;
	timeseries: TrafficPoint[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Create an empty TrafficPoint for a given seconds value. */
function empty_point(seconds: number): TrafficPoint {
	return { seconds, bytes: 0, packets: 0, rst_count: 0, protocols: {} };
}

/** Accumulate protocol metrics from a proto ProtocolBreakdown into a TrafficPoint. */
function accumulate_protocol(
	point: TrafficPoint,
	app: AppProtocol,
	bytes: number,
	packets: number,
	rst_count: number
): void {
	const existing = point.protocols[app];
	if (existing) {
		existing.bytes += bytes;
		existing.packets += packets;
		existing.rst_count += rst_count;
	} else {
		point.protocols[app] = { bytes, packets, rst_count };
	}
}

/** Accumulate one TrafficPoint's data into another (same seconds). */
function accumulate_point(target: TrafficPoint, source: TrafficPoint): void {
	target.bytes += source.bytes;
	target.packets += source.packets;
	target.rst_count += source.rst_count;
	for (const key in source.protocols) {
		const app = Number(key) as AppProtocol;
		const m = source.protocols[app]!;
		accumulate_protocol(target, app, m.bytes, m.packets, m.rst_count);
	}
}

export function get_flow_protocols(flow: EntityFlow | RoleFlow): Set<AppProtocol> {
	const traffic_points = flow.timeseries;
	return traffic_points.reduce((protocols, point) => {
		const _protocols = Object.keys(point.protocols) as unknown as Array<
			keyof TrafficPoint['protocols']
		>;
		return new Set(_protocols).union(protocols);
	}, new Set<AppProtocol>());
}

/** Normalize role strings from protobuf to our canonical set. */
function normalize_role(role: string): Role {
	const r = role.toLowerCase();
	if (r === 'attacker') return 'attacker';
	if (r === 'oem') return 'oem';
	if (r === 'battery' || r === 'battery_infra') return 'battery';
	if (r === 'aggregator') return 'aggregator';
	if (r === 'isp') return 'isp';
	if (r === 'utility') return 'utility';
	if (r === 'substation') return 'substation';
	return 'infrastructure';
}

export function aggregate_traffic(...traffic: TrafficPoint[][]): TrafficPoint[] {
	function aggregate_points(...points: TrafficPoint[]): TrafficPoint {
		return points.reduce((target, source) => {
			accumulate_point(target, source);
			return target;
		}, empty_point(points[0].seconds));
	}
	const sorted_points = traffic.flat().sort((a, b) => a.seconds - b.seconds);
	const combined_points: TrafficPoint[] = [];
	for (let i = 0; i < sorted_points.length; i++) {
		const current_point = sorted_points[i];
		const same_time_points = [current_point];
		for (let j = i + 1; j < sorted_points.length; j++) {
			const test_point = sorted_points[j];
			if (test_point.seconds !== current_point.seconds) {
				i = j - 1;
				break;
			}
			same_time_points.push(test_point);
		}
		combined_points.push(aggregate_points(...same_time_points));
	}
	return combined_points;
}

// ---------------------------------------------------------------------------
// CyberData class
// ---------------------------------------------------------------------------

export class CyberData {
	/** All entities in this scenario, keyed by their protobuf id. */
	readonly entities: Map<number, NetworkEntity>;

	/** All unique time-bin seconds values, sorted ascending. */
	readonly time_bins: number[];

	/** Entity-to-entity flows — primary storage. */
	readonly entity_flows: EntityFlow[];

	/** Role-to-role flows — derived from entity flows. */
	readonly role_flows: RoleFlow[];

	/** Total traffic per time bin (all flows summed). */
	readonly total_traffic: TrafficPoint[];

	/** Per-role outbound+inbound traffic per time bin. */
	readonly traffic_by_role: Map<Role, TrafficPoint[]>;

	/** Total traffic per AppProtocol across all flows over time. */
	readonly protocol_traffic: Map<AppProtocol, TrafficPoint[]>;

	/** Whether this scenario has any cyber data at all. */
	readonly has_cyber_data: boolean;

	constructor(cyber: sd3.ICyber | null | undefined) {
		this.entities = new Map();
		this.time_bins = [];
		this.entity_flows = [];
		this.role_flows = [];
		this.total_traffic = [];
		this.traffic_by_role = new Map();
		this.protocol_traffic = new Map();

		if (!cyber || !cyber.entities?.length || !cyber.flows?.length) {
			this.has_cyber_data = false;
			return;
		}
		this.has_cyber_data = true;

		// --- Index entities ---
		for (const e of cyber.entities) {
			if (e.id != null) {
				this.entities.set(e.id, {
					id: e.id,
					ip_address: e.ipAddress ?? '',
					label: e.label ?? '',
					role: normalize_role(e.role ?? 'unknown'),
					grid_component_id: e.gridComponentId ?? 0
				});
			}
		}

		// --- Collect all unique time bins across all flows ---
		const bin_set = new Set<number>();
		for (const flow of cyber.flows) {
			if (!flow.timeseries) continue;
			for (const tp of flow.timeseries) {
				if (tp.seconds != null) bin_set.add(tp.seconds);
			}
		}
		this.time_bins = Array.from(bin_set).sort((a, b) => a - b);

		// Build bin index for fast lookup
		const bin_index = new Map<number, number>();
		this.time_bins.forEach((s, i) => bin_index.set(s, i));
		const num_bins = this.time_bins.length;

		// --- Build entity flows (primary storage) ---
		for (const flow of cyber.flows) {
			if (!flow.timeseries || flow.sourceId == null || flow.destId == null) continue;

			const timeseries: TrafficPoint[] = this.time_bins.map((s) => empty_point(s));

			for (const tp of flow.timeseries) {
				if (tp.seconds == null) continue;
				const idx = bin_index.get(tp.seconds);
				if (idx == null) continue;
				const point = timeseries[idx];
				const b = tp.bytes ?? 0;
				const p = tp.packets ?? 0;

				point.bytes += b;
				point.packets += p;

				if (tp.protocols) {
					for (const pb of tp.protocols) {
						const app = (pb.app ?? 0) as AppProtocol;
						const pb_b = pb.bytes ?? 0;
						const pb_p = pb.packets ?? 0;
						const pb_r = pb.rstCount ?? 0;
						accumulate_protocol(point, app, pb_b, pb_p, pb_r);
						point.rst_count += pb_r;
					}
				}
			}

			// Only keep flows that have at least some traffic
			if (timeseries.some((tp) => tp.bytes > 0 || tp.packets > 0)) {
				this.entity_flows.push({
					source_id: flow.sourceId,
					dest_id: flow.destId,
					timeseries
				});
			}
		}

		// --- Derive role flows from entity flows ---
		const role_flow_map = new Map<string, TrafficPoint[]>();

		for (const ef of this.entity_flows) {
			const src_entity = this.entities.get(ef.source_id);
			const dst_entity = this.entities.get(ef.dest_id);
			const src_role = src_entity?.role ?? 'infrastructure';
			const dst_role = dst_entity?.role ?? 'infrastructure';
			const key = `${src_role}|${dst_role}`;

			if (!role_flow_map.has(key)) {
				role_flow_map.set(
					key,
					this.time_bins.map((s) => empty_point(s))
				);
			}
			const role_points = role_flow_map.get(key)!;

			for (let i = 0; i < num_bins; i++) {
				accumulate_point(role_points[i], ef.timeseries[i]);
			}
		}

		for (const [key, timeseries] of role_flow_map) {
			const [source, dest] = key.split('|') as [Role, Role];
			// Only include if there's actual traffic
			if (timeseries.some((tp) => tp.bytes > 0 || tp.packets > 0)) {
				this.role_flows.push({ source, dest, timeseries });
			}
		}

		// --- Build total traffic ---
		const total: TrafficPoint[] = this.time_bins.map((s) => empty_point(s));
		for (const rf of this.role_flows) {
			for (let i = 0; i < num_bins; i++) {
				accumulate_point(total[i], rf.timeseries[i]);
			}
		}
		this.total_traffic = total;

		// --- Build traffic by role (outbound + inbound) ---
		const role_points = new Map<Role, TrafficPoint[]>();
		for (const role of ROLES) {
			role_points.set(
				role,
				this.time_bins.map((s) => empty_point(s))
			);
		}

		for (const rf of this.role_flows) {
			const src_bins = role_points.get(rf.source)!;
			const dst_bins = role_points.get(rf.dest)!;
			for (let i = 0; i < num_bins; i++) {
				const tp = rf.timeseries[i];
				src_bins[i].bytes += tp.bytes;
				src_bins[i].packets += tp.packets;
				dst_bins[i].bytes += tp.bytes;
				dst_bins[i].packets += tp.packets;
			}
		}

		for (const role of ROLES) {
			const bins = role_points.get(role)!;
			if (bins.some((tp) => tp.bytes > 0)) {
				this.traffic_by_role.set(role, bins);
			}
		}

		// --- Build protocol traffic ---
		const app_points = new Map<AppProtocol, TrafficPoint[]>();

		for (const rf of this.role_flows) {
			for (let i = 0; i < num_bins; i++) {
				const tp = rf.timeseries[i];
				for (const key in tp.protocols) {
					const app = Number(key) as AppProtocol;
					const m = tp.protocols[app]!;
					if (!app_points.has(app)) {
						app_points.set(
							app,
							this.time_bins.map((s) => empty_point(s))
						);
					}
					const bin = app_points.get(app)![i];
					bin.bytes += m.bytes;
					bin.packets += m.packets;
					bin.rst_count += m.rst_count;
				}
			}
		}

		for (const [app, bins] of app_points) {
			if (bins.some((tp) => tp.bytes > 0)) {
				this.protocol_traffic.set(app, bins);
			}
		}
	}

	/**
	 * Build a chord matrix aggregated over the entire scenario (all time bins
	 * summed). Returns a symmetric matrix — used for the stable chord diagram
	 * that does not react to the timeline scrubber.
	 */
	chord_aggregate_matrix(): { matrix: number[][]; roles: Role[] } {
		const active_roles = ROLES.filter((r) => this.traffic_by_role.has(r));
		const role_idx = new Map<Role, number>();
		active_roles.forEach((r, i) => role_idx.set(r, i));
		const n = active_roles.length;
		const matrix: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

		for (const rf of this.role_flows) {
			const si = role_idx.get(rf.source);
			const di = role_idx.get(rf.dest);
			if (si == null || di == null) continue;
			for (const tp of rf.timeseries) {
				matrix[si][di] += tp.bytes;
			}
		}

		// Symmetrize
		for (let i = 0; i < n; i++) {
			for (let j = i + 1; j < n; j++) {
				const total = matrix[i][j] + matrix[j][i];
				matrix[i][j] = total;
				matrix[j][i] = total;
			}
		}

		// Filter roles with no traffic at all
		const keep: number[] = [];
		for (let i = 0; i < n; i++) {
			if (matrix[i].some((v) => v > 0)) keep.push(i);
		}

		if (keep.length < n) {
			return {
				matrix: keep.map((i) => keep.map((j) => matrix[i][j])),
				roles: keep.map((i) => active_roles[i])
			};
		}
		return { matrix, roles: active_roles };
	}

	/**
	 * Aggregate RST counts per time bin across all flows, or filtered to a
	 * specific role pair (bidirectional: source<->dest both included).
	 * Returns TrafficPoints with rst_count populated — use (d) => d.rst_count
	 * as y_accessor.
	 */
	rst_timeseries(pair?: { source: Role; dest: Role }): TrafficPoint[] {
		if (this.time_bins.length === 0) return [];
		const num_bins = this.time_bins.length;
		const result: TrafficPoint[] = this.time_bins.map((s) => empty_point(s));

		for (const rf of this.role_flows) {
			if (pair && !matches_pair(rf, pair)) continue;
			for (let i = 0; i < num_bins; i++) {
				result[i].rst_count += rf.timeseries[i].rst_count;
			}
		}

		return result;
	}

	/**
	 * Per-protocol (AppProtocol) traffic timeseries, optionally filtered to a
	 * specific role-pair (bidirectional).
	 */
	protocol_timeseries(pair?: { source: Role; dest: Role }): Map<AppProtocol, TrafficPoint[]> {
		if (this.time_bins.length === 0) return new Map();
		if (!pair) return this.protocol_traffic;

		const num_bins = this.time_bins.length;
		const app_bins = new Map<AppProtocol, TrafficPoint[]>();

		for (const rf of this.role_flows) {
			if (!matches_pair(rf, pair)) continue;
			for (let i = 0; i < num_bins; i++) {
				const tp = rf.timeseries[i];
				for (const key in tp.protocols) {
					const app = Number(key) as AppProtocol;
					const m = tp.protocols[app]!;
					if (!app_bins.has(app)) {
						app_bins.set(
							app,
							this.time_bins.map((s) => empty_point(s))
						);
					}
					const bin = app_bins.get(app)![i];
					bin.bytes += m.bytes;
					bin.packets += m.packets;
					bin.rst_count += m.rst_count;
				}
			}
		}

		const result = new Map<AppProtocol, TrafficPoint[]>();
		for (const [app, bins] of app_bins) {
			if (bins.some((tp) => tp.bytes > 0)) result.set(app, bins);
		}
		return result;
	}

	/**
	 * Per-role traffic timeseries, optionally filtered to flows involving a
	 * specific role-pair (both roles included, all their flows summed).
	 */
	role_timeseries(pair?: { source: Role; dest: Role }): Map<Role, TrafficPoint[]> {
		if (!pair) return this.traffic_by_role;

		const num_bins = this.time_bins.length;
		const rb = new Map<Role, TrafficPoint[]>();

		for (const rf of this.role_flows) {
			if (!matches_pair(rf, pair)) continue;

			for (const role of [rf.source, rf.dest] as Role[]) {
				if (!rb.has(role)) {
					rb.set(
						role,
						this.time_bins.map((s) => empty_point(s))
					);
				}
			}
			const src_bins = rb.get(rf.source)!;
			const dst_bins = rb.get(rf.dest)!;

			for (let i = 0; i < num_bins; i++) {
				const tp = rf.timeseries[i];
				src_bins[i].bytes += tp.bytes;
				src_bins[i].packets += tp.packets;
				dst_bins[i].bytes += tp.bytes;
				dst_bins[i].packets += tp.packets;
			}
		}

		const result = new Map<Role, TrafficPoint[]>();
		for (const [role, bins] of rb) {
			if (bins.some((tp) => tp.bytes > 0)) result.set(role, bins);
		}
		return result;
	}

	/**
	 * Find the nearest available time bin for a given seconds value.
	 */
	nearest_bin(seconds: number): number {
		if (this.time_bins.length === 0) return 0;
		let lo = 0;
		let hi = this.time_bins.length - 1;
		while (lo < hi) {
			const mid = (lo + hi) >> 1;
			if (this.time_bins[mid] < seconds) lo = mid + 1;
			else hi = mid;
		}
		if (lo > 0 && seconds - this.time_bins[lo - 1] < this.time_bins[lo] - seconds) {
			return this.time_bins[lo - 1];
		}
		return this.time_bins[lo];
	}
}

// ---------------------------------------------------------------------------
// Pair matching helper
// ---------------------------------------------------------------------------

function matches_pair(rf: RoleFlow, pair: { source: Role; dest: Role }): boolean {
	return (
		(rf.source === pair.source && rf.dest === pair.dest) ||
		(rf.source === pair.dest && rf.dest === pair.source)
	);
}
