import { get, writable } from 'svelte/store';
import { type Store } from './store';

export type Coordinate = {
	x: number;
	y: number;
};

export class JammerPassTracker {
	#passes = writable<Coordinate[]>([]);
	get passes() {
		return this.#passes;
	}

	#unsubscribeStore: (() => void) | undefined = undefined;

	#isDeleteModeOn = writable(false);
	get isDeleteModeOn() {
		return this.#isDeleteModeOn;
	}

	constructor() {
		this.#passes.subscribe((passes) => {
			if (passes.length === 0) {
				this.#isDeleteModeOn.set(false);
			}
		});
	}

	#updateStoreSyncing(store: Store<Coordinate[]>) {
		if (this.#unsubscribeStore) {
			this.#unsubscribeStore();
			this.#unsubscribeStore = undefined;
		}
		this.#unsubscribeStore = this.#passes.subscribe((passes) => {
			if (passes.length === 0) {
				store.clear();
			} else {
				store.save(passes);
			}
		});
	}

	async restore(store: Store<Coordinate[]>) {
		const storedValue = await store.restore();
		if (storedValue) {
			this.#passes.update((prev) => [...storedValue, ...prev]);
		}
		this.#updateStoreSyncing(store);
	}

	addPass(coord: Coordinate) {
		if (get(this.#isDeleteModeOn)) {
			return;
		}
		this.#passes.update((prev) => [...prev, coord]);
	}

	removeLastPass() {
		this.#passes.update((prev) => prev.slice(0, -1));
	}

	removePass(coord: Coordinate) {
		this.#passes.update((prev) => prev.filter((item) => item !== coord));
	}

	clear() {
		this.#passes.set([]);
	}

	toggleDeleteMode() {
		this.#isDeleteModeOn.update((prev) => !prev);
	}
}
