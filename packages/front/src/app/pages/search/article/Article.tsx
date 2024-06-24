import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import type { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/element/button/CustomButton";
import SearchSkeleton from "../../../components/element/skeleton/SearchSkeleton";
import TableArticle from "../../../components/element/table/TableArticle";
import PageTitle from "../../../components/internal/PageTitle";
import ChipFacet from "../../../components/page/search/ChipFacet";
import FacetSidebar, {
	type FacetSidebarProps,
} from "../../../components/page/search/FacetSidebar";
import SearchResults, {
	type SearchResultsArgsProps,
} from "../../../components/page/search/SearchResults";
import SearchBar from "../../../components/page/searchbar/SearchBar";
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
import type { ArticleDataType } from "../../../shared/types/data.types";
import "./Article.scss";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import type { FacetEntry } from "../../../components/page/search/facet/Facet.type";
import { useBibContext } from "../../../context/BibContext";
import { BibContextArticleDefault } from "../../../context/BibContext.const";

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

const Article = () => {
	const navigate = useNavigate();
	const query = useSearchParams();
	const t = useTranslator();
	const serviceCatch = useServicesCatch();
	const facetsCleaner = useFacetsCleaner<Omit<ArticleParam, "orderBy">>();
	const { search, setSearch } = useBibContext();

	const [first, setFirst] = useState<boolean>(true);
	const [seed, setSeed] = useState<number>(0);
	const [saveHistory, setSaveHistory] = useState<boolean>(true);
	const [exports, setExports] = useState<ContextData>([]);

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
			search.query,
			search.domain,
			search.article.orderBy,
			search.article.limiters,
			search.article.facets,
			search.article.table.page,
			search.article.table.perPage,
		],
		queryFn: async () => {
			if (
				(!search.query && search.query !== "") ||
				!search.domain ||
				!search.article.table.perPage ||
				!search.article.table.page
			) {
				return null;
			}
			const values = await article(
				search.domain,
				search.query,
				search.article.table.page,
				search.article.table.perPage,
				saveHistory,
				{
					orderBy: search.article.orderBy,
					limiters: search.article.limiters,
					facets: search.article.facets,
				},
			);
			setSaveHistory(false);
			return values;
		},
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	useEffect(() => {
		if (first) {
			const queryValue = getString<undefined>(query, "q", search.query);
			setSearch({
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
			});
			setFirst(false);
			return;
		}
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
	}, [first, navigate, query, search, setSearch]);

	useEffect(() => {
		if (isError) {
			serviceCatch(error);
		}
	}, [error, isError, serviceCatch]);

	const handleSearch = (value: string | undefined): void => {
		setSaveHistory(true);
		setSearch({
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
		});
	};

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

	const handleFacets = (values: Omit<ArticleParam, "orderBy">) => {
		setSaveHistory(true);
		facetsCleaner(values);
		setSearch({
			...search,
			article: {
				...search.article,
				facets: values.facets,
				limiters: values.limiters,
			},
		});
		setSeed(seed + 1);
	};

	const handleReset = () => {
		setSaveHistory(true);
		setSearch({
			...search,
			article: {
				...BibContextArticleDefault,
				orderBy: search.article.orderBy,
			},
		});
		setSeed(seed + 1);
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

	const handleSelectAll = (
		event: ChangeEvent<HTMLInputElement>,
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
					case "RangeLexile":
						available.facets.lexile = values;
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

	return (
		<>
			<PageTitle page="article" />
			<SearchBar
				placeholder={t("pages.article.searchBar")}
				value={query.get("q") || search.query}
				onSearch={handleSearch}
			>
				<ChipFacet
					value={search.domain}
					values={domains}
					onChange={handleDomain}
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
						) : (
							<ArticleContext.Provider
								value={{
									exports,
									setExports,
								}}
							>
								<SearchResults
									id="search-content"
									DisplayElement={TableArticle}
									results={data?.results}
									args={search.article.table}
									onArgsChange={handleTable}
									total={data?.totalHits}
									header={
										<FormControl id="article-action" size="small">
											{exports.length !== 0 ? (
												<>
													<CustomButton
														sx={{ paddingLeft: 1, paddingRight: 2 }}
														className="article-action-element"
														onClick={() => {
															handleDownload("bibtex");
														}}
													>
														<SaveAltIcon sx={{ marginRight: 1 }} />
														BIBTEX
													</CustomButton>
													<CustomButton
														sx={{ paddingLeft: 1, paddingRight: 2 }}
														className="article-action-element"
														onClick={() => {
															handleDownload("ris");
														}}
													>
														<SaveAltIcon sx={{ marginRight: 1 }} />
														RIS
													</CustomButton>
												</>
											) : null}
											<FormControlLabel
												sx={{ marginLeft: 2 }}
												control={<Checkbox onChange={handleSelectAll} />}
												label={t("pages.article.selectAll")}
											/>
											<Select
												className="article-action-element"
												value={search.article.orderBy}
												onChange={handleOrderChange}
												displayEmpty
											>
												<MenuItem value="date_asc">
													{t("pages.article.order.dateAsc")}
												</MenuItem>
												<MenuItem value="date_desc">
													{t("pages.article.order.dateDesc")}
												</MenuItem>
												<MenuItem value="relevance">
													{t("pages.article.order.relevance")}
												</MenuItem>
											</Select>
										</FormControl>
									}
								/>
							</ArticleContext.Provider>
						)}
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default Article;
