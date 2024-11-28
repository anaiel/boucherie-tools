<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { JammerPassTracker, type Coordinate } from './_utilities/jammer-passes-tracker';
	import { LocalStorageStore } from './_utilities/store';
	import Heatmap from './_components/Heatmap.svelte';
	import TrackerMenu from './_components/TrackerMenu.svelte';

	const passesTracker = new JammerPassTracker();
	setContext('passesTracker', passesTracker);
	onMount(() => {
		passesTracker.restore(new LocalStorageStore<Coordinate[]>('jammer-passes'));
	});
</script>

<Heatmap />
<TrackerMenu />
