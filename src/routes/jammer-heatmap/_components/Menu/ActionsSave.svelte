<script lang="ts">
	import save from 'save-svg-as-png';
	import { get } from 'svelte/store';
	import { metaContext, passesTrackerContext } from '../../_utilities/contexts';
	import { MetaSetupSchema, PassSchema } from '../../_utilities/types';
	import type { ChangeEventHandler } from 'svelte/elements';
	import { produce } from 'immer';
	import { array, assert, is, object } from 'superstruct';

	const meta = metaContext.get();
	const passesTracker = passesTrackerContext.get();

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
</script>

<div>
	Sauvegarde :
	<ul>
		<li>
			<div class="dropdown">
				<div tabindex="0" role="button" class="btn btn-accent m-1">Enregistrer...</div>
				<ul
					tabindex="0"
					class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
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
					class="file-input file-input-accent file-input-bordered w-full max-w-xs"
					on:change={handleUploadFile}
				/>
			</label>
		</li>
	</ul>
</div>
