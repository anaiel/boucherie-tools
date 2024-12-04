<script lang="ts">
	import { nanoid } from 'nanoid';
	import { derived } from 'svelte/store';
	import { produce } from 'immer';
	import { metaContext } from '../_utilities/contexts';

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
		value.setup?.jammers?.map(({ team: teamId, ...jammer }) => ({
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
				draft.setup.jammers.push({ id: nanoid(), name: jammerName, team: jammerTeam });
			})
		);
		addingJammer = false;
		jammerName = '';
		jammerTeam = undefined;
	};
</script>

{#if $jammers}
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
		<label for="jammerName">Nom du.de la jammer</label>
		<input id="jammerName" type="text" bind:value={jammerName} />
		{#if $meta.setup?.teams}
			<select bind:value={jammerTeam}>
				{#each $meta.setup.teams as team}
					<option value={team.id}>{team.name}</option>
				{/each}
			</select>
		{/if}
		<button on:click={handleValidateJammer}>Valider</button>
	{:else}
		<button on:click={handleAddJammer}>Ajouter un.e jammer</button>
	{/if}
{:else}
	<button on:click={handleActivateJammers}>Séparer par jammer</button>
{/if}
