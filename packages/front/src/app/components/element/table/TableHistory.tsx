import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FormControlLabel from "@mui/material/FormControlLabel";
import { memo, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HistoryContext } from "../../../pages/user/history/History";
import { RouteArticle, updatePageQueryUrl } from "../../../shared/Routes";
import { useLanguageKey, useTranslator } from "../../../shared/locales/I18N";
import type {
	ArticleFacetsKeyDataType,
	HistoryEntryDataType,
	HistoryEntryFacetsDataType,
	HistoryEntryLimiterDataType,
} from "../../../shared/types/data.types";
import AlertModification from "../dialog/AlertModification";
import "./scss/TableHistory.scss";
import { Button } from "@mui/material";
import { useBibContext } from "../../../context/BibContext";
import type { SearchResultsElementProps } from "../../page/search/SearchResults";
import type { FacetEntry } from "../../page/search/facet/Facet.type";

const Limiters = ({ data }: { data: HistoryEntryLimiterDataType }) => {
	const t = useTranslator();
	return (
		<ul style={{ margin: 0 }}>
			{data.fullText ? (
				<li>
					<b>{t("ebsco.limiters.fullText")}</b>
				</li>
			) : null}
			{data.openAccess ? (
				<li>
					<b>{t("ebsco.limiters.openAccess")}</b>
				</li>
			) : null}
			{data.peerReviewedArticle ? (
				<li>
					<b>{t("ebsco.limiters.peerReviewedArticle")}</b>
				</li>
			) : null}
			{data.publicationDate.from ? (
				<li>
					<b>{t("ebsco.limiters.publicationDate")}</b>
					<ul style={{ margin: 0 }}>
						<li>
							<i>
								{data.publicationDate.from}
								<b>{" → "}</b>
								{data.publicationDate.to}
							</i>
						</li>
					</ul>
				</li>
			) : null}
		</ul>
	);
};
const Facets = ({ data }: { data: HistoryEntryFacetsDataType }) => {
	const t = useTranslator();
	if (!data) {
		return null;
	}
	const keys = Object.keys(data) as ArticleFacetsKeyDataType[];
	return (
		<>
			{keys.map((key) => (
				<div key={key}>
					<b>{t(`ebsco.facets.${key}`)}</b>
					<ul style={{ margin: 0 }}>
						{data[key].map((facets) => (
							<li key={facets}>
								<i>{facets}</i>
							</li>
						))}
					</ul>
				</div>
			))}
		</>
	);
};

const BellIcon = ({
	hasAlert,
	active,
}: Pick<HistoryEntryDataType, "active" | "hasAlert">) => {
	if (hasAlert && !active) {
		return <NotificationsOffIcon />;
	}

	if (hasAlert && active) {
		return <NotificationsActiveIcon />;
	}

	return <NotificationAddIcon />;
};

const convertFacet = (array: string[]): FacetEntry[] => {
	return array.map<FacetEntry>((value) => {
		return {
			name: value,
			count: 0,
		};
	});
};

// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
const createParam = (event: HistoryEntryDataType["event"]): any => {
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	const param: any = {
		q: event.queries[0].term,
		limiters: {
			fullText: event.limiters.fullText,
			openAccess: event.limiters.openAccess,
			reviewed: event.limiters.peerReviewed,
		},
		orderBy: event.sort,
		page: 1,
		perPage: event.resultPerPage ?? 20,
	};

	if (
		event.limiters.publicationDate.from &&
		event.limiters.publicationDate.to
	) {
		param.limiters = {
			...param.limiters,
			dateRange: {
				from: event.limiters.publicationDate.from,
				to: event.limiters.publicationDate.to,
			},
		};
	}

	if (event.activeFacets) {
		param.facets = {};
		if (event.activeFacets.SourceType) {
			param.facets.source = convertFacet(event.activeFacets.SourceType);
		}
		if (event.activeFacets.SubjectEDS) {
			param.facets.subject = convertFacet(event.activeFacets.SubjectEDS);
		}
		if (event.activeFacets.Journal) {
			param.facets.journal = convertFacet(event.activeFacets.Journal);
		}
		if (event.activeFacets.Language) {
			param.facets.language = convertFacet(event.activeFacets.Language);
		}
		if (event.activeFacets.RangeLexile) {
			param.facets.lexile = convertFacet(event.activeFacets.RangeLexile);
		}
		if (event.activeFacets.CollectionLibrary) {
			param.facets.collection = convertFacet(
				event.activeFacets.CollectionLibrary,
			);
		}
		if (event.activeFacets.Publisher) {
			param.facets.publisher = convertFacet(event.activeFacets.Publisher);
		}
		if (event.activeFacets.ContentProvider) {
			param.facets.provider = convertFacet(event.activeFacets.ContentProvider);
		}
	}
	return {
		...param,
		facets: JSON.stringify(param.facets),
		limiters: JSON.stringify(param.limiters),
	};
};

