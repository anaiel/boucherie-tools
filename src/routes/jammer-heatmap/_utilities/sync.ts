import type { Writable } from 'svelte/store';
import type { JammerPassTracker } from './jammer-passes-tracker';
import { LocalStorageStore } from './store';
import {
	MetaSetupSchema,
	PassSchema,
	type Meta,
	type MetaSetup,
	type Pass,
	type RelativeCoordinate
} from './types';
import { produce } from 'immer';
import { array, is } from 'superstruct';

export const syncPasses = (passesTracker: JammerPassTracker<RelativeCoordinate>) => {
	const storage = new LocalStorageStore<Pass[]>('jammer-passes', {
		validator: (data) => is(data, array(PassSchema))
	});
	storage
		.restore()
		.then((value) => {
			passesTracker.override(value);
		})
		.catch(() => {
			// Ignore
		});
	passesTracker.passes.subscribe((value) => storage.save(value));
};

export const syncSetup = (meta: Writable<Meta>) => {
	const storage = new LocalStorageStore<MetaSetup>('meta', {
		validator: (data) => is(data, MetaSetupSchema)
	});
	storage
		.restore()
		.then((value) => {
			meta.update(
				produce((draft) => {
					draft.setup = value;
				})
			);
		})
		.catch(() => {
			// Ignore
		});
	meta.subscribe(({ setup }) => {
		if (!setup) {
			return;
		}
		storage.save(setup);
	});
};
