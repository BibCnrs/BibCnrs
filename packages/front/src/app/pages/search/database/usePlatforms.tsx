import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { useBibContext } from "../../../context/BibContext";
import { database } from "../../../services/search/Database";
import { getString, useSearchParams } from "../../../shared/Routes";
import { useMatomo } from "../../../shared/matomo";
import type {
	DatabaseDataType,
	DatabaseItemProps,
	TypeDatabaseEnum,
} from "../../../shared/types/data.types";
import { INITIAL_FILTER } from "./filters";

export function usePlatforms() {
	const { search, language } = useBibContext();

	const query = useSearchParams();
	const querySearch = getString(query, "q", "");

	const { trackSearch } = useMatomo();
	const [filters, setFilters] = useState(INITIAL_FILTER);

	const [nameFilter, setNameFilter] = useState<string>(
		querySearch || search.query || "",
	);

	const { data, isLoading, isError } = useQuery<
		DatabaseDataType,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		any,
		DatabaseDataType,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		any
	>({
		queryKey: ["database", search.domain],
		queryFn: () => database(language, search.domain),
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	const platforms: DatabaseItemProps[] = useMemo(() => {
		const caseInsensitiveSearch = nameFilter?.toLocaleUpperCase();
		const databases =
			data
				?.map((value) => {
					const name = language === "en" ? value.name_en : value.name_fr;
					return {
						...value,
						url: language === "en" ? value.url_en : value.url_fr,
						text: language === "en" ? value.text_en : value.text_fr,
						name,
						upperName: name.toLocaleUpperCase(),
					};
				})
				?.filter((value) =>
					caseInsensitiveSearch
						? value.upperName?.includes(caseInsensitiveSearch)
						: value.upperName,
				) ?? [];

		if (nameFilter) {
			trackSearch(nameFilter, "Database", databases.length);
		}

		return databases;
	}, [data, language, nameFilter, trackSearch]);

	const filteredPlatforms = useMemo(() => {
		return platforms.filter((result) => {
			return filters.every((filter) => {
				if (!filter.value) return true;
				if (filter.invert) {
					return result[filter.invert] !== filter.value;
				}

				if (filter.props === "type") {
					return result[filter.props].includes(
						filter.target as TypeDatabaseEnum,
					);
				}
				return result[filter.props] === filter.value;
			});
		});
	}, [platforms, filters]);

	const handleSearchChange = useCallback((value: string) => {
		setNameFilter(value || "");
	}, []);

	return useMemo(
		() => ({
			search: nameFilter,
			setSearch: handleSearchChange,
			platforms: filteredPlatforms,
			filters,
			setFilters,
			isLoading,
			isError,
		}),
		[
			nameFilter,
			filteredPlatforms,
			handleSearchChange,
			filters,
			isLoading,
			isError,
		],
	);
}
