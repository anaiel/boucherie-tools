<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import Track from './Track.svelte';
	import { JammerPassTracker } from '../_utilities/jammer-passes-tracker';
	import type { Coordinate, RelativeCoordinate } from '../_utilities/types';
	import { Encoder } from '../_utilities/encoder';
	import { writable } from 'svelte/store';
	import Pass from './Pass.svelte';

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

<Track bind:trackElement on:click={clickHandler}>
	{#each $passes as pass}
		<Pass coord={pass} on:click={handleDelete(pass)} />
	{/each}
</Track>
