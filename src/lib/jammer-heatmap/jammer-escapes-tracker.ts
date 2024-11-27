import { get, writable } from 'svelte/store';
import { LocalStorageStore, type Store } from './store';

export type Coordinate = {
	x: number;
	y: number;
};

type Area = Coordinate & { radius: number };

export class JammerEscapeTracker {
	#store: Store<Coordinate[]>;
	escapes = writable<Coordinate[]>([]);

	constructor() {
		this.#store = new LocalStorageStore<Coordinate[]>('jammer-escapes');
	}

	async init() {
		const storedValue = await this.#store.restore();
		if (storedValue) {
			this.escapes.update((prev) => [...storedValue, ...prev]);
		}
	}

	addEscape(coord: Coordinate) {
		this.escapes.update((prev) => [...prev, coord]);
		this.#store.save(get(this.escapes));
	}

	removeLastEscape() {
		this.escapes.update((prev) => prev.slice(0, -1));
		this.#store.save(get(this.escapes));
	}

	removeEscape(coord: Coordinate) {
		this.escapes.update((prev) => prev.filter((item) => item !== coord));
		this.#store.save(get(this.escapes));
	}

	clear() {
		this.escapes.set([]);
		this.#store.clear();
	}
}

function isInArea(area: Area) {
	return function (coord: Coordinate) {
		console.log({ distance: distance(coord, area), radius: area.radius });
		return distance(coord, area) <= area.radius;
	};
}

function distance(coord1: Coordinate, coord2: Coordinate) {
	return Math.sqrt(Math.pow(coord2.x - coord1.x, 2) + Math.pow(coord2.y - coord1.y, 2));
}
