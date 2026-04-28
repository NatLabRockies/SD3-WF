<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		class?: string;
		[key: string]: unknown;
	}

	let { children, ...props }: Props = $props();

	// ─── DOM refs ────────────────────────────────────────────────────────────────
	let wrapper: HTMLElement | undefined = $state();
	let svg: SVGSVGElement | undefined = $state();
	let content_g: SVGGElement | undefined = $state();

	// ─── Transform state ─────────────────────────────────────────────────────────
	/** CSS scale currently applied to content_g */
	let scale = $state(1);
	/** CSS translate X (viewport pixels) */
	let tx = $state(0);
	/** CSS translate Y (viewport pixels) */
	let ty = $state(0);
	/** Scale at which all content is visible ("1×" from the user's perspective) */
	let fitScale = $state(1);
	/** Bounding box of content in feeder coordinates (from getBBox()) */
	let bbox: DOMRect | undefined = $state();
	/** When true, a CSS transition is active (programmatic calls only) */
	let transitioning = $state(false);

	const MAX_USER_ZOOM = 32;

	// ─── Helpers ─────────────────────────────────────────────────────────────────

	function computeFitScale(): number {
		if (!wrapper || !bbox) return 1;
		if (bbox.width === 0 || bbox.height === 0) return 1;
		return Math.min(wrapper.clientWidth / bbox.width, wrapper.clientHeight / bbox.height);
	}

	/**
	 * Clamp tx/ty and enforce minimum scale.
	 *
	 * Content occupies screen-space:
	 *   left:   bbox.x * scale + tx
	 *   right:  (bbox.x + bbox.width) * scale + tx
	 *   top:    bbox.y * scale + ty
	 *   bottom: (bbox.y + bbox.height) * scale + ty
	 *
	 * Two regimes:
	 *  • Content smaller than viewport (zoomed out / letterboxed):
	 *      Allow panning until the content is half off the viewport edge.
	 *      content_left ∈ [−cW/2, wW − cW/2]  (in screen space)
	 *
	 *  • Content larger than viewport (zoomed in):
	 *      Allow panning until the content edge reaches the viewport centre,
	 *      so every map point is reachable.
	 *      content_left ∈ [wW/2 − cW, wW/2]
	 *
	 * Centering is NOT enforced here — it belongs only in initialise() /
	 * resetView() so that normal panning is never blocked.
	 */
	function constrain(newTx: number, newTy: number, newScale: number): [number, number, number] {
		if (!wrapper || !bbox) return [newTx, newTy, newScale];

		const fs = computeFitScale();
		const clampedScale = Math.max(newScale, fs);

		const wW = wrapper.clientWidth;
		const wH = wrapper.clientHeight;
		const cW = bbox.width * clampedScale;
		const cH = bbox.height * clampedScale;

		// content_left = bbox.x * clampedScale + newTx
		// We clamp content_left, then recover newTx from it.
		const raw_left_x = bbox.x * clampedScale + newTx;
		const clamped_left_x =
			cW < wW
				? Math.max(-cW / 2, Math.min(wW - cW / 2, raw_left_x))
				: Math.max(wW / 2 - cW, Math.min(wW / 2, raw_left_x));
		const constrainedTx = clamped_left_x - bbox.x * clampedScale;

		const raw_left_y = bbox.y * clampedScale + newTy;
		const clamped_left_y =
			cH < wH
				? Math.max(-cH / 2, Math.min(wH - cH / 2, raw_left_y))
				: Math.max(wH / 2 - cH, Math.min(wH / 2, raw_left_y));
		const constrainedTy = clamped_left_y - bbox.y * clampedScale;

		return [constrainedTx, constrainedTy, clampedScale];
	}

	function applyTransform(newTx: number, newTy: number, newScale: number) {
		const [cx, cy, cs] = constrain(newTx, newTy, newScale);
		tx = cx;
		ty = cy;
		scale = cs;
	}

	// ─── Initialisation & resize ──────────────────────────────────────────────────

	function initialise() {
		if (!wrapper || !content_g) return;
		bbox = content_g.getBBox();
		fitScale = computeFitScale();
		scale = fitScale;
		// Center the bbox's centre on the viewport centre
		const center_x = bbox.x + bbox.width / 2;
		const center_y = bbox.y + bbox.height / 2;
		tx = wrapper.clientWidth / 2 - center_x * scale;
		ty = wrapper.clientHeight / 2 - center_y * scale;
	}

	$effect(() => {
		if (!wrapper || !content_g) return;

		// Wait one frame so the child has had a chance to render and
		// report its bounding box before we measure.
		const rafId = requestAnimationFrame(() => {
			initialise();

			const ro = new ResizeObserver(() => {
				const newFit = computeFitScale();

				if (scale < newFit) {
					// Snap to fit
					initialise();
				} else {
					fitScale = newFit;
					// Re-clamp tx/ty for the new wrapper size
					applyTransform(tx, ty, scale);
				}
			});

			ro.observe(wrapper!);
			return () => ro.disconnect();
		});

		return () => cancelAnimationFrame(rafId);
	});

	// ─── User interaction — mouse wheel (zoom to cursor) ─────────────────────────

	function onwheel(event: WheelEvent) {
		event.preventDefault();
		if (!wrapper) return;

		const rect = wrapper.getBoundingClientRect();
		const cursorX = event.clientX - rect.left;
		const cursorY = event.clientY - rect.top;

		// Multiplicative zoom: consistent feel regardless of current scale.
		// Normalise deltaY across deltaMode values.
		let delta = event.deltaY;
		if (event.deltaMode === 1) delta *= 16; // line mode → px
		if (event.deltaMode === 2) delta *= 100; // page mode → px

		const factor = Math.pow(2, -delta / 500);
		const newScale = Math.max(fitScale, Math.min(scale * factor, fitScale * MAX_USER_ZOOM));

		const ratio = newScale / scale;
		const newTx = cursorX - (cursorX - tx) * ratio;
		const newTy = cursorY - (cursorY - ty) * ratio;

		// User interaction: no transition
		transitioning = false;
		applyTransform(newTx, newTy, newScale);
	}

	// ─── User interaction — mouse drag (pan) ─────────────────────────────────────

	function onmousedown(event: MouseEvent) {
		// Left button only
		if (event.button !== 0 || !wrapper) return;
		event.preventDefault();

		const startTx = tx;
		const startTy = ty;
		const startX = event.clientX;
		const startY = event.clientY;

		transitioning = false;

		function onmousemove(e: MouseEvent) {
			const dx = e.clientX - startX;
			const dy = e.clientY - startY;
			applyTransform(startTx + dx, startTy + dy, scale);
		}

		function onmouseup(e: MouseEvent) {
			if (e.button !== 0) return;
			window.removeEventListener('mousemove', onmousemove);
			window.removeEventListener('mouseup', onmouseup);
		}

		// Attach to window so drag continues if cursor leaves the wrapper
		window.addEventListener('mousemove', onmousemove);
		window.addEventListener('mouseup', onmouseup);
	}

	// ─── Transition helpers ───────────────────────────────────────────────────────

	function withTransition(animated: boolean, fn: () => void) {
		if (!animated) {
			transitioning = false;
			fn();
			return;
		}
		transitioning = true;
		fn();
		// Turn off the transition flag once it finishes so subsequent
		// user interactions are not affected.
		content_g?.addEventListener(
			'transitionend',
			() => {
				transitioning = false;
			},
			{ once: true }
		);
	}

	// ─── Programmatic API ────────────────────────────────────────────────────────

	/**
	 * Smoothly pan so that feeder-space point (x, y) is centred in the viewport.
	 * Pass `animated: false` for an instant jump.
	 */
	export function panTo(x: number, y: number, animated = true) {
		if (!wrapper) return;
		withTransition(animated, () => {
			const newTx = wrapper!.clientWidth / 2 - x * scale;
			const newTy = wrapper!.clientHeight / 2 - y * scale;
			applyTransform(newTx, newTy, scale);
		});
	}

	/**
	 * Set the zoom level (1 = fully zoomed out / fit view) and centre the
	 * viewport on feeder-space point (x, y) at that zoom.
	 *
	 * If (x, y) are omitted the current viewport centre is preserved.
	 * Pass `animated: false` for an instant jump.
	 */
	export function zoomTo(targetZoom: number, x?: number, y?: number, animated = true) {
		if (!wrapper) return;
		const newScale = Math.max(fitScale, Math.min(fitScale * targetZoom, fitScale * MAX_USER_ZOOM));

		withTransition(animated, () => {
			let centerX: number;
			let centerY: number;

			if (x !== undefined && y !== undefined) {
				// Center the viewport on the given feeder-space point
				centerX = x;
				centerY = y;
			} else {
				// Preserve the current viewport centre
				centerX = (wrapper!.clientWidth / 2 - tx) / scale;
				centerY = (wrapper!.clientHeight / 2 - ty) / scale;
			}

			const newTx = wrapper!.clientWidth / 2 - centerX * newScale;
			const newTy = wrapper!.clientHeight / 2 - centerY * newScale;
			applyTransform(newTx, newTy, newScale);
		});
	}

	/**
	 * Return to the initial fit view (zoom = 1, content centred).
	 * Pass `animated: false` for an instant jump.
	 */
	export function resetView(animated = true) {
		withTransition(animated, () => {
			initialise();
		});
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	role="application"
	aria-label="Pannable and zoomable map"
	bind:this={wrapper}
	class={['map-container-wrapper', props.class]}
	{onwheel}
	{onmousedown}
>
	<svg bind:this={svg} width="100%" height="100%" style:--inverse-scale={1 / scale}>
		<g
			bind:this={content_g}
			class="map-content-g"
			class:transitioning
			style:transform="translate({tx}px, {ty}px) scale({scale})"
			style:transform-origin="0 0"
		>
			{@render children?.()}
		</g>
	</svg>
</div>

<style>
	.map-container-wrapper {
		overflow: hidden;
		user-select: none;
	}

	.map-container-wrapper:active {
		cursor: grabbing;
	}

	svg {
		display: block;
	}

	.map-content-g.transitioning {
		transition: transform 350ms ease;
	}
</style>
