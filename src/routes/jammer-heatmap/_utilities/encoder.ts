import type { Coordinate, RelativeCoordinate } from './types';

/**
 * Transforms absolute coordinates on the window to relative coordinated within
 * the image. Ensure that whatever the size of the viewport, the coordinates are
 * restored at the appropriate place
 */
export class Encoder {
	#rect: DOMRect;
	constructor(entry: HTMLImageElement) {
		this.#rect = entry.getBoundingClientRect();
	}
	encode(coord: Coordinate): RelativeCoordinate {
		return {
			x: (coord.x - this.#rect.left) / this.#rect.width,
			y: (coord.y - this.#rect.top) / this.#rect.height
		} as RelativeCoordinate;
	}
	decode(coord: RelativeCoordinate): Coordinate {
		return {
			x: coord.x * this.#rect.width + this.#rect.left,
			y: coord.y * this.#rect.height + this.#rect.top
		} as Coordinate;
	}
}
