import type { FacetEntry } from "../../components/page/search/facet/Facet.type";
import { convertFacet, convertPayload } from "../../shared/typeConvertion";
import type {
	PublicationDataType,
	PublicationRetrieveDataType,
} from "../../shared/types/data.types";
import type { Institute } from "../../shared/types/types";
import { createQuery, environment, json, throwIfNotOk } from "../Environment";

export type PublicationPayLoad = {
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	queries: any[];
	RV3?: "Y";
	activeFacets?: {
		SubjectPubDb?: string[];
		TypePublicationPubD?: string[];
		PublisherPubDb?: string[];
	};
	sort?: "date" | "date2" | "relevance";
	resultsPerPage: number;
	currentPage: number;
};

export type PublicationParam = {
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	limiters?: Record<string, any> & {
		reviewed?: boolean;
	};
	facets?: Record<
		string | "publisher" | "subject" | "publicationType",
		FacetEntry[]
	>;
};

export const publication = async (
	domain: Institute | undefined,
	query: string,
	page: number,
	perPage: number,
	param: PublicationParam,
): Promise<PublicationDataType> => {
	// Create payload from params
	const payload: PublicationPayLoad = {
		queries: [
			{
				boolean: "AND",
				term: query,
				suggestedTerms: [],
				field: null,
				key: "initial",
			},
		],
		sort: "relevance",
		currentPage: page,
		resultsPerPage: perPage,
	};

	if (param.limiters) {
		if (param.limiters.reviewed) {
			payload.RV3 = "Y";
		}
	}

	if (param.facets) {
		payload.activeFacets = {};
		if (param.facets.subject) {
			payload.activeFacets.SubjectPubDb = convertFacet(param.facets.subject);
		}
		if (param.facets.publicationType) {
			payload.activeFacets.TypePublicationPubD = convertFacet(
				param.facets.publicationType,
			);
		}
		if (param.facets.publisher) {
			payload.activeFacets.PublisherPubDb = convertFacet(
				param.facets.publisher,
			);
		}
	}

	// Call api
	const response: Response = await fetch(
		createQuery(
			environment.get.search.publication.replace("{domain}", domain ?? "INSHS"),
			convertPayload(payload),
		),
		domain
			? {
					credentials: "include",
				}
			: undefined,
	);
	throwIfNotOk(response);
	return json<PublicationDataType>(response);
};

export const retrieve = async (
	domain: Institute,
	publicationId: string,
): Promise<PublicationRetrieveDataType> => {
	const response: Response = await fetch(
		createQuery(
			`${environment.get.retrieve.publication.replace(
				"{domain}",
				domain,
			)}/${publicationId}`,
		),
		{
			credentials: "include",
		},
	);
	throwIfNotOk(response);
	return json<PublicationRetrieveDataType>(response);
};
