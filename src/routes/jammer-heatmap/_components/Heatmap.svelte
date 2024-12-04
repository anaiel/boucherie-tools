<script lang="ts">
	import { onMount } from 'svelte';
	import Track from './Track.svelte';
	import type { RelativeCoordinate, Pass as IPass } from '../_utilities/types';
	import { Encoder } from '../_utilities/encoder';
	import { get, writable } from 'svelte/store';
	import Pass from './Pass.svelte';
	import { metaContext, passesTrackerContext } from '../_utilities/contexts';

	let trackElement: SVGSVGElement;
	let encoder = writable<Encoder | undefined>(undefined);
	onMount(() => {
		encoder.set(new Encoder(trackElement));
		window.addEventListener('resize', () => {
			encoder.set(new Encoder(trackElement));
		});
	});

	const passesTracker = passesTrackerContext.get();
	$: passes = passesTracker.passes;

	const meta = metaContext.get();

	const clickHandler = (e: MouseEvent) => {
		if (!$encoder) {
			return;
		}
		const pass: IPass = $encoder.encode({ x: e.pageX, y: e.pageY });
		const metaValue = get(meta);
		if (metaValue.selectedJammerId || metaValue.selectedTeamId) {
			pass.meta = { jammerId: metaValue.selectedJammerId, teamId: metaValue.selectedTeamId };
		}
		passesTracker.addPass(pass);
	};
	const handleDelete = (coord: RelativeCoordinate) => () => {
		passesTracker.removePass(coord);
	};
</script>

<Track bind:trackElement on:click={clickHandler}>
	{#each $passes as pass}
		<Pass {pass} on:click={handleDelete(pass)} />
	{/each}
</Track>
