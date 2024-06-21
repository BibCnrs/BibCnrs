export type FacetRequired = {
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	limiters?: any;
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	facets?: any;
};

export type FacetEntry = {
	name: string;
	count: number;
};