const TableHistory = ({
	data,
	first,
	last,
	index,
}: SearchResultsElementProps<HistoryEntryDataType>) => {
	const t = useTranslator();
	const language = useLanguageKey();
	const navigate = useNavigate();
	const { theme, search, setSearch } = useBibContext();
	const { handleDeleteEntry } = useContext(HistoryContext);

	const [open, setOpen] = useState(false);

	const themedClassName = useMemo(() => {
		let className = "table-history";
		if (theme === "light") {
			if (index % 2 === 0) {
				className += " table-history-grey";
			}
		} else {
			className += " table-history-dark";
			if (index % 2 === 0) {
				className += " table-history-grey-dark";
			}
		}
		if (last) {
			className += " table-history-last";
		}
		return className;
	}, [index, last, theme]);

	const alertText = useMemo(() => {
		if (data.hasAlert && data.active) {
			return t(`components.search.content.alert.active.${data.frequence}`);
		}

		return "";
	}, [data.active, data.frequence, data.hasAlert, t]);

	const handleSearch = () => {
		setSearch({
			...search,
			domain: data.event.domain,
		});
		updatePageQueryUrl(RouteArticle, navigate, createParam(data.event));
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			{first ? (
				<div className="table-history table-history-first">
					<div className="table-history-box">
						<b>{t("components.search.content.term")}</b>
					</div>
					<div className="table-history-box">
						<b>{t("components.search.content.domain")}</b>
					</div>
					<div className="table-history-box">
						<b>{t("components.search.content.limiters")}</b>
					</div>
					<div className="table-history-box">
						<b>{t("components.search.content.facets")}</b>
					</div>
					<div className="table-history-box">
						<b>{t("components.search.content.actions")}</b>
					</div>
				</div>
			) : null}
			<div className={themedClassName}>
				<div className="table-history-box">
					<b>{data.event.queries[0].term}</b>
				</div>
				<div className="table-history-box">
					<b>{t(`components.domains.${data.event.domain}`)}</b>
				</div>
				<div className="table-history-box">
					<Limiters data={data.event.limiters} />
				</div>
				<div className="table-history-box">
					<Facets data={data.event.activeFacets} />
				</div>
				<div className="table-history-box">
					<ul style={{ margin: 0 }}>
						<li>
							<b>{t("components.search.content.nbResult")}</b>
							{` ${new Intl.NumberFormat(language === "fr" ? "fr-FR" : "en-US").format(data.event.totalHits ?? data.nb_results)}`}
						</li>
					</ul>
					<div className="table-history-box-actions-buttons">
						<Button
							className="table-history-box-actions-button"
							size="small"
							onClick={() => {
								handleDeleteEntry(data.id);
							}}
							aria-label={t("components.history.delete", {
								term: data.event.queries[0].term,
							})}
						>
							<DeleteOutlineIcon />
						</Button>
						<Button
							className="table-history-box-actions-button"
							size="small"
							onClick={handleSearch}
							aria-label={t("components.history.search", {
								term: data.event.queries[0].term,
							})}
						>
							<OpenInNewIcon />
						</Button>
						<FormControlLabel
							sx={{
								marginLeft: "0",
							}}
							control={
								<Button
									className="table-history-box-actions-button"
									size="small"
									onClick={handleOpen}
									aria-label={t("components.history.alert", {
										term: data.event.queries[0].term,
									})}
								>
									<BellIcon hasAlert={data.hasAlert} active={data.active} />
								</Button>
							}
							label={alertText}
						/>
						<AlertModification data={data} open={open} onClose={handleClose} />
					</div>
				</div>
			</div>
		</>
	);
};

export default memo(TableHistory);
