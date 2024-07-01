import { Drawer, Grid, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
import { BibContextPublicationDefault } from "../../../context/BibContext.const";
import type { PublicationParam } from "../../../services/search/Publication";
import { publication } from "../../../services/search/Publication";
import {
	RoutePublication,
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
import type { PublicationDataType } from "../../../shared/types/data.types";
import { PublicationCard } from "./PublicationCard";
import { PublicationPageHeader } from "./PublicationPageHeader";
import { PublicationSidebar } from "./PublicationSidebar";

const ALPHABET = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
];

const PublicationPage = () => {
	const navigate = useNavigate();
	const query = useSearchParams();
	const t = useTranslator();
	const serviceCatch = useServicesCatch();
	const facetsCleaner = useFacetsCleaner<PublicationParam>();
	const { search, setSearch } = useBibContext();
	const [searchByLetter, setSearchByLetter] = useState<string>("");
	const [first, setFirst] = useState<boolean>(true);
	const [seed, setSeed] = useState<number>(0);
	const [selectedPublication, setSelectedPublication] = useState(null);

	const handleDomain = useFacetsDomainHandler();
	const domains = useDomain();

	const { data, isFetching, isLoading, isError, error } = useQuery<
		PublicationDataType,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		any,
		PublicationDataType,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		any
	>({
		queryKey: [
			"publication",
			search.query,
			search.domain,
			search.publication.limiters,
			search.publication.facets,
			search.publication.table.page,
			search.publication.table.perPage,
		],
		queryFn: async () => {
			if (
				(!search.query && search.query !== "") ||
				!search.publication.table.perPage ||
				!search.publication.table.page
			) {
				return null;
			}
			return publication(
				search.domain,
				search.query,
				search.publication.table.page,
				search.publication.table.perPage,
				{
					limiters: search.publication.limiters,
					facets: search.publication.facets,
				},
			);
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

	useEffect(() => {
		if (first) {
			const queryValue = getString<undefined>(query, "q", search.query);
			setSearch({
				...search,
				query: queryValue,
				publication: {
					...search.publication,
					limiters: getJSON(query, "limiters", search.publication.limiters),
					facets: getJSON(query, "facets", search.publication.facets),
					table: {
						page: getNumber(query, "page", search.publication.table.page),
						perPage: getNumber(
							query,
							"perPage",
							search.publication.table.perPage,
						),
					},
				},
			});
			if (queryValue) {
				if (queryValue.length >= 2) {
					if (ALPHABET.includes(queryValue[0]) && queryValue.endsWith("*")) {
						setSearchByLetter(queryValue[0]);
					}
				}
			}
			setFirst(false);
			return;
		}
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		const param: any = {};

		if (search.query) {
			param.q = search.query;
		}

		if (search.publication.table.page) {
			param.page = search.publication.table.page;
		}

		if (search.publication.table.perPage) {
			param.perPage = search.publication.table.perPage;
		}

		if (search.publication.limiters) {
			param.limiters = JSON.stringify(search.publication.limiters);
		}

		if (search.publication.facets) {
			param.facets = JSON.stringify(search.publication.facets);
		}
		updatePageQueryUrl(RoutePublication, navigate, param);
	}, [first, navigate, query, search, setSearch]);

	const performSearch = (value: string | undefined) => {
		setSearch({
			...search,
			query: value,
			publication: {
				table: {
					page: 1,
					perPage: search.publication.table.perPage,
				},
			},
		});
	};
	const handleSearch = (value: string | undefined): void => {
		setSearchByLetter("");
		performSearch(value);
	};

	const handleSearchByLetterL1 = (letter: string) => {
		setSearchByLetter(letter);
		performSearch(`${letter}*`);
	};
	const handleSearchByLetterL2 = (letter: string) => {
		performSearch(`${letter}*`);
	};

	const handleSearchByNumber = () => {
		setSearchByLetter("");
		performSearch("0* OR 1* OR 2* OR 3* OR 4* OR 5* OR 6* OR 7* OR 8* OR 9*");
	};

	const handleReset = () => {
		setSearch({
			...search,
			publication: BibContextPublicationDefault,
		});
		setSeed(seed + 1);
	};

	const handleFacets = (values: PublicationParam) => {
		facetsCleaner(values);
		setSearch({
			...search,
			publication: {
				...search.publication,
				facets: values.facets,
				limiters: values.limiters,
			},
		});
		setSeed(seed + 1);
	};

	const handleTable = (tableArgs: SearchResultsArgsProps) => {
		setSearch({
			...search,
			publication: {
				...search.publication,
				table: tableArgs,
			},
		});
	};

	const handlePagination = (currentPage: number, resultsPerPage: number) => {
		handleTable({
			...search.publication.table,
			perPage: resultsPerPage,
			page: currentPage,
		});
	};

	const getAvailable = (result: PublicationDataType | undefined) => {
		const available: Partial<FacetSidebarProps<PublicationParam>["available"]> =
			{};
		available.limiters = {
			reviewed: true,
		};
		if (result) {
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
					case "PublisherPubDb":
						available.facets.publisher = values;
						break;
					case "SubjectPubDb":
						available.facets.subject = values;
						break;
					case "TypePublicationPubD":
						available.facets.type = values;
						break;
				}
			});
		}
		return available;
	};

	const getActive = () => {
		const active: Partial<FacetSidebarProps<PublicationParam>["active"]> = {
			limiters: search.publication.limiters,
			facets: search.publication.facets,
		};
		return active;
	};

	return (
		<>
			<PageTitle page="publication" />
			<SearchBar
				placeholder={t("pages.publication.searchBar")}
				value={query.get("q") || search.query}
				onSearch={handleSearch}
			>
				<ChipFacet
					value={search.domain}
					values={domains}
					onChange={handleDomain}
				/>
				<Box>
					{ALPHABET.map((letter) => (
						<Button
							variant="contained"
							size="small"
							sx={{
								padding: 0,
								minWidth: "30px",
								margin: "0 2px",
								backgroundColor:
									searchByLetter === letter ? "secondary.main" : "primary.main",
							}}
							key={letter}
							onClick={() => {
								handleSearchByLetterL1(letter);
							}}
						>
							{letter}
						</Button>
					))}
					<Button
						variant="contained"
						size="small"
						sx={{
							padding: 0,
							minWidth: "30px",
							margin: "0 2px",
							backgroundColor:
								search.query ===
								"0* OR 1* OR 2* OR 3* OR 4* OR 5* OR 6* OR 7* OR 8* OR 9*"
									? "secondary.main"
									: "primary.main",
						}}
						onClick={handleSearchByNumber}
					>
						0-9
					</Button>
				</Box>
				{searchByLetter && (
					<Box>
						{ALPHABET.map((letter) => (
							<Button
								variant="contained"
								size="small"
								sx={{
									padding: 0,
									minWidth: "30px",
									margin: "0 2px",
									backgroundColor:
										search.query === `${searchByLetter}${letter}*`
											? "secondary.main"
											: "primary.main",
									fontFamily: "monospace",
								}}
								key={`${searchByLetter}${letter}`}
								onClick={() =>
									handleSearchByLetterL2(`${searchByLetter}${letter}`)
								}
							>
								{searchByLetter}
								{letter}
							</Button>
						))}
					</Box>
				)}
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
							<>
								<PublicationPageHeader totalHits={data?.totalHits ?? 0} />

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

								<Stack mt={2} spacing={2} mb={2}>
									{data?.results.map((value) => (
										<PublicationCard
											key={value.id}
											publication={value}
											setSelectedPublication={setSelectedPublication}
										/>
									))}
								</Stack>
								<PaginationComponent
									currentPage={search.publication.table.page}
									onChange={handlePagination}
									resultsPerPage={search.publication.table.perPage}
									total={data?.totalHits}
								/>
								<Drawer
									anchor="right"
									open={!!selectedPublication}
									onClose={() => setSelectedPublication(null)}
								>
									{selectedPublication && (
										<PublicationSidebar publication={selectedPublication} />
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

export default PublicationPage;
