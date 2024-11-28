<script lang="ts">
	import { getContext } from 'svelte';
	import Track from './Track.svelte';
	import { JammerPassTracker, type Coordinate } from '../_utilities/jammer-passes-tracker';

	const passesTracker = getContext<JammerPassTracker>('passesTracker');
	$: passes = passesTracker.passes;
	const clickHandler = (e: MouseEvent) => {
		passesTracker.addPass({ x: e.clientX, y: e.clientY });
	};
	const handleDelete = (coord: Coordinate) => () => {
		passesTracker.removePass(coord);
	};
</script>

<Track on:click={clickHandler} />

{#each $passes as pass}
	<div
		class="pass"
		style="
			--pass-radius:5px;
			left:{pass.x}px;
			top:{pass.y}px;
		"
		on:click={handleDelete(pass)}
	/>
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
