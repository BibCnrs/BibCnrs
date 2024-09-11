import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import {
	Box,
	Button,
	Container,
	Drawer,
	Grid,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useNavigate } from "react-router-dom";
import SearchSkeleton from "../../../components/element/skeleton/SearchSkeleton";
import PageTitle from "../../../components/internal/PageTitle";
import ChipFacet from "../../../components/page/search/ChipFacet";
import FacetSidebar, {
	type FacetSidebarProps,
} from "../../../components/page/search/FacetSidebar";
import PaginationComponent from "../../../components/page/search/PaginationComponent";
import type { SearchResultsArgsProps } from "../../../components/page/search/SearchResults";
import type { FacetEntry } from "../../../components/page/search/facet/Facet.type";
import SearchBar from "../../../components/page/searchbar/SearchBar";
import { SearchError } from "../../../components/shared/SearchError";
import { useBibContext } from "../../../context/BibContext";
import { BibContextArticleDefault } from "../../../context/BibContext.const";
import type {
	ArticleParam,
	OrderByType,
} from "../../../services/search/Article";
import { article, retrieveExport } from "../../../services/search/Article";
import {
	RouteArticle,
	getJSON,
	getNumber,
	getString,
	updatePageQueryUrl,
	useSearchParams,
} from "../../../shared/Routes";
import {
	useDomain,
	useFacetsCleaner,
	useFacetsDomainHandler,
	useServicesCatch,
} from "../../../shared/hook";
import { useTranslator } from "../../../shared/locales/I18N";
import { useMatomo } from "../../../shared/matomo";
import type { ArticleDataType } from "../../../shared/types/data.types";
import { useEffectOnce } from "../../../shared/useEffectOnce";
import ArticleAdvancedSearch from "./ArticleAvancedSearch";
import { ArticleCard } from "./ArticleCard";
import { ArticlePageHeader } from "./ArticlePageHeader";
import { ArticleSidebar } from "./ArticleSidebar";

type ContextData = Array<{
	id: number;
	ris: string;
	bibtex: string;
}>;

export const ArticleContext = createContext<{
	exports: ContextData;
	setExports: Dispatch<SetStateAction<ContextData>>;
	// biome-ignore lint/suspicious/noExplicitAny: need to update it to the correct type (code migration)
}>(null as any);

