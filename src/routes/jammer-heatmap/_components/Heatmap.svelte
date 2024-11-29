<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import Track from './Track.svelte';
	import { JammerPassTracker } from '../_utilities/jammer-passes-tracker';
	import type { Coordinate, RelativeCoordinate } from '../_utilities/types';
	import { Encoder } from '../_utilities/encoder';
	import { writable } from 'svelte/store';

	let trackElement: HTMLImageElement;
	let encoder = writable<Encoder | undefined>(undefined);
	onMount(() => {
		encoder.set(new Encoder(trackElement));
		window.addEventListener('resize', () => {
			encoder.set(new Encoder(trackElement));
		});
	});

	const passesTracker = getContext<JammerPassTracker<RelativeCoordinate>>('passesTracker');
	$: passes = passesTracker.passes;
	$: decodedPasses = $passes.map((pass) => [pass, $encoder?.decode(pass)] as const);

	const clickHandler = (e: MouseEvent) => {
		if (!$encoder) {
			return;
		}
		passesTracker.addPass($encoder.encode({ x: e.clientX, y: e.clientY } as Coordinate));
	};
	const handleDelete = (coord: RelativeCoordinate) => () => {
		passesTracker.removePass(coord);
	};
</script>

<Track bind:trackElement on:click={clickHandler} />

{#each decodedPasses as [pass, coord]}
	{#if coord}
		<div
			class="pass"
			style="
			--pass-radius:5px;
			left:{coord.x}px;
			top:{coord.y}px;
		"
			on:click={handleDelete(pass)}
		/>
	{/if}
{/each}

<style>
	.pass {
		--size: calc(2 * var(--pass-radius));

		position: absolute;
		width: var(--size);
		height: var(--size);
		background-color: red;
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
</style>
