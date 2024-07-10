import type { MouseEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import type { FacetRequired } from "../components/page/search/facet/Facet.type";
import { useBibContext } from "../context/BibContext";

export const useServicesCatch = () => {
	const { logout } = useBibContext();
	return (error: Error) => {
		if (error.cause === "401") {
			logout();
		}
	};
};

export const useFacetsCleaner = <T extends FacetRequired>() => {
	return useCallback((values: T): T => {
		if (values.limiters) {
			for (const key of Object.keys(values.limiters)) {
				if (
					values.limiters[key] === undefined ||
					values.limiters[key] === false
				) {
					delete values.limiters[key];
				}
			}
			if (Object.keys(values.limiters).length === 0) {
				// biome-ignore lint/performance/noDelete: <explanation>
				delete values.limiters;
			}
		}
		if (values.facets) {
			for (const key of Object.keys(values.facets)) {
				if (
					values.facets[key] === undefined ||
					values.facets[key].length === 0
				) {
					delete values.facets[key];
				}
			}
			if (Object.keys(values.facets).length === 0) {
				// biome-ignore lint/performance/noDelete: <explanation>
				delete values.facets;
			}
		}
		return values;
	}, []);
};

export const useFacetsDomainHandler = () => {
	const { search, setSearch } = useBibContext();
	return (event: MouseEvent<HTMLElement>, field: string | null) => {
		if (field === null) {
			return;
		}
		setSearch({
			...search,
			domain: field,
		});
	};
};

export const useDomain = (): Array<{ value: string; label: string }> => {
	const {
		session: { user },
	} = useBibContext();
	if (!user) {
		return [];
	}
	return (
		user?.domains?.map((domain) => {
			return {
				value: domain,
				label: domain,
			};
		}) ?? []
	);
};

// https://codesandbox.io/s/react-query-debounce-ted8o?file=/src/useDebounce.js
export const useDebounce = <T>(value: T, delay: number): T => {
	// State and setters for debounced value
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
};