const ArticlePage = () => {
	const navigate = useNavigate();
	const { trackEvent, trackSearch } = useMatomo();
	const query = useSearchParams();
	const t = useTranslator();
	const serviceCatch = useServicesCatch();
	const facetsCleaner = useFacetsCleaner<Omit<ArticleParam, "orderBy">>();
	const { search, setSearch } = useBibContext();

	const [seed, setSeed] = useState<number>(0);
	const [saveHistory, setSaveHistory] = useState<boolean>(true);
	const [exports, setExports] = useState<ContextData>([]);
	const [selectedArticle, setSelectedArticle] = useState(null);
	const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const articleQuery = useMemo(() => {
		return search.article.query || search.query || "";
	}, [search]);

	const handleDomain = useFacetsDomainHandler();
	const domains = useDomain();

	const { data, isFetching, isLoading, isError, error } = useQuery<
		ArticleDataType,
		// biome-ignore lint/suspicious/noExplicitAny: need to update it to the correct type (code migration)
		any,
		ArticleDataType,
		// biome-ignore lint/suspicious/noExplicitAny: need to update it to the correct type (code migration)
		any
	>({
		queryKey: [
			"article",
			articleQuery,
			search.domain,
			search.article.orderBy,
			search.article.limiters,
			search.article.facets,
			search.article.table.page,
			search.article.table.perPage,
		],
		queryFn: async () => {
			if (
				!articleQuery ||
				!search.domain ||
				!search.article.table.perPage ||
				!search.article.table.page
			) {
				return null;
			}
			const values = await article(
				search.domain,
				articleQuery,
				search.article.table.page,
				search.article.table.perPage,
				saveHistory,
				{
					orderBy: search.article.orderBy,
					limiters: search.article.limiters,
					facets: search.article.facets,
				},
			);
			trackSearch(articleQuery, "Articles", values.totalHits);
			setSaveHistory(false);
			return values;
		},
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	useEffectOnce(() => {
		const queryValue = getString<undefined>(query, "q", "");
		if (queryValue) {
			setSearch((search) => ({
				...search,
				query: queryValue,
				article: {
					...search.article,
					limiters: getJSON(query, "limiters", search.article.limiters),
					facets: getJSON(query, "facets", search.article.facets),
					orderBy: getString(
						query,
						"orderBy",
						search.article.orderBy,
					) as OrderByType,
					table: {
						page: getNumber(query, "page", search.article.table.page),
						perPage: getNumber(query, "perPage", search.article.table.perPage),
					},
				},
			}));
		}
	}, [query, setSearch]);

	useEffect(() => {
		// biome-ignore lint/suspicious/noExplicitAny: need to update it to the correct type (code migration)
		const param: any = {};

		if (search.query) {
			param.q = search.query;
		}

		if (search.article.table.page) {
			param.page = search.article.table.page;
		}

		if (search.article.table.perPage) {
			param.perPage = search.article.table.perPage;
		}

		if (search.article.orderBy) {
			param.orderBy = search.article.orderBy;
		}

		if (search.article.limiters) {
			param.limiters = JSON.stringify(search.article.limiters);
		}

		if (search.article.facets) {
			param.facets = JSON.stringify(search.article.facets);
		}
		updatePageQueryUrl(RouteArticle, navigate, param);
	}, [navigate, search]);

	useEffect(() => {
		if (isError) {
			serviceCatch(error);
		}
	}, [error, isError, serviceCatch]);

	useEffect(() => {
		if (selectedArticle) {
			setIsDrawerOpen(true);
		}
	}, [selectedArticle]);

	const handleDrawerClose = () => {
		setIsDrawerOpen(false);
		// Wait for the drawer to close before resetting the selected publication
		setTimeout(() => {
			setSelectedArticle(null);
		}, 195);
	};

	const handleChangeDomain = (event, field) => {
		setSaveHistory(true);
		handleDomain(event, field);
	};

	const handleSearch = useCallback(
		(value: string | undefined): void => {
			setSaveHistory(true);
			setSearch((search) => ({
				...search,
				query: value,
				article: {
					limiters: search.article.limiters,
					orderBy: search.article.orderBy,
					table: {
						page: 1,
						perPage: search.article.table.perPage,
					},
				},
			}));
		},
		[setSearch],
	);

	const handleOrderChange = (event: SelectChangeEvent<OrderByType>) => {
		setSaveHistory(true);
		setSearch({
			...search,
			article: {
				...search.article,
				orderBy: event.target.value as OrderByType,
			},
		});
	};

	const handleFacets = useCallback(
		(values: Omit<ArticleParam, "orderBy">) => {
			setSaveHistory(true);
			facetsCleaner(values);
			setSearch((search) => ({
				...search,
				article: {
					...search.article,
					facets: values.facets,
					limiters: values.limiters,
				},
			}));
			setSeed((seed) => seed + 1);
		},
		[facetsCleaner, setSearch],
	);

	const handleReset = useCallback(() => {
		setSaveHistory(true);
		setSearch((search) => ({
			...search,
			article: {
				...BibContextArticleDefault,
				orderBy: search.article.orderBy,
			},
		}));
		setSeed((seed) => seed + 1);
	}, [setSearch]);

	const handleSelectAll = (
		_: ChangeEvent<HTMLInputElement>,
		checked: boolean,
	) => {
		if (data && checked) {
			const all: ContextData = data.results.map((value) => {
				return {
					id: value.id,
					ris: value.exportLinks?.ris ?? "",
					bibtex: value.exportLinks?.bibtex ?? "",
				};
			});
			setExports(all);
			return;
		}
		setExports([]);
	};

	const handleDownload = (target: "bibtex" | "ris") => {
		const links = exports.map((value) => value[target]);
		retrieveExport(links).then((exportValues) => {
			const blob = new Blob([exportValues.join("\n")], { type: "text/plain" });
			const elem = document.createElement("a");
			elem.href = URL.createObjectURL(blob);
			elem.download = `notices.${target === "bibtex" ? "bib" : "ris"}`;
			document.body.appendChild(elem);
			elem.click();
			document.body.removeChild(elem);
		});
	};

	const handleTable = (tableArgs: SearchResultsArgsProps) => {
		setSearch({
			...search,
			article: {
				...search.article,
				table: tableArgs,
			},
		});
	};

	const handlePagination = (currentPage: number, resultsPerPage: number) => {
		handleTable({
			...search.article.table,
			perPage: resultsPerPage,
			page: currentPage,
		});
	};

	const getAvailable = (result: ArticleDataType | undefined) => {
		const available: Partial<FacetSidebarProps<ArticleParam>["available"]> = {};
		available.limiters = {
			fullText: true,
			openAccess: true,
			reviewed: true,
		};
		if (result) {
			available.limiters.dateRange = {
				from: result.dateRange.min,
				to: result.dateRange.max,
			};
			result.facets.forEach((value) => {
				if (available.facets === undefined) {
					available.facets = {};
				}
				const values = value.AvailableFacetValues.map<FacetEntry>(
					(entry): FacetEntry => ({
						name: entry.Value,
						count: entry.Count,
					}),
				);
				switch (value.Id) {
					case "CollectionLibrary":
						available.facets.collection = values;
						break;
					case "ContentProvider":
						available.facets.provider = values;
						break;
					case "Journal":
						available.facets.journal = values;
						break;
					case "Language":
						available.facets.language = values;
						break;
					case "Publisher":
						available.facets.publisher = values;
						break;
					case "SourceType":
						available.facets.source = values;
						break;
					case "SubjectEDS":
						available.facets.subject = values;
						break;
				}
			});
		}
		return available;
	};

	const getActive = () => {
		const active: Partial<FacetSidebarProps<ArticleParam>["active"]> = {
			limiters: search.article.limiters,
			facets: search.article.facets,
		};
		return active;
	};

	const openAdvancedSearch = () => {
		setShowAdvancedSearch(true);
		trackEvent("Articles", "AdvancedSearch", "Open");
	};

	const closeAdvancedSearch = useCallback(
		(query?: string) => {
			setShowAdvancedSearch(false);
			trackEvent("Articles", "AdvancedSearch", "Close");
			if (query) {
				setSaveHistory(true);
				setSearch((search) => ({
					...search,
					article: {
						query,
						limiters: search.article.limiters,
						orderBy: search.article.orderBy,
						table: {
							page: 1,
							perPage: search.article.table.perPage,
						},
					},
				}));
			}
		},
		[setSearch, trackEvent],
	);

	return (
		<>
			<PageTitle page="article" />
			<SearchBar
				placeholder={t("pages.article.searchBar")}
				value={articleQuery}
				onSearch={handleSearch}
				secondaryAction={
					<Tooltip arrow title={t("components.advancedSearch.modalTitle")}>
						<Stack
							direction="row"
							alignItems="center"
							sx={{ marginRight: "1em" }}
						>
							<Button
								onClick={openAdvancedSearch}
								aria-label={t("components.advancedSearch.modalTitle")}
								color="info"
								sx={{
									textWrap: "nowrap",
									fontWeight: 700,
									fontSize: "1em",
									textTransform: "none",
								}}
								autoCapitalize="false"
							>
								<ManageSearchIcon />
								{t("components.advancedSearch.modalTitle")}
							</Button>
						</Stack>
					</Tooltip>
				}
			>
				<ChipFacet
					value={search.domain}
					values={domains}
					onChange={handleChangeDomain}
				/>
			</SearchBar>

			<Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
				<Grid container spacing={4} padding={2}>
					<Grid item xs={12} md={3}>
						<FacetSidebar
							key={seed}
							available={getAvailable(data)}
							active={getActive()}
							onChange={handleFacets}
							onReset={handleReset}
						/>
					</Grid>

					<Grid item xs={12} md={9}>
						{isLoading || isFetching ? (
							<SearchSkeleton />
						) : isError ? (
							<SearchError />
						) : (
							<ArticleContext.Provider
								value={{
									exports,
									setExports,
								}}
							>
								<ArticlePageHeader
									totalHits={data?.totalHits ?? 0}
									orderBy={search.article.orderBy}
									handleDownload={handleDownload}
									handleSelectAll={handleSelectAll}
									handleOrderChange={handleOrderChange}
								/>

								{!data ? (
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
									{data?.results.map((value) => (
										<ArticleCard
											key={value.id}
											article={value}
											setSelectedArticle={setSelectedArticle}
										/>
									))}
								</Stack>
								<PaginationComponent
									currentPage={search.article.table.page}
									onChange={handlePagination}
									resultsPerPage={search.article.table.perPage}
									total={data?.totalHits}
								/>
								<Drawer
									anchor="right"
									open={isDrawerOpen}
									onClose={handleDrawerClose}
								>
									{selectedArticle && (
										<ArticleSidebar article={selectedArticle} />
									)}
								</Drawer>
							</ArticleContext.Provider>
						)}
					</Grid>
				</Grid>
			</Container>
			<ArticleAdvancedSearch
				open={showAdvancedSearch}
				onClose={closeAdvancedSearch}
			/>
		</>
	);
};

export default ArticlePage;
