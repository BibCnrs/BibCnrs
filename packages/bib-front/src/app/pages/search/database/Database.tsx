import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
	type ChangeEvent,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import ColoredPaper from "../../../components/element/paper/colored/ColoredPaper";
import PageTitle from "../../../components/internal/PageTitle";
import { BibContext } from "../../../components/internal/provider/ContextProvider";
import { getHeaderBackgroundColor } from "../../../components/internal/provider/LocalizedThemeProvider";
import ChipFacet from "../../../components/page/facet/ChipFacet";
import { database } from "../../../services/search/Database";
import {
	useDomain,
	useFacetsDomainHandler,
	useServicesCatch,
} from "../../../shared/hook";
import { useLanguageKey, useTranslator } from "../../../shared/locales/I18N";
import type {
	DatabaseDataType,
	DatabaseItemProps,
	TypeDatabaseEnum,
} from "../../../shared/types/data.types";
import "./Database.scss";
import {
	Box,
	Checkbox,
	CircularProgress,
	FormGroup,
	FormLabel,
	MenuItem,
	Pagination,
	Select,
	TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import { DatabaseItem } from "./DatabaseItem";

const INITIAL_FILTER = [
	{ props: "oa", value: false, type: "boolean", section: "default" },
	{
		props: "is_text_integral",
		value: false,
		type: "boolean",
		section: "default",
	},
	{
		props: "is_completed",
		value: false,
		type: "boolean",
		section: "default",
	},
	{
		props: "without_embargo",
		value: false,
		type: "boolean",
		section: "default",
	},
	{
		props: "active",
		value: false,
		type: "boolean",
		section: "document",
	},
	{
		props: "is_archived",
		value: false,
		type: "boolean",
		section: "document",
	},
	{
		props: "type",
		target: "news",
		value: false,
		type: "boolean",
		section: "content",
	},
	{
		props: "type",
		target: "book",
		value: false,
		type: "boolean",
		section: "content",
	},
	{
		props: "type",
		target: "database",
		value: false,
		type: "boolean",
		section: "content",
	},
	{
		props: "type",
		target: "data",
		value: false,
		type: "boolean",
		section: "content",
	},
];

const Database = () => {
	const { login, theme, search } = useContext(BibContext);
	const serviceCatch = useServicesCatch();
	const [filters, setFilters] = useState(INITIAL_FILTER);
	const t = useTranslator();
	const language = useLanguageKey();

	const handleDomain = useFacetsDomainHandler();
	const domains = useDomain();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [databasePerPage, setDatabasePerPage] = useState<number>(10);

	const [nameFilter, setNameFilter] = useState<string>("");

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

	const databases: DatabaseItemProps[] = useMemo(
		() =>
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
				) ?? [],
		[data, language, nameFilter],
	);

	const pageCount = useMemo(
		() => Math.ceil(databases.length / databasePerPage),
		[databases, databasePerPage],
	);

	const filteredDatabases = useMemo(() => {
		return databases.filter((result) => {
			return filters.every((filter) => {
				if (!filter.value) return true;
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

	useEffect(() => {
		setCurrentPage(Math.max(1, Math.min(currentPage, pageCount)));
	}, [currentPage, pageCount]);

	useEffect(() => {
		if (isError) {
			serviceCatch(error);
		}
	}, [error, isError, serviceCatch]);

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNameFilter(e.target.value.toLocaleUpperCase());
	};

	return (
		<div>
			<PageTitle page="database" />
			<div className="header-footer">
				<div id="database-chips">
					<ChipFacet
						value={search.domain}
						values={domains}
						onChange={handleDomain}
					/>
				</div>
			</div>
			<Stack id="app" gap={2}>
				{!login && (
					<ColoredPaper
						id="database-anonymous"
						elevation={4}
						color={getHeaderBackgroundColor(theme)}
						border
					>
						{t("pages.database.anonymousMessage")}
					</ColoredPaper>
				)}

				<Box
					display="grid"
					gridTemplateColumns={{
						xs: "1fr 4fr",
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
						<TextField
							label={t("pages.database.searchDatabase")}
							value={nameFilter}
							onChange={handleSearchChange}
							autoComplete="off"
							sx={{ width: "40%" }}
						/>
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
		</div>
	);
};

function DatabasePagination({
	pageCount,
	currentPage,
	setCurrentPage,
	databasePerPage,
	setDatabasePerPage,
}: {
	pageCount: number;
	currentPage: number;
	setCurrentPage: (value: number) => void;
	databasePerPage: number;
	setDatabasePerPage: (value: number) => void;
}) {
	return (
		<Stack
			spacing={2}
			gap={2}
			alignItems="flex-end"
			justifyContent="flex-end"
			flexDirection="row"
		>
			<Select
				value={databasePerPage}
				onChange={(event) => setDatabasePerPage(event.target.value as number)}
				size="small"
				label="Database per page"
				variant="standard"
			>
				<MenuItem value={10}>10</MenuItem>
				<MenuItem value={25}>25</MenuItem>
				<MenuItem value={50}>50</MenuItem>
			</Select>
			<Pagination
				count={pageCount}
				color="primary"
				page={currentPage}
				onChange={(_, value) => setCurrentPage(value)}
				size="small"
			/>
		</Stack>
	);
}

function FilterTab({
	setFilters,
	filters,
	databases,
}: {
	setFilters: (value) => void;
	filters: typeof INITIAL_FILTER;
	databases: DatabaseItemProps[];
}) {
	const handleChange = (filter) => {
		setFilters((prev) => {
			const newFilters = prev.map((item) => {
				if (item.props === filter.props) {
					if (item.target && filter.target && item.target === filter.target) {
						return {
							...item,
							value: !item.value,
						};
					}
					if (!item.target && !filter.target) {
						return {
							...item,
							value: !item.value,
						};
					}
				}
				return item;
			});

			return newFilters;
		});
	};

	const sections = [...new Set(filters.map((item) => item.section))];

	// for each filter, count the number of databases that have this filter and set in key for each filter
	const countsByFilter = [];
	for (let i = 0; i < filters.length; i++) {
		const filter = filters[i];
		const count = databases.filter((value) => {
			if (filter.props === "type") {
				return value[filter.props].includes(filter.target as TypeDatabaseEnum);
			}
			return value[filter.props] === true;
		}).length;

		const key =
			filter.props === "type"
				? `${filter.props}_${filter.target}`
				: filter.props;
		countsByFilter[key] = count;
	}

	console.log("countsByFilter", countsByFilter);

	return (
		<FormGroup>
			{sections.map((section) => (
				<Stack key={section}>
					<FormLabel component="legend">{section}</FormLabel>
					{filters
						.filter((item) => item.section === section)
						.map((filter, index) => (
							<FormControlLabel
								key={`${filter.props}-${index}`}
								control={
									<Checkbox
										checked={filter.value}
										onChange={() => handleChange(filter)}
									/>
								}
								label={`${filter.props} (${
									countsByFilter[
										filter.props === "type"
											? `${filter.props}_${filter.target}`
											: filter.props
									]
								})`}
							/>
						))}
				</Stack>
			))}
		</FormGroup>
	);
}

export default Database;
