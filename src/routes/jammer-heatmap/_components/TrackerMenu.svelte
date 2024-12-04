<script lang="ts">
	import { MetaSetupSchema, PassSchema } from '../_utilities/types';
	import save from 'save-svg-as-png';
	import { get } from 'svelte/store';
	import type { ChangeEventHandler } from 'svelte/elements';
	import { produce } from 'immer';
	import { array, assert, is, object } from 'superstruct';
	import { metaContext, passesTrackerContext } from '../_utilities/contexts';

	const meta = metaContext.get();
	const passesTracker = passesTrackerContext.get();
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
			new Blob([JSON.stringify({ passes: get(passesTracker.passes), setup: get(meta).setup })], {
				type: 'text/csv'
			})
		);
		a.download = 'session.jmrhtmp';
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
				if (is(data, object({ passes: array(PassSchema), setup: MetaSetupSchema }))) {
					passesTracker.override(data.passes);
					meta.update(
						produce((draft) => {
							draft.setup = data.setup;
						})
					);
				} else {
					assert(data, object({ passes: array(PassSchema), setup: MetaSetupSchema }));
				}
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
