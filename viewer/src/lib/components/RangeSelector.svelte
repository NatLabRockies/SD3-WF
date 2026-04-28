<script lang="ts">
	import { onMount } from 'svelte';
	import { type Snippet } from 'svelte';
	let {
		min = $bindable(0),
		max = $bindable(1),
		step = $bindable(0.1),
		value = $bindable(2),
		range = $bindable([min, max]),
		ondragstart,
		ondragend,
		children
	}: {
		min?: number;
		max?: number;
		step?: number;
		value?: number;
		range?: [number, number];
		ondragstart?: () => void;
		ondragend?: () => void;
		children?: Snippet;
	} = $props();

	let width = $state(0);
	let container: HTMLDivElement;
	let start: HTMLDivElement;
	let end: HTMLDivElement;
	let thumb: HTMLDivElement;
	let scroll_width = $state(width);

	let start_dragging = $state(false);
	let end_dragging = $state(false);
	let thumb_dragging = $state(false);
	onMount(() => {
		if (!container) return;
		const resize_observer = new ResizeObserver(onresize);
		resize_observer.observe(container);
		resize_observer.observe(start);
		resize_observer.observe(end);
		resize_observer.observe(thumb);

		function onresize() {
			width = container.getBoundingClientRect().width;
			scroll_width =
				width -
				start.getBoundingClientRect().width -
				end.getBoundingClientRect().width -
				thumb.getBoundingClientRect().width;
		}

		onresize();

		return () => {
			resize_observer.disconnect();
		};
	});

	function value_to_progress(value: number) {
		return (value - min) / (max - min);
	}

	function progress_to_value(progress: number) {
		return Math.min(Math.max(Math.floor((min + progress * (max - min)) / step) * step, min), max);
	}
</script>

<div
	style:width="500px"
	class="range-selector center"
	bind:this={container}
	onmousedown={function (down_event) {
		const start_x = down_event.clientX;
		let initial_progress = 0;
		if (down_event.target === start) {
			start_dragging = true;
			initial_progress = value_to_progress(range[0]);
		} else if (down_event.target === end) {
			end_dragging = true;
			initial_progress = value_to_progress(range[1]);
		} else if (down_event.target === thumb) {
			if (ondragstart) ondragstart();
			thumb_dragging = true;
			initial_progress = value_to_progress(value);
		} else {
			return;
		}
		down_event.preventDefault();
		function mousemove(move_event: MouseEvent) {
			move_event.preventDefault();
			const delta_x = move_event.clientX - start_x;
			const new_progress = initial_progress + delta_x / scroll_width;
			const _range = range;
			switch (down_event.target) {
				case start:
					_range[0] = Math.min(Math.max(progress_to_value(new_progress), min), range[1]);
					break;
				case end:
					_range[1] = Math.min(Math.max(progress_to_value(new_progress), range[0]), max);
					break;
				case thumb:
					value = progress_to_value(new_progress);
					break;
			}
			const _value = Math.min(Math.max(value, range[0]), range[1]);
			if (_value !== value) {
				value = _value;
			}
			if (_range[0] !== range[0] || _range[1] !== range[1]) {
				range = _range;
			}
		}

		document.addEventListener('mousemove', mousemove);
		document.addEventListener('mouseup', finish);
		document.addEventListener('mouseleave', finish);

		function finish() {
			if (thumb_dragging && ondragend) ondragend();
			start_dragging = end_dragging = thumb_dragging = false;
			document.removeEventListener('mousemove', mousemove);
			document.removeEventListener('mouseleave', finish);
			document.removeEventListener('mouseup', finish);
		}
	}}
>
	<div class="track"></div>
	<div
		class="active-area"
		style:left="{scroll_width * value_to_progress(range[0])}px"
		style:right="{scroll_width * (1 - value_to_progress(range[1]))}px"
	>
		<div class="track"></div>
		<div class="thumb start" class:active={start_dragging} bind:this={start}></div>
		<div
			class="thumb progress"
			class:active={thumb_dragging}
			bind:this={thumb}
			style:left="{scroll_width * (value_to_progress(value) - value_to_progress(range[0])) + 8}px"
		>
			{#if children}
				{@render children()}
			{:else}
				{value.toFixed(2)}
			{/if}
		</div>
		<div class="thumb end" class:active={end_dragging} bind:this={end}></div>
	</div>
</div>

<style>
	.range-selector {
		height: 2rem;
		position: relative;
		.track {
			position: absolute;
			inset: 0.25rem 0;
			background-color: var(--container-low);
			border-radius: var(--br-md);
		}

		.active-area {
			position: absolute;
			top: 0;
			bottom: 0;
			& .track {
				background-color: var(--primary-variant);
				border-radius: var(--br-md);
			}
			& .thumb {
				height: 100%;
				position: absolute;
				min-width: 0.5rem;
				border-radius: 0.25rem;
				border: 1px solid var(--outline);
				background-color: var(--container-low);
				cursor: col-resize;
				&.active,
				&:hover {
					background-color: var(--primary);
					color: var(--on-primary);
				}
				&.progress {
					font-variant-numeric: tabular-nums;
					display: flex;
					flex-direction: row;
					place-items: center;
					padding-inline: 2ch;
				}
			}
			& .start {
				left: 0;
			}
			& .end {
				right: 0;
			}
		}
	}
</style>
