import { get, writable } from 'svelte/store';
import { LocalStorageStore, type Store } from './store';

type Coordinate = {
	x: number;
	y: number;
};

export class JammerEscapeTracker {
	#store: Store<Coordinate[]>;
	escapes = writable<Coordinate[]>([]);

	constructor() {
		this.#store = new LocalStorageStore<Coordinate[]>('jammer-escapes');
	}

	async init() {
		const storedValue = await this.#store.restore();
		if (storedValue) {
			this.escapes.update((prev) => [...prev, ...storedValue]);
		}
	}

	addEscape(coord: Coordinate) {
		this.escapes.update((prev) => [...prev, coord]);
		this.#store.save(get(this.escapes));
	}
}
