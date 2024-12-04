<script lang="ts">
	import { produce } from 'immer';
	import { generateRandomColor } from '$lib/colors';
	import { metaContext } from '../_utilities/contexts';

	const meta = metaContext.get();

	const handleActivateTeams = () => {
		meta.update(
			produce((draft) => {
				if (!draft.setup) {
					draft.setup = {};
				}
				draft.setup.teams = [
					{ id: 'team-1', name: 'Équipe 1', color: generateRandomColor() },
					{ id: 'team-2', name: 'Équipe 2', color: generateRandomColor() }
				];
			})
		);
	};
</script>

{#if $meta.setup && $meta.setup.teams}
	<p>Équipes :</p>
	<ul>
		{#each $meta.setup.teams as team}
			<li class="team" style={`--team-color:${team.color};`}>{team.name}</li>
		{/each}
	</ul>
{:else}
	<button on:click={handleActivateTeams}>Séparer par équipe</button>
{/if}

<style>
	.team::after {
		content: '';
		display: inline-block;
		inline-size: 1rem;
		block-size: 1rem;
		border-radius: 100%;
		background-color: var(--team-color);
		margin-inline-start: 8px;
	}
</style>
