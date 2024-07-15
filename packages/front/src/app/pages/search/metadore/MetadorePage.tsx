import { Drawer, Grid, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchSkeleton from "../../../components/element/skeleton/SearchSkeleton";
import PageTitle from "../../../components/internal/PageTitle";
import ChipFacet from "../../../components/page/search/ChipFacet";
import PaginationComponent from "../../../components/page/search/PaginationComponent";
import type { SearchResultsArgsProps } from "../../../components/page/search/SearchResults";
import SearchBar from "../../../components/page/searchbar/SearchBar";
import { SearchError } from "../../../components/shared/SearchError";
import { useBibContext } from "../../../context/BibContext";
import { metadore } from "../../../services/search/Metadore";
import {
	RouteMetadore,
	getNumber,
	getString,
	updatePageQueryUrl,
	useSearchParams,
} from "../../../shared/Routes";
import { useServicesCatch } from "../../../shared/hook";
import { useTranslator } from "../../../shared/locales/I18N";
import { useMatomo } from "../../../shared/matomo";
import type { MetadoreDataType } from "../../../shared/types/data.types";
import { useEffectOnce } from "../../../shared/useEffectOnce";
import { MetadoreCard } from "./MetadoreCard";
import { MetadorePageHeader } from "./MetadorePageHeader";
import { MetadoreSidebar } from "./MetadoreSidebar";

const MetadorePage = () => {
	const navigate = useNavigate();
	const { trackEvent, trackSearch } = useMatomo();
	const query = useSearchParams();
	const t = useTranslator();
	const serviceCatch = useServicesCatch();
	const { search, setSearch } = useBibContext();

	const [selectedMetadore, setSelectedMetadore] = useState(null);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const { data, isFetching, isLoading, isError, error } = useQuery<
		MetadoreDataType,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		any,
		MetadoreDataType,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		any
	>({
		queryKey: [
			"metadore",
			search.query,
			search.metadore.field,
			search.metadore.table.page,
			search.metadore.table.perPage,
		],
		queryFn: async () => {
			if (
				!search.query ||
				!search.metadore.table.perPage ||
				!search.metadore.table.page
			) {
				return {
					results: undefined,
					totalHits: undefined,
					maxPage: 1,
					currentPage: 1,
				} as MetadoreDataType;
			}
			const results = await metadore(
				search.query,
				search.metadore.table.perPage,
				search.metadore.table.page,
				search.metadore.field,
			);

			trackSearch(search.query, "Metadore", results.totalHits);

			return results;
		},
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	useEffect(() => {
		if (isError) {
			serviceCatch(error);
		}
	}, [error, isError, serviceCatch]);

	useEffectOnce(() => {
		const queryValue = getString<undefined>(query, "q", "");

		if (queryValue) {
			setSearch({
				...search,
				query: queryValue,
				metadore: {
					field: getString<null>(query, "field", null),
					table: {
						page: getNumber(query, "page", 1),
						perPage: getNumber(query, "perPage", 25),
					},
				},
			});
		}
	}, [query, setSearch]);

	useEffect(() => {
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		const param: any = {};

		if (search.query) {
			param.q = search.query;
		}

		if (search.metadore.table.page) {
			param.page = search.metadore.table.page;
		}

		if (search.metadore.table.perPage) {
			param.perPage = search.metadore.table.perPage;
		}

		if (search.metadore.field) {
			param.field = search.metadore.field;
		}

		updatePageQueryUrl(RouteMetadore, navigate, param);
	}, [navigate, search]);

	useEffect(() => {
		if (selectedMetadore) {
			setIsDrawerOpen(true);
		}
	}, [selectedMetadore]);

	const handleDrawerClose = () => {
		setIsDrawerOpen(false);
		// Wait for the drawer to close before resetting the selected publication
		setTimeout(() => {
			setSelectedMetadore(null);
		}, 195);
	};

	const handleField = (
		_: MouseEvent<HTMLElement>,
		field: string | null,
	): void => {
		trackEvent("Metadore", "field", field || "all");
		setSearch({
			...search,
			metadore: {
				field,
				table: search.metadore.table,
			},
		});
	};

	const handleSearch = (value: string | undefined): void => {
		setSearch({
			...search,
			query: value,
			metadore: {
				field: search.metadore.field,
				table: {
					page: 1,
					perPage: search.metadore.table.perPage,
				},
			},
		});
	};

	const handleTable = (tableArgs: SearchResultsArgsProps) => {
		setSearch({
			...search,
			metadore: {
				field: search.metadore.field,
				table: tableArgs,
			},
		});
	};

	const handlePagination = (currentPage: number, resultsPerPage: number) => {
		handleTable({
			...search.metadore.table,
			perPage: resultsPerPage,
			page: currentPage,
		});
	};

	return (
		<>
			<PageTitle page="researchData" />
			<SearchBar
				placeholder={t("pages.researchData.search.bar")}
				value={query.get("q") || search.query}
				onSearch={handleSearch}
			>
				<ChipFacet
					value={search.metadore.field}
					values={[
						{
							value: "attributes.titles.title",
							label: "title",
						},
						{
							value: "attributes.descriptions.description",
							label: "description",
						},
						{
							value: "attributes.subjects.subject",
							label: "subject",
						},
						{
							value: "attributes.doi",
							label: "doi",
						},
					]}
					onChange={handleField}
					isDomain={false}
				/>
			</SearchBar>
			<Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
				<Grid container spacing={4} padding={2}>
					<Grid item xs={12} md={12}>
						{isLoading || isFetching ? (
							<SearchSkeleton />
						) : isError ? (
							<SearchError />
						) : (
							<>
								<MetadorePageHeader totalHits={data?.totalHits ?? 0} />

								{!data?.results ? (
									<Box mt={5}>
										<Typography variant="h6">
											{t("components.search.noSearch")}
										</Typography>
									</Box>
								) : null}

								{data?.totalHits === 0 ? (
									<Box mt={5}>
										<Typography variant="h6">
											{t("components.search.noData")}
										</Typography>
									</Box>
								) : null}

								<Stack mt={2} spacing={2} mb={2} gap={2}>
									{data?.results?.map((value) => (
										<MetadoreCard
											key={value.id}
											metadore={value}
											setSelectedMetadore={setSelectedMetadore}
										/>
									))}
								</Stack>
								<PaginationComponent
									currentPage={search.metadore.table.page}
									onChange={handlePagination}
									resultsPerPage={search.metadore.table.perPage}
									total={data?.totalHits}
								/>
								<Drawer
									anchor="right"
									open={isDrawerOpen}
									onClose={handleDrawerClose}
								>
									{selectedMetadore && (
										<MetadoreSidebar metadore={selectedMetadore} />
									)}
								</Drawer>
							</>
						)}
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default MetadorePage;
