<script lang="ts">
	import { onMount } from 'svelte';
	import Track from './Track.svelte';
	import { JammerEscapeTracker, type Coordinate } from '$lib/jammer-heatmap/jammer-escapes-tracker';

	const ESCAPE_RADIUS = 5;

	let escapesTracker = new JammerEscapeTracker();
	onMount(() => {
		escapesTracker.init();
	});
	$: escapes = escapesTracker.escapes;
	$: deleteModeOn = false;
	const clickHandler = (e: MouseEvent) => {
		if (deleteModeOn) {
			return;
		}
		escapesTracker.addEscape({ x: e.clientX, y: e.clientY });
	};
	escapesTracker.escapes.subscribe((escapes) => {
		if (escapes.length === 0) {
			deleteModeOn = false;
		}
	});
	const undo = () => {
		escapesTracker.removeLastEscape();
	};
	const switchMode = () => {
		deleteModeOn = !deleteModeOn;
	};
	const clear = () => {
		escapesTracker.clear();
	};
	const handleDelete = (coord: Coordinate) => () => {
		escapesTracker.removeEscape(coord);
	};
</script>

<Track on:click={clickHandler} />

{#each $escapes as escape}
	<div
		class="escape"
		style="
			--escape-radius:{ESCAPE_RADIUS}px;
			left:{escape.x}px;
			top:{escape.y}px;
		"
		on:click={handleDelete(escape)}
	/>
{/each}

<div>
	<button on:click={undo} disabled={$escapes.length === 0}>Annuler</button>
	<button on:click={switchMode} disabled={$escapes.length === 0}>
		{#if deleteModeOn}
			Quitter le mode suppression
		{:else}
			Supprimer des passages
		{/if}
	</button>
	<button on:click={clear} disabled={$escapes.length === 0}>Tout supprimer</button>
</div>

<style>
	.escape {
		--size: calc(2 * var(--escape-radius));

		position: absolute;
		width: var(--size);
		height: var(--size);
		background-color: red;
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
</style>
