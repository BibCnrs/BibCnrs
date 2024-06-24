import type { FacetEntry } from "../components/page/search/facet/Facet.type";

export const convertFacet = (array: FacetEntry[]): string[] => {
	return array.map<string>((value) => value.name);
};

export const convertPayload = (
	payload: Record<string, unknown>,
): Record<string, number | string | null> => {
	const queryPayLoad: Record<string, number | string | null> = {};
	Object.keys(payload).forEach((key) => {
		const value: unknown = payload[key];
		if (value === null) {
			queryPayLoad[key] = null;
		} else if (typeof value === "string" || typeof value === "number") {
			queryPayLoad[key] = value;
		} else {
			queryPayLoad[key] = JSON.stringify(value);
		}
	});
	return queryPayLoad;
};
