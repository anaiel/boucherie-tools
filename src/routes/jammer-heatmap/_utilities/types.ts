declare const __brand: unique symbol;
type Brand<B> = { [__brand]: B };
export type Branded<T, B> = T & Brand<B>;

export type Coordinate = Branded<
	{
		x: number;
		y: number;
	},
	'Coordinate'
>;

export type RelativeCoordinate = Branded<
	{
		x: number;
		y: number;
	},
	'RelativeCoordinate'
>;
