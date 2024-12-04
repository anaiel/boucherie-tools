<script lang="ts">
	import { getContext } from 'svelte';
	import { JammerPassTracker } from '../_utilities/jammer-passes-tracker';
	import type { RelativeCoordinate } from '../_utilities/types';
	import save from 'save-svg-as-png';
	import { get } from 'svelte/store';

	const passesTracker = getContext<JammerPassTracker<RelativeCoordinate>>('passesTracker');
	$: passes = passesTracker.passes;
	$: disabled = $passes.length === 0;
	$: isDeleteModeOn = passesTracker.isDeleteModeOn;

	const handleSave = () => {
		const svg = document.getElementById('track');
		save.saveSvgAsPng(svg, 'heatmap.png', { backgroundColor: 'white' });
	};

	const handleDownload = () => {
		var a = window.document.createElement('a');
		a.href = window.URL.createObjectURL(
			new Blob([JSON.stringify(get(passesTracker.passes))], { type: 'text/csv' })
		);
		a.download = 'passes.jmrhtmp';
		document.body.appendChild(a);
		a.click();
		setTimeout(() => {
			document.body.removeChild(a);
		}, 0);
	};
</script>

<div>
	<button on:click={() => passesTracker.removeLastPass()} {disabled}>Annuler</button>
	<button on:click={() => passesTracker.toggleDeleteMode()} {disabled}>
		{#if $isDeleteModeOn}
			Quitter le mode suppression
		{:else}
			Supprimer des passages
		{/if}
	</button>
	<button on:click={() => passesTracker.clear()} {disabled}>Tout supprimer</button>
	<button on:click={handleSave}>Sauvegarder au format png</button>
	<button on:click={handleDownload}>Sauvegarder au format texte</button>
</div>
