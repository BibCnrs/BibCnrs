import type {
	ArticleDataType,
	HistoryDataType,
} from "../../shared/types/data.types";
import type { Institute } from "../../shared/types/types";
import { createQuery, environment, json, throwIfNotOk } from "../Environment";
import type { ArticleParam, ArticlePayLoad } from "../search/Article";

export const history = async (
	limit: number,
	offset: number,
	displayOnlyAlert: boolean,
	q?: string,
): Promise<HistoryDataType> => {
	const options: {
		limit: number;
		offset: number;
		has_alert: boolean;
		q?: string;
	} = {
		limit,
		offset,
		has_alert: displayOnlyAlert,
	};

	if (q) {
		options.q = q;
	}

	const query = createQuery(environment.get.account.history, options);
	const response: Response = await fetch(query, {
		credentials: "include",
	});
	throwIfNotOk(response);
	const result = await json<HistoryDataType>(response);

	return result;
};

export const addHistory = async (
	payload: Partial<ArticlePayLoad>,
	param: ArticleParam,
	domain: Institute,
	result: ArticleDataType,
): Promise<void> => {
	if (!result) {
		return;
	}
	const query = createQuery(environment.post.account.history);

	const limiters: ArticleParam["limiters"] & {
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		publicationId: any;
		publicationDate: {
			from: number | null;
			to: number | null;
		};
	} = {
		fullText: false,
		openAccess: false,
		peerReviewed: false,
		publicationDate: {
			from: null,
			to: null,
		},
		publicationId: null,
	};
	Object.assign(limiters, param.limiters);
	if (limiters.dateRange) {
		limiters.publicationDate = limiters.dateRange;
		limiters.dateRange = undefined;
	}

	const response: Response = await fetch(query, {
		credentials: "include",
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			history: {
				activeFacets: payload.activeFacets ?? {},
				domain,
				limiters,
				queries: payload.queries,
				resultsPerPage: payload.resultsPerPage,
				sort: payload.sort,
				totalHits: result.totalHits,
			},
		}),
	});
	throwIfNotOk(response);
};

export const deleteHistory = async (): Promise<void> => {
	const query = createQuery(environment.delete.account.histories);
	const response: Response = await fetch(query, {
		method: "DELETE",
		credentials: "include",
	});
	throwIfNotOk(response);
};

export const deleteHistoryEntry = async (id: number): Promise<void> => {
	const query = createQuery(environment.delete.account.history, {
		id,
	});
	const response: Response = await fetch(query, {
		method: "DELETE",
		credentials: "include",
	});
	throwIfNotOk(response);
};
