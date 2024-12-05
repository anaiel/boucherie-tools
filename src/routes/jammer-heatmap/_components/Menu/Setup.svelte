<script>
	import SetupJammers from './SetupJammers.svelte';
	import SetupTeams from './SetupTeams.svelte';
</script>

<div class="bg-base-200 collapse-plus collapse">
	<input type="checkbox" />
	<div class="collapse-title text-xl font-medium">Setup</div>
	<div class="collapse-content">
		<div class="flex w-full">
			<SetupTeams />
			<div class="divider divider-horizontal"></div>
			<SetupJammers />
		</div>
	</div>
</div>
