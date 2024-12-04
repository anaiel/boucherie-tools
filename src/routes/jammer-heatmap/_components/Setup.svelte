<script>
	import TeamsSetup from './TeamsSetup.svelte';
	import JammersSetup from './JammersSetup.svelte';
</script>

<div class="container">
	<h2>Setup</h2>
	<div class="columns">
		<div>
			<JammersSetup />
		</div>
		<div>
			<TeamsSetup />
		</div>
	</div>
</div>

<style>
	.container {
		border: 1px solid blue;
		padding: 8px;
	}

	.columns {
		display: flex;
		padding: 8px;
	}
	.columns > * {
		flex: 1;
		padding: 8px;
	}
	.columns > *:not(:last-child) {
		border-inline-end: 1px solid blue;
	}
</style>
