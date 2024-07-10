import type { Prisma, janus_account } from "@prisma/client";

export class CreateJanusAccountDto
	implements
		Omit<
			janus_account,
			| "id"
			| "displayFavorites"
			| "displayTestNews"
			| "defaultSearchMode"
			| "defaultLanguage"
			| "defaultTheme"
		>
{
	primary_institute: number | null;
	primary_unit: number | null;
	uid: string | null;
	mail: string | null;
	name: string | null;
	firstname: string | null;
	cnrs: boolean | null;
	comment: string | null;
	last_connexion: Date | null;
	favorite_domain: string | null;
	first_connexion: Date | null;
	active: boolean;
	favourite_resources: Prisma.JsonValue | null;
	additional_units?: number[];
	additional_institutes?: number[];
	communities?: number[];
	hasSeenPopup: boolean;
}

export class UpdateJanusAccountDto extends CreateJanusAccountDto {
	id: number;
	primary_institute_communities?: number[];
	primary_unit_communities?: number[];
	all_communities?: number[];
}
