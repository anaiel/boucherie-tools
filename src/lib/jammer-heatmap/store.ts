export abstract class Store<T> {
	#storeId: string;
	constructor(storeId: string) {
		this.#storeId = storeId;
	}
	get storeId() {
		return this.#storeId;
	}

	abstract restore(): Promise<T | null>;
	abstract save(item: T): Promise<boolean>;
	abstract clear(): Promise<boolean>;
}

export class LocalStorageStore<T> extends Store<T> {
	constructor(storeId: string) {
		super(storeId);
	}

	restore() {
		const value = localStorage.getItem(this.storeId);
		return Promise.resolve(value ? JSON.parse(value) : null);
	}

	save(item: T) {
		localStorage.setItem(this.storeId, JSON.stringify(item));
		return Promise.resolve(true);
	}

	clear() {
		localStorage.removeItem(this.storeId);
		return Promise.resolve(true);
	}
}
