import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResearchDataSkeleton from "../../../components/element/skeleton/ResearchDataSkeleton";
import TableMetadore from "../../../components/element/table/TableMetadore";
import PageTitle from "../../../components/internal/PageTitle";
import ChipFacet from "../../../components/page/search/ChipFacet";
import SearchResults, {
	type SearchResultsArgsProps,
} from "../../../components/page/search/SearchResults";
import SearchBar from "../../../components/page/searchbar/SearchBar";
import { metadore } from "../../../services/search/Metadore";
import {
	RouteResearchData,
	getNumber,
	getString,
	updatePageQueryUrl,
	useSearchParams,
} from "../../../shared/Routes";
import { useServicesCatch } from "../../../shared/hook";
import { useTranslator } from "../../../shared/locales/I18N";
import type { MetadoreDataType } from "../../../shared/types/data.types";
import "./ResearchData.scss";
import { Container } from "@mui/system";
import { useBibContext } from "../../../context/BibContext";

const ResearchData = () => {
	const navigate = useNavigate();
	const query = useSearchParams();
	const t = useTranslator();
	const serviceCatch = useServicesCatch();
	const { search, setSearch } = useBibContext();

	const [first, setFirst] = useState<boolean>(true);

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
				(!search.query && search.query !== "") ||
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
			return await metadore(
				search.query,
				search.metadore.table.perPage,
				search.metadore.table.page,
				search.metadore.field,
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
			const queryValue = getString<undefined>(query, "q", undefined);
			if (search.query && !queryValue) {
				setFirst(false);
				return;
			}
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
			setFirst(false);
		} else {
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

			updatePageQueryUrl(RouteResearchData, navigate, param);
		}
	}, [first, navigate, query, search, setSearch]);

	const handleField = (
		event: MouseEvent<HTMLElement>,
		field: string | null,
	): void => {
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
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
				{isLoading || isFetching ? (
					<ResearchDataSkeleton />
				) : (
					<SearchResults
						DisplayElement={TableMetadore}
						results={data?.results}
						args={search.metadore.table}
						onArgsChange={handleTable}
						total={data?.totalHits}
					/>
				)}
			</Container>
		</>
	);
};

export default ResearchData;
