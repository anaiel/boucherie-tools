<script lang="ts">
	import save from 'save-svg-as-png';
	import { get } from 'svelte/store';
	import { metaContext, passesTrackerContext } from '../../_utilities/contexts';
	import { MetaSetupSchema, PassSchema, SaveSchema, type Save } from '../../_utilities/types';
	import type { ChangeEventHandler } from 'svelte/elements';
	import { produce } from 'immer';
	import { array, assert, is, object } from 'superstruct';
	import FileSaver from 'file-saver';

	const meta = metaContext.get();
	const passesTracker = passesTrackerContext.get();

	const handleUploadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
		const handleError = (err?: unknown) => {
			window.alert('Impossible de restaurer à partir du fichier fourni');
			if (err) {
				console.error(err);
			}
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
				if (is(data, SaveSchema)) {
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
				handleError(err);
			}
		};
		reader.readAsText(e.target.files[0]);
	};

	const handleSave = () => {
		const svg = document.getElementById('track');
		save.saveSvgAsPng(svg, 'heatmap.png', { backgroundColor: 'white' });
	};

	const handleDownload = () => {
		const save: Save = { passes: get(passesTracker.passes), setup: get(meta).setup };
		const blob = new Blob([JSON.stringify(save)], {
			type: 'text/plain;charset=utf-8'
		});
		FileSaver.saveAs(blob, 'heatmap.txt');
	};
</script>

<div>
	Sauvegarde :
	<ul>
		<li>
			<div class="dropdown">
				<div tabindex="0" role="button" class="btn btn-accent m-1">Enregistrer...</div>
				<ul
					tabindex="0"
					class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
				>
					<li><a role="button" tabindex="0" on:click={handleSave}>... au format png</a></li>
					<li>
						<a role="button" tabindex="0" on:click={handleDownload}>... au format texte</a>
					</li>
				</ul>
			</div>
		</li>
		<li>
			<label class="form-control w-full max-w-xs">
				<div class="label">
					<span class="label-text">Restaurer depuis une archive texte</span>
				</div>
				<input
					type="file"
					class="file-input file-input-bordered file-input-accent w-full max-w-xs"
					on:change={handleUploadFile}
				/>
			</label>
		</li>
	</ul>
</div>
