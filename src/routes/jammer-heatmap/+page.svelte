<script lang="ts">
	import { onMount } from 'svelte';
	import { JammerPassTracker } from './_utilities/jammer-passes-tracker';
	import Heatmap from './_components/Heatmap.svelte';
	import type { Meta, RelativeCoordinate } from './_utilities/types';
	import { writable } from 'svelte/store';
	import { syncPasses, syncSetup } from './_utilities/sync';
	import Selector from './_components/Selector.svelte';
	import { metaContext, passesTrackerContext } from './_utilities/contexts';
	import Menu from './_components/Menu/Menu.svelte';

	const passesTracker = new JammerPassTracker<RelativeCoordinate>();
	passesTrackerContext.set(passesTracker);
	const meta = writable<Meta>({});
	metaContext.set(meta);
	onMount(() => {
		syncPasses(passesTracker);
		syncSetup(meta);
	});
</script>

<div class="sidebar-layout" style="--sidebar-width:calc(var(--measure) / 3);">
	<Selector />
	<div>
		<Heatmap />
		<Menu />
	</div>
</div>
