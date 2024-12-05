<script lang="ts">
	import { nanoid } from 'nanoid';
	import { derived } from 'svelte/store';
	import { produce } from 'immer';
	import { metaContext } from '../../_utilities/contexts';

	const PLACEHOLDER_NAME = '01';

	const meta = metaContext.get();

	const handleActivateJammers = () => {
		meta.update(
			produce((draft) => {
				if (!draft.setup) {
					draft.setup = {};
				}
				draft.setup.jammers = [];
			})
		);
	};

	const jammers = derived(meta, (value) =>
		value.setup?.jammers?.map(({ teamId: teamId, ...jammer }) => ({
			...jammer,
			team: value.setup?.teams?.find((team) => team.id === teamId)
		}))
	);
	$: addingJammer = false;
	$: jammerName = '';
	$: jammerTeam = undefined;
	const handleAddJammer = () => {
		addingJammer = true;
	};
	const handleValidateJammer = () => {
		meta.update(
			produce((draft) => {
				if (!draft.setup || !draft.setup.jammers) {
					throw new Error(
						'Should never be the case because setup is initialized on activating jammers'
					);
				}
				draft.setup.jammers.push({
					id: nanoid(),
					name: jammerName ?? PLACEHOLDER_NAME,
					teamId: jammerTeam
				});
			})
		);
		addingJammer = false;
		jammerName = '';
		jammerTeam = undefined;
	};
</script>

{#if $jammers}
	<div class="flex flex-col gap-1">
		{#if $jammers.length > 0}
			<ol>
				{#each $jammers as jammer}
					<li>
						{jammer.name}
						{#if jammer.team}({jammer.team.name}){/if}
					</li>
				{/each}
			</ol>
		{/if}
		{#if addingJammer}
			<label class="input input-bordered flex items-center gap-2">
				Nom
				<input type="text" class="grow" placeholder={PLACEHOLDER_NAME} bind:value={jammerName} />
			</label>
			{#if $meta.setup?.teams}
				<select class="select select-bordered w-full max-w-xs" bind:value={jammerTeam}>
					{#each $meta.setup.teams as team}
						<option value={team.id}>{team.name}</option>
					{/each}
				</select>
			{/if}
			<button class="btn btn-primary" on:click={handleValidateJammer}>Valider</button>
		{:else}
			<button class="btn btn-primary" on:click={handleAddJammer}>Ajouter un.e jammer</button>
		{/if}
	</div>
{:else}
	<button class="btn btn-primary" on:click={handleActivateJammers}>Ajouter des jammers</button>
{/if}
