<script lang="ts">
	import { onMount } from 'svelte';
	import { JammerPassTracker } from './_utilities/jammer-passes-tracker';
	import Heatmap from './_components/Heatmap.svelte';
	import TrackerMenu from './_components/TrackerMenu.svelte';
	import type { Meta, RelativeCoordinate } from './_utilities/types';
	import { writable } from 'svelte/store';
	import { syncPasses, syncSetup } from './_utilities/sync';
	import Setup from './_components/Setup.svelte';
	import Selector from './_components/Selector.svelte';
	import { metaContext, passesTrackerContext } from './_utilities/contexts';

	const passesTracker = new JammerPassTracker<RelativeCoordinate>();
	passesTrackerContext.set(passesTracker);
	const meta = writable<Meta>({});
	metaContext.set(meta);
	onMount(() => {
		syncPasses(passesTracker);
		syncSetup(meta);
	});
</script>

<Selector />
<Heatmap />
<TrackerMenu />
<Setup />
