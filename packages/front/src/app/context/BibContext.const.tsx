import type { SearchContextType } from "../shared/types/types";

export const BibContextArticleDefault: SearchContextType["article"] = {
	orderBy: "relevance",
	limiters: {
		fullText: true,
	},
	table: {
		page: 1,
		perPage: 20,
	},
};

export const BibContextPublicationDefault: SearchContextType["publication"] = {
	table: {
		page: 1,
		perPage: 20,
	},
};

export const BibContextMetadoreDefault: SearchContextType["metadore"] = {
	field: null,
	table: {
		page: 1,
		perPage: 20,
	},
};
