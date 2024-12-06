<script lang="ts">
	$: dismissed = false;
</script>

{#if !dismissed}
	<div class="card ms-2 bg-base-200">
		<p class="card-body">
			Aucun·e jammer à sélectionner. Pour pouvoir assigner un passage à un·e jammer, ajouter des
			équipes et des jammers dans le widget sous le track.
		</p>
		<button
			class="btn btn-secondary"
			on:click={() => {
				dismissed = true;
			}}>Ignorer</button
		>
	</div>
{/if}
