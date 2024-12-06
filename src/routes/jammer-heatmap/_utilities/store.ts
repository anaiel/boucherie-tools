type StoreOptions<T> = { validator: (data: any) => data is T };

export abstract class Store<T> {
	#storeId: string;
	get storeId() {
		return this.#storeId;
	}
	opts: Partial<StoreOptions<T>>;

	constructor(storeId: string, opts?: Partial<StoreOptions<T>>) {
		this.#storeId = storeId;
		this.opts = opts ?? {};
	}

	abstract restore(): Promise<T | undefined>;
	abstract save(item: T): Promise<boolean>;
	abstract clear(): Promise<boolean>;
}

export class LocalStorageStore<T> extends Store<T> {
	constructor(storeId: string, opts?: Partial<StoreOptions<T>>) {
		super(storeId, opts);
	}

	restore() {
		const value = localStorage.getItem(this.storeId);
		if (!value) {
			return Promise.resolve(undefined);
		}
		const parsedValue = JSON.parse(value);
		if (this.opts.validator) {
			this.opts.validator(parsedValue);
		}
		return Promise.resolve(parsedValue);
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
