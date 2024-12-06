<script lang="ts">
	import { onMount } from 'svelte';
	import Track from './Track.svelte';
	import type { RelativeCoordinate, Pass as IPass, Filters } from '../_utilities/types';
	import { Encoder } from '../_utilities/encoder';
	import { get, writable } from 'svelte/store';
	import Pass from './Pass.svelte';
	import { metaContext, passesTrackerContext } from '../_utilities/contexts';

	let trackElement: SVGSVGElement;

	const passesTracker = passesTrackerContext.get();
	const meta = metaContext.get();

	let passes = writable<IPass[]>([]);
	const filterPasses = (filters: Filters) => (pass: IPass) => {
		if (filters.jammers && filters.jammers.length > 0) {
			return filters.jammers.includes(pass.meta?.jammerId ?? '');
		} else if (filters.teams && filters.teams.length > 0) {
			return filters.teams.includes(pass.meta?.teamId ?? '');
		} else {
			return true;
		}
	};
	passesTracker.passes.subscribe((value) => {
		const filters = get(meta).filters;
		passes.set(filters ? value.filter(filterPasses(filters)) : value);
	});
	meta.subscribe((value) => {
		const passesValue = get(passesTracker.passes);
		passes.set(value.filters ? passesValue.filter(filterPasses(value.filters)) : passesValue);
	});

	const clickHandler = (e: MouseEvent) => {
		if (!trackElement) {
			return;
		}
		const encoder = new Encoder(trackElement);
		const pass: IPass = encoder.encode({ x: e.pageX, y: e.pageY });
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

<div class="mx-auto max-h-dvh max-w-screen-md">
	<Track bind:trackElement on:click={clickHandler}>
		{#each $passes as pass}
			<Pass {pass} on:click={handleDelete(pass)} />
		{/each}
	</Track>
</div>
