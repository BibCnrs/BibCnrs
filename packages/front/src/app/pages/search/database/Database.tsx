import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import PageTitle from "../../../components/internal/PageTitle";
import ChipFacet from "../../../components/page/search/ChipFacet";
import SearchBar from "../../../components/page/searchbar/SearchBar";
import { useBibContext } from "../../../context/BibContext";
import { database } from "../../../services/search/Database";
import { getString, useSearchParams } from "../../../shared/Routes";
import {
	useDomain,
	useFacetsDomainHandler,
	useServicesCatch,
} from "../../../shared/hook";
import { useLanguageKey, useTranslator } from "../../../shared/locales/I18N";
import { useMatomo } from "../../../shared/matomo";
import type {
	DatabaseDataType,
	DatabaseItemProps,
	TypeDatabaseEnum,
} from "../../../shared/types/data.types";
import { DatabaseItem } from "./DatabaseItem";
import { DatabasePagination } from "./DatabasePagination";
import FilterTab from "./FilterTab";
import { INITIAL_FILTER } from "./filters";

const Database = () => {
	const {
		session: { user },
		search,
	} = useBibContext();
	const { trackSearch } = useMatomo();
	const serviceCatch = useServicesCatch();
	const [filters, setFilters] = useState(INITIAL_FILTER);
	const t = useTranslator();
	const language = useLanguageKey();

	const handleDomain = useFacetsDomainHandler();
	const domains = useDomain();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [databasePerPage, setDatabasePerPage] = useState<number>(50);

	const [nameFilter, setNameFilter] = useState<string>("");

	// For filtrer from the home search
	const query = useSearchParams();
	const querySearch = getString(query, "q", "");

	const { data, isLoading, isError, error } = useQuery<
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

	const databases: DatabaseItemProps[] = useMemo(() => {
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
					nameFilter ? value.upperName?.includes(nameFilter) : value.upperName,
				) ?? [];

		if (nameFilter) {
			trackSearch(nameFilter, "Database", databases.length);
		}

		return databases;
	}, [data, language, nameFilter, trackSearch]);

	const filteredDatabases = useMemo(() => {
		return databases.filter((result) => {
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
	}, [databases, filters]);

	const pagedDatabases = useMemo(() => {
		return filteredDatabases.slice(
			(currentPage - 1) * databasePerPage,
			currentPage * databasePerPage,
		);
	}, [currentPage, databasePerPage, filteredDatabases]);

	const pageCount = useMemo(
		() => Math.ceil(filteredDatabases.length / databasePerPage),
		[filteredDatabases, databasePerPage],
	);

	useEffect(() => {
		setCurrentPage(Math.max(1, Math.min(currentPage, pageCount)));
	}, [currentPage, pageCount]);

	useEffect(() => {
		if (isError) {
			serviceCatch(error);
		}
	}, [error, isError, serviceCatch]);

	useEffect(() => {
		if (querySearch) {
			setNameFilter(querySearch.toLocaleUpperCase());
		}
	}, [querySearch]);

	const handleSearchChange = (value) => {
		setNameFilter(value.toLocaleUpperCase());
	};

	return (
		<>
			<PageTitle page="database" />
			<SearchBar
				placeholder={t("pages.researchData.search.bar")}
				value={query.get("q") || search.query}
				onSearch={handleSearchChange}
				disableAutocomplete
			>
				<ChipFacet
					value={search.domain}
					values={domains}
					onChange={handleDomain}
				/>
			</SearchBar>
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
				<Stack gap={2}>
					{!user && (
						<Alert variant="outlined" severity="info">
							{t("pages.database.anonymousMessage")}
						</Alert>
					)}

					<Box
						display="grid"
						gridTemplateColumns={{
							xs: "1fr",
							sm: "1fr 4fr",
						}}
						gap={3}
					>
						<Box>
							<FilterTab
								setFilters={setFilters}
								filters={filters}
								databases={filteredDatabases}
							/>
						</Box>
						<Stack gap={2}>
							<Typography>
								{t("pages.database.platform", {
									count: filteredDatabases.length,
								})}
							</Typography>

							{isLoading ? (
								<Stack alignItems="center" spacing={5}>
									<CircularProgress />
								</Stack>
							) : (
								<>
									<Box
										display="grid"
										gridTemplateColumns={{
											xs: "repeat(1, 1fr)",
											sm: "repeat(2, 1fr)",
											md: "repeat(3, 1fr)",
											lg: "repeat(4, 1fr)",
										}}
										gap={2}
										role="list"
										aria-label={t("pages.database.title")}
									>
										{pagedDatabases.map((item) => (
											<DatabaseItem key={item.id} {...item} />
										))}
									</Box>
									<DatabasePagination
										pageCount={pageCount}
										currentPage={currentPage}
										setCurrentPage={setCurrentPage}
										databasePerPage={databasePerPage}
										setDatabasePerPage={setDatabasePerPage}
									/>
								</>
							)}
						</Stack>
					</Box>
				</Stack>
			</Container>
		</>
	);
};

export default Database;
