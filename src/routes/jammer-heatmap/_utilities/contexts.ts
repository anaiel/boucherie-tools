import { getContext, setContext } from 'svelte';
import type { JammerPassTracker } from './jammer-passes-tracker';
import type { Meta, Pass } from './types';
import { CONTEXTS } from './const';
import type { Writable } from 'svelte/store';

type PassesTrackerContext = JammerPassTracker<Pass>;
export const passesTrackerContext = {
	get() {
		return getContext<PassesTrackerContext>(CONTEXTS.tracker);
	},
	set(value: PassesTrackerContext) {
		return setContext(CONTEXTS.tracker, value);
	}
};

type MetaContext = Writable<Meta>;
export const metaContext = {
	get() {
		return getContext<MetaContext>(CONTEXTS.meta);
	},
	set(value: MetaContext) {
		return setContext(CONTEXTS.meta, value);
	}
};
