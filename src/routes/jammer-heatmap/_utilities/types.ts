import { array, number, object, optional, string, struct, type Describe } from 'superstruct';

export type Coordinate = {
	x: number;
	y: number;
};

export type RelativeCoordinate = {
	x: number;
	y: number;
};
export const RelativeCoordinateSchema: Describe<RelativeCoordinate> = object({
	x: number(),
	y: number()
});

export type Pass = RelativeCoordinate & {
	meta?: Partial<{
		jammerId: string;
		teamId: string;
	}>;
};
export const PassSchema: Describe<Pass> = object({
	x: number(),
	y: number(),
	meta: optional(
		object({
			jammerId: optional(string()),
			teamId: optional(string())
		})
	)
});

export type Jammer = {
	id: string;
	name: string;
	teamId?: string;
};
export const JammerSchema: Describe<Jammer> = object({
	id: string(),
	name: string(),
	team: optional(string())
});

export type Team = {
	id: string;
	name: string;
	color: string;
};
export const TeamSchema: Describe<Team> = object({ id: string(), name: string(), color: string() });

export type Meta = Partial<{
	setup: MetaSetup;
	selectedJammerId: string;
	selectedTeamId: string;
	filters: Filters;
}>;
export type MetaSetup = Partial<{
	jammers: Jammer[];
	teams: Team[];
}>;
export const MetaSetupSchema: Describe<MetaSetup> = object({
	jammers: optional(array(JammerSchema)),
	teams: optional(array(TeamSchema))
});
export type Filters = {
	jammers?: string[];
	teams?: string[];
};

export type Save = {
	passes: Pass[];
	setup?: MetaSetup;
};
export const SaveSchema = object({
	passes: array(PassSchema),
	setup: optional(MetaSetupSchema)
});
