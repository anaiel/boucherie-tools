<script lang="ts">
	export let escapes: { x: number; y: number }[] = [];

	function addEscape(e: MouseEvent) {
		escapes = [...escapes, { x: e.clientX, y: e.clientY }];
	}
</script>

<img
	alt="Roller derby track layout. Click on the different parts of the track to show where the jammer escaped."
	src="track.svg"
	on:click={addEscape}
/>

{#each escapes as escape}
	<div class="escape" style="left:{escape.x}px;top:{escape.y}px;" />
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
