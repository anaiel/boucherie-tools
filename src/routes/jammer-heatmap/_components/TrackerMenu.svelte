<script lang="ts">
	import { getContext } from 'svelte';
	import { JammerPassTracker } from '../_utilities/jammer-passes-tracker';
	import type { RelativeCoordinate } from '../_utilities/types';
	import save from 'save-svg-as-png';
	import { get } from 'svelte/store';
	import type { ChangeEventHandler } from 'svelte/elements';
	import { validator } from '../_utilities/validator';

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

	const handleUploadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
		const handleError = () => {
			window.alert('Impossible de restaurer à partir du fichier fourni');
		};
		if (!e.target || !('files' in e.target) || !(e.target.files instanceof FileList)) {
			handleError();
			return;
		}
		const reader = new FileReader();
		reader.onerror = handleError;
		reader.onload = function () {
			if (!reader.result || typeof reader.result !== 'string') {
				handleError();
				return;
			}
			try {
				const data = JSON.parse(reader.result);
				validator(data);
				passesTracker.override(data);
			} catch (err) {
				handleError();
			}
		};
		reader.readAsText(e.target.files[0]);
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
	<form>
		<label for="file">Restaurer depuis une archive texte</label>
		<input id="file" name="file" type="file" on:change={handleUploadFile} />
	</form>
</div>
