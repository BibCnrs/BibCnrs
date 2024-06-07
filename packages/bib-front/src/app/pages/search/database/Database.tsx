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
import DatabaseDisplayGroup from "../../../components/page/render/DatabaseDisplayGroup";
import { database } from "../../../services/search/Database";
import {
	useDomain,
	useFacetsDomainHandler,
	useServicesCatch,
} from "../../../shared/hook";
import { useLanguageKey, useTranslator } from "../../../shared/locales/I18N";
import type { DatabaseDataType } from "../../../shared/types/data.types";
import "./Database.scss";
import { CircularProgress, TextField } from "@mui/material";
import { Stack } from "@mui/system";

const Database = () => {
	const { login, theme, search } = useContext(BibContext);
	const serviceCatch = useServicesCatch();
	const [oa, setOa] = useState(!login);
	const t = useTranslator();
	const language = useLanguageKey();

	const handleDomain = useFacetsDomainHandler();
	const domains = useDomain();

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

	const databases = useMemo(
		() =>
			data
				?.map((value) => {
					const name = language === "en" ? value.name_en : value.name_fr;
					return {
						...value,
						name,
						upperName: name.toLocaleUpperCase(),
					};
				})
				?.filter((value) =>
					nameFilter ? value.upperName?.includes(nameFilter) : value.upperName,
				) ?? [],
		[data, language, nameFilter],
	);

	const letters = useMemo(
		() => [...new Set(databases.map<string>((value) => value.upperName.at(0)))],
		[databases],
	);

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

				<TextField
					fullWidth
					label={t("pages.database.searchDatabase")}
					value={nameFilter}
					onChange={handleSearchChange}
					autoComplete="off"
				/>

				{isLoading ? (
					<Stack alignItems="center" spacing={5}>
						<CircularProgress />
					</Stack>
				) : (
					<ul id="database">
						{letters.map((letter) => (
							<li key={letter} className="database-letter">
								<span className="database-letter-header">{letter}</span>
								<DatabaseDisplayGroup
									letter={letter}
									data={databases}
									language={language}
								/>
							</li>
						))}
					</ul>
				)}
			</Stack>
		</div>
	);
};

export default Database;
