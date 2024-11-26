<script lang="ts">
	import { JammerEscapeTracker } from '$lib/jammer-heatmap/jammer-escapes-tracker';
	import { onMount } from 'svelte';
	import Track from './Track.svelte';

	export let escapesTracker = new JammerEscapeTracker();
	onMount(() => {
		escapesTracker.init();
	});
	$: escapes = escapesTracker.escapes;
	const clickHandler = (e: MouseEvent) => {
		escapesTracker.addEscape({ x: e.clientX, y: e.clientY });
	};
</script>

<Track on:click={clickHandler} />

{#each $escapes as { x, y }}
	<div class="escape" style="left:{x}px;top:{y}px;" />
{/each}

<style>
	.escape {
		position: absolute;
		width: 10px;
		height: 10px;
		background-color: red;
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
</style>
