import { Prisma, janus_account } from "@prisma/client";

export class JanusAccountUpdateDto
	implements
		Omit<
			janus_account,
			| "id"
			| "displayFavorites"
			| "articleLinkType"
			| "displayTestNews"
			| "defaultSearchMode"
			| "defaultLanguage"
			| "defaultTheme"
			| "platformView"
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

	communities?: number[];
	additional_institutes?: number[];
	additional_units?: number[];
	primary_institute_communities?: number[];
	primary_unit_communities?: number[];
	all_communities?: number[];
	hasSeenPopup: boolean;
}
