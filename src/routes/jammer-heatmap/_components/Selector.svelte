<script lang="ts">
	import { produce } from 'immer';
	import { metaContext } from '../_utilities/contexts';
	import SelectorInfo from './SelectorInfo.svelte';

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
					if (jammer?.teamId) {
						draft.selectedTeamId = jammer.teamId;
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

{#if $meta.setup}
	<div class="card ms-2">
		<div class="card-body">
			{#if $meta.setup?.jammers && $meta.setup.jammers.length > 0}
				Choisir un·e jammer :
				<ul class="flex gap-1">
					{#each $meta.setup.jammers as jammer}
						<li>
							<button
								class={`btn btn-outline btn-primary btn-xs ${$meta.selectedJammerId === jammer.id ? 'btn-active' : ''}`}
								on:click={handleSelectJammer(jammer.id)}>{jammer.name}</button
							>
						</li>
					{/each}
					<li>
						<button
							class={`btn btn-outline btn-primary btn-xs ${
								$meta.selectedJammerId === undefined && $meta.selectedTeamId ? 'btn-active' : ''
							}`}
							on:click={handleSelectJammer(undefined)}
							disabled={$meta.selectedJammerId === undefined}>Autre</button
						>
					</li>
				</ul>
			{/if}

			{#if $meta.setup?.teams && $meta.setup.teams.length > 0}
				Choisir une équipe :
				<ul>
					{#each $meta.setup.teams as team}
						<li>
							<button
								class={`btn btn-outline btn-secondary btn-xs ${$meta.selectedTeamId === team.id ? 'btn-active' : ''}`}
								on:click={handleSelectTeam(team.id)}>{team.name}</button
							>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
{:else}
	<SelectorInfo />
{/if}
