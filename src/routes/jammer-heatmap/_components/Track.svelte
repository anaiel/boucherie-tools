<script lang="ts">
	export let trackElement: HTMLImageElement;
</script>

<img
	alt="Roller derby track layout. Click on the different parts of the track to show where the jammer passd."
	src="track.svg"
	on:click
	bind:this={trackElement}
/>
