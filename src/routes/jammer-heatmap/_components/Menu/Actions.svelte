<script lang="ts">
	import Edition from './ActionsEdition.svelte';
	import Save from './ActionsSave.svelte';
</script>

<div class="bg-base-200 collapse-plus collapse">
	<input type="checkbox" />
	<div class="collapse-title text-xl font-medium">Actions</div>
	<div class="collapse-content">
		<div class="flex w-full">
			<Edition />
			<div class="divider divider-horizontal"></div>
			<Save />
		</div>
	</div>
</div>
