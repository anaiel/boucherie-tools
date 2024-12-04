<script lang="ts">
	import { produce } from 'immer';
	import { metaContext } from '../_utilities/contexts';

	const meta = metaContext.get();

	const handleSelectJammer = (id: string | undefined) => () => {
		meta.update(
			produce((draft) => {
				if (draft.selectedJammerId === id) {
					draft.selectedJammerId = undefined;
				} else {
					draft.selectedJammerId = id;
				}

				if (id) {
					const jammer = draft.setup?.jammers?.find((jammer) => jammer.id === id);
					if (jammer?.team) {
						draft.selectedTeamId = jammer.team;
					} else {
						draft.selectedTeamId = undefined;
					}
				}
			})
		);
	};

	const handleSelectTeam = (id: string) => () => {
		meta.update(
			produce((draft) => {
				if (draft.selectedTeamId === id) {
					draft.selectedTeamId = undefined;
				} else {
					draft.selectedTeamId = id;
				}
				draft.selectedJammerId = undefined;
			})
		);
	};
</script>

{#if $meta.setup?.jammers && $meta.setup.jammers.length > 0}
	Jammer actuel.le :
	<ul>
		{#each $meta.setup.jammers as jammer}
			<li class={$meta.selectedJammerId === jammer.id ? 'selected' : undefined}>
				<button on:click={handleSelectJammer(jammer.id)}>{jammer.name}</button>
			</li>
		{/each}
		<li
			class={$meta.selectedJammerId === undefined && $meta.selectedTeamId ? 'selected' : undefined}
		>
			<button
				on:click={handleSelectJammer(undefined)}
				disabled={$meta.selectedJammerId === undefined}>Autre</button
			>
		</li>
	</ul>
{/if}

{#if $meta.setup?.teams && $meta.setup.teams.length > 0}
	Équipe actuel.le :
	<ul>
		{#each $meta.setup.teams as team}
			<li class={$meta.selectedTeamId === team.id ? 'selected' : undefined}>
				<button on:click={handleSelectTeam(team.id)}>{team.name}</button>
			</li>
		{/each}
	</ul>
{/if}

<style>
	.selected {
		filter: invert();
	}
</style>
