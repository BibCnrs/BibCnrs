import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
	type ChangeEvent,
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
} from "../../../shared/types/data.types";
import "./Database.scss";
import {
	Box,
	CircularProgress,
	MenuItem,
	Pagination,
	Select,
	TextField,
} from "@mui/material";
import { Stack } from "@mui/system";
import { DatabaseItem } from "./DatabaseItem";

const Database = () => {
	const { login, theme, search } = useContext(BibContext);
	const serviceCatch = useServicesCatch();
	const [oa, setOa] = useState(!login);
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
		queryKey: ["database", oa, search.domain],
		queryFn: () => database(language, oa, search.domain),
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

	const pagedDatabases = useMemo(
		() =>
			databases.slice(
				(currentPage - 1) * databasePerPage,
				currentPage * databasePerPage,
			),
		[currentPage, databasePerPage, databases],
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
		setOa(!login);
	}, [login]);

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
				{login ? (
					<FormControlLabel
						id="database-oa"
						className="text"
						control={
							<Switch
								value={oa}
								size="small"
								onClick={() => {
									setOa(!oa);
								}}
							/>
						}
						label={t("pages.database.oa")}
						labelPlacement="end"
					/>
				) : (
					<ColoredPaper
						id="database-anonymous"
						elevation={4}
						color={getHeaderBackgroundColor(theme)}
						border
					>
						{t("pages.database.anonymousMessage")}
					</ColoredPaper>
				)}

				<Stack direction="row" spacing={2}>
					<TextField
						fullWidth
						label={t("pages.database.searchDatabase")}
						value={nameFilter}
						onChange={handleSearchChange}
						autoComplete="off"
					/>
					<Select
						value={databasePerPage}
						onChange={(event) =>
							setDatabasePerPage(event.target.value as number)
						}
					>
						<MenuItem value={10}>10</MenuItem>
						<MenuItem value={25}>25</MenuItem>
						<MenuItem value={50}>50</MenuItem>
					</Select>
				</Stack>

				{isLoading ? (
					<Stack alignItems="center" spacing={5}>
						<CircularProgress />
					</Stack>
				) : (
					<>
						<DatabasePagination
							pageCount={pageCount}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
						/>
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
						/>
					</>
				)}
			</Stack>
		</div>
	);
};

function DatabasePagination({
	pageCount,
	currentPage,
	setCurrentPage,
}: {
	pageCount: number;
	currentPage: number;
	setCurrentPage: (value: number) => void;
}) {
	return (
		<Stack spacing={2} alignItems="flex-end">
			<Pagination
				count={pageCount}
				color="primary"
				page={currentPage}
				onChange={(_, value) => setCurrentPage(value)}
			/>
		</Stack>
	);
}

export default Database;
