interface SearchField {
	field: string;
	mode: string;
	excludeMatch?: boolean;
}

export interface Filters {
	[key: string]: string;
}

export interface FilterQuery {
	[key: string]: unknown;
}

export const transformFilters = (
	filters: Filters,
	searchFields: SearchField[],
) => {
	if (!filters) {
		return {};
	}

	let filterQuery: FilterQuery = {};
	for (const key in filters) {
		if (!filters[key]) {
			continue;
		}
		if (key === "match") {
			if (!searchFields) {
				continue;
			}
			filterQuery = filterMatch(key, filterQuery, filters, searchFields);
		} else {
			filterQuery = filterByType(key, filterQuery, filters, searchFields);
		}
	}

	return filterQuery;
};

const filterMatch = (
	key: string,
	filterQuery: FilterQuery,
	filters: Filters,
	searchFields: SearchField[],
): FilterQuery => {
	const matchQuery = {};
	const orQuery = [];
	for (const searchField of searchFields) {
		const field = searchField.field;
		const mode = searchField.mode;
		const excludeMatch = searchField.excludeMatch || false;
		const value = filters[key];

		if (excludeMatch) {
			continue;
		}

		if (mode === "lte" || mode === "gte" || field.includes(".")) {
			continue;
		}

		const orFilter = filterByType(
			field,
			matchQuery,
			{ [field]: value },
			searchFields,
		);
		orQuery.push(orFilter);
	}

	return {
		OR: orQuery,
		...filterQuery,
	};
};
const filterByType = (
	key: string,
	filterQuery: FilterQuery,
	filters: Filters,
	searchFields: SearchField[],
): FilterQuery => {
	let updatedFilterQuery = filterQuery;
	if (key.includes(".")) {
		updatedFilterQuery = filterRelation(
			key,
			updatedFilterQuery,
			filters,
			searchFields,
		);
	} else if (key.includes("_lte")) {
		updatedFilterQuery = filterLte(key, updatedFilterQuery, filters);
	} else if (key.includes("_gte")) {
		updatedFilterQuery = filterGte(key, updatedFilterQuery, filters);
	} else if (key === "id") {
		updatedFilterQuery = filterId(key, updatedFilterQuery, filters);
	} else {
		updatedFilterQuery = filterDefault(
			key,
			updatedFilterQuery,
			filters,
			searchFields,
		);
	}

	return updatedFilterQuery;
};

const filterRelation = (
	key: string,
	filterQuery: FilterQuery,
	filters: Filters,
	searchFields: SearchField[],
): FilterQuery => {
	const isSearchable = searchFields.find((item) => item.field === key);

	const [relation, field] = key.split(".");

	return {
		[relation]: {
			some: {
				[field]:
					isSearchable.mode === "contains"
						? {
								[isSearchable.mode]: filters[key],
								mode: "insensitive",
							}
						: {
								[isSearchable.mode]: filters[key],
							},
			},
		},
		...filterQuery,
	};
};

const filterLte = (
	key: string,
	filterQuery: FilterQuery,
	filters: Filters,
): FilterQuery => {
	if (new Date(filters[key]) > new Date("9999-12-31")) {
		return filterQuery;
	}

	const field = key.replace("_lte", "");
	return {
		[field]: {
			lte: new Date(filters[key]),
		},
		...filterQuery,
	};
};

const filterGte = (
	key: string,
	filterQuery: FilterQuery,
	filters: Filters,
): FilterQuery => {
	if (new Date(filters[key]) > new Date("9999-12-31")) {
		return filterQuery;
	}

	const field = key.replace("_gte", "");
	return {
		[field]: {
			gte: new Date(filters[key]),
		},
		...filterQuery,
	};
};

const filterId = (
	key: string,
	filterQuery: FilterQuery,
	filters: Filters,
): FilterQuery => {
	return {
		id: Number.parseInt(filters[key]),
		...filterQuery,
	};
};

const filterDefault = (
	key: string,
	filterQuery: FilterQuery,
	filters: Filters,
	searchFields: SearchField[],
): FilterQuery => {
	const isSearchable = searchFields.find((item) => item.field === key);
	return {
		...filterQuery,
		[key]: {
			[isSearchable.mode]: filters[key],
			mode: isSearchable.mode === "contains" ? "insensitive" : undefined,
		},
	} as Filters; // Add explicit type casting to 'Filters'.
};
