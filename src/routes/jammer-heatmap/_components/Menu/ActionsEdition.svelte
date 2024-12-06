<script lang="ts">
	import { passesTrackerContext } from '../../_utilities/contexts';

	const passesTracker = passesTrackerContext.get();
	$: passes = passesTracker.passes;
	$: disabled = $passes.length === 0;
	$: isDeleteModeOn = passesTracker.isDeleteModeOn;
</script>

<div>
	Passages :
	<ul class="flex flex-col gap-1">
		<li>
			<button class="btn btn-primary" on:click={() => passesTracker.removeLastPass()} {disabled}
				>Annuler</button
			>
		</li>
		<li>
			<button class="btn btn-primary" on:click={() => passesTracker.toggleDeleteMode()} {disabled}>
				{#if $isDeleteModeOn}
					Quitter le mode suppression
				{:else}
					Mode suppression
				{/if}
			</button>
		</li>
		<li>
			<button class="btn btn-primary" on:click={() => passesTracker.clear()} {disabled}
				>Tout supprimer</button
			>
		</li>
	</ul>
</div>
