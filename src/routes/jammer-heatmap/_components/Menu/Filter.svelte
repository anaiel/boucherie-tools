<script lang="ts">
	import { produce } from 'immer';
	import { metaContext } from '../../_utilities/contexts';

	const meta = metaContext.get();

	const handleCheckTeam = (teamId: string) => () => {
		meta.update(
			produce((draft) => {
				if (draft.filters?.teams?.includes(teamId)) {
					draft.filters.teams = draft.filters.teams.filter((team) => team !== teamId);
				} else {
					if (!draft.filters) {
						draft.filters = { teams: [teamId] };
					} else if (!draft.filters.teams) {
						draft.filters.teams = [teamId];
					} else {
						draft.filters.teams.push(teamId);
					}
				}
			})
		);
	};

	const handleCheckJammer = (jammerId: string) => () => {
		meta.update(
			produce((draft) => {
				if (draft.filters?.jammers?.includes(jammerId)) {
					draft.filters.jammers = draft.filters.jammers.filter((jammer) => jammer !== jammerId);
				} else {
					if (!draft.filters) {
						draft.filters = { jammers: [jammerId] };
					} else if (!draft.filters.jammers) {
						draft.filters.jammers = [jammerId];
					} else {
						draft.filters.jammers.push(jammerId);
					}
				}
			})
		);
	};
</script>

<div class="collapse collapse-plus bg-base-200">
	<input type="checkbox" />
	<div class="collapse-title text-xl font-medium">Filtrer les passages</div>
	<div class="collapse-content">
		<div class="flex w-full">
			{#if !$meta.setup || (!$meta.setup.jammers && !$meta.setup.teams)}
				<p>Pour pouvoir filter, ajouter des équipes et/ou des jammers</p>
			{:else if $meta.setup.teams}
				<div class="flex flex-col">
					Par équipe :
					<ul>
						{#each $meta.setup.teams as team}
							<li class="form-control">
								<label class="label cursor-pointer">
									<input
										type="checkbox"
										checked={$meta.filters?.teams?.includes(team.id)}
										class="checkbox"
										on:change={handleCheckTeam(team.id)}
									/>
									<span class="label-text">{team.name}</span>
								</label>
							</li>
						{/each}
					</ul>
				</div>
				{#if $meta.setup.jammers && $meta.setup.jammers.length > 0}
					<div class="divider divider-horizontal"></div>
				{/if}
			{/if}
			{#if $meta.setup?.jammers && $meta.setup.jammers.length > 0}
				<div class="flex flex-col">
					Par équipe :
					<ul>
						{#each $meta.setup.jammers as jammer}
							<li class="form-control">
								<label class="label cursor-pointer">
									<input
										type="checkbox"
										checked={$meta.filters?.teams?.includes(jammer.id)}
										class="checkbox"
										on:change={handleCheckJammer(jammer.id)}
									/>
									<span class="label-text">{jammer.name}</span>
								</label>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	</div>
</div>
