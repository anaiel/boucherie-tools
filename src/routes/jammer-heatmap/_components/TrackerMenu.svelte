<script lang="ts">
	import { getContext } from 'svelte';
	import { JammerPassTracker } from '../_utilities/jammer-passes-tracker';

	const passesTracker = getContext<JammerPassTracker>('passesTracker');
	$: passes = passesTracker.passes;
	$: disabled = $passes.length === 0;
	$: isDeleteModeOn = passesTracker.isDeleteModeOn;
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
</div>
