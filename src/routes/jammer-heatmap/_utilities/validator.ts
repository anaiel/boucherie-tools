import { array, assert, number, object } from 'superstruct';

const schema = array(object({ x: number(), y: number() }));

export const validator = (data: unknown) => {
	return assert(data, schema);
};
