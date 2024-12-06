<script lang="ts">
	import { metaContext, passesTrackerContext } from '../../_utilities/contexts';

	const meta = metaContext.get();
	const passesTracker = passesTrackerContext.get();

	const handleReset = () => {
		meta.set({});
		passesTracker.clear();
	};
</script>

<button class="btn btn-warning" on:click={handleReset}>Tout réinitialiser</button>
