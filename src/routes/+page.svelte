<script lang="ts">
	import { onMount } from 'svelte';

	// [TODO] Replace with actual login, very crude implementation in the mean time
	$: boucherieLogin = false;
	onMount(() => {
		if (localStorage.getItem('boucherie-login')) {
			boucherieLogin = true;
		}
	});
</script>

Outils disponibles :

<ul>
	{#if boucherieLogin}<li><a href="/training-formatter">Formatter les trainings</a></li>{/if}
	<li><a href="/jammer-heatmap">Jammer heatmap</a></li>
</ul>
