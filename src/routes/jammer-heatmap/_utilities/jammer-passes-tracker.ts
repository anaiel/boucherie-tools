import { get, writable, type Writable } from 'svelte/store';
import type { MetaSetup, Pass } from './types';

export class JammerPassTracker<C> {
	#passes: Writable<C[]>;
	get passes() {
		return this.#passes;
	}

	#isDeleteModeOn = writable(false);
	get isDeleteModeOn() {
		return this.#isDeleteModeOn;
	}

	constructor(opts?: { initialPasses?: C[] }) {
		this.#passes = writable(opts?.initialPasses ?? []);
		this.#passes.subscribe((passes) => {
			if (passes.length === 0) {
				this.#isDeleteModeOn.set(false);
			}
		});
	}

	addPass(coord: C) {
		if (get(this.#isDeleteModeOn)) {
			return;
		}
		this.#passes.update((prev) => [...prev, coord]);
	}

	removeLastPass() {
		this.#passes.update((prev) => prev.slice(0, -1));
	}

	removePass(coord: C) {
		this.#passes.update((prev) => prev.filter((item) => item !== coord));
	}

	clear() {
		this.#passes.set([]);
	}

	toggleDeleteMode() {
		this.#isDeleteModeOn.update((prev) => !prev);
	}

	override(passes: C[]) {
		this.#passes.set(passes);
	}
}

export const getPassColor = (pass: Pass, setup: MetaSetup | undefined): string | undefined => {
	const teamId =
		pass.meta?.teamId ??
		setup?.jammers?.find((jammer) => jammer.id === pass.meta?.jammerId)?.teamId;
	if (teamId) {
		const team = setup?.teams?.find((team) => team.id === teamId);
		if (team) {
			return team.color;
		}
	}
	return undefined;
};
