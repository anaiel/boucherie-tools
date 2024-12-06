<script lang="ts">
	import Edition from './ActionsEdition.svelte';
	import Save from './ActionsSave.svelte';
	import Delete from './ActionsDelete.svelte';
</script>

<div class="collapse collapse-plus bg-base-200">
	<input type="checkbox" />
	<div class="collapse-title text-xl font-medium">Actions</div>
	<div class="collapse-content">
		<div class="flex w-full">
			<Edition />
			<div class="divider divider-horizontal"></div>
			<Save />
			<div class="divider divider-horizontal"></div>
			<Delete />
		</div>
	</div>
</div>
