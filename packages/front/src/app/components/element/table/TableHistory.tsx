import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
	Button,
	Card,
	List,
	ListItem,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBibContext } from "../../../context/BibContext";
import { HistoryContext } from "../../../pages/user/history/History";
import { RouteArticle, updatePageQueryUrl } from "../../../shared/Routes";
import { useLanguageKey, useTranslator } from "../../../shared/locales/I18N";
import type {
	ArticleFacetsKeyDataType,
	HistoryEntryDataType,
	HistoryEntryFacetsDataType,
	HistoryEntryLimiterDataType,
} from "../../../shared/types/data.types";
import type { SearchResultsElementProps } from "../../page/search/SearchResults";
import type { FacetEntry } from "../../page/search/facet/Facet.type";
import AlertModification from "../dialog/AlertModification";

// Define keyframes for the shaky animation
const shakeAnimation = `
  @keyframes shake {
    0%, 100% {
      transform: rotate(0deg);
    }
    10%, 30%, 50%, 70%, 90% {
      transform: rotate(-10deg);
    }
    20%, 40%, 60%, 80% {
      transform: rotate(10deg);
    }
  }
`;

// Styled IconButton with shaky animation on hover
const ShakyButton = styled(Button)`
  ${shakeAnimation} // Include the keyframes in the component

  &:hover {
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  }
`;

const Limiters = ({ data }: { data: HistoryEntryLimiterDataType }) => {
	const t = useTranslator();
	return (
		<List
			sx={{
				"& li": {
					padding: 0,
				},
			}}
		>
			{data.fullText ? (
				<ListItem sx={{ fontStyle: "italic" }}>
					{t("ebsco.limiters.fullText")}
				</ListItem>
			) : null}
			{data.openAccess ? (
				<ListItem sx={{ fontStyle: "italic" }}>
					{t("ebsco.limiters.openAccess")}
				</ListItem>
			) : null}
			{data.peerReviewedArticle ? (
				<ListItem sx={{ fontStyle: "italic" }}>
					{t("ebsco.limiters.peerReviewedArticle")}
				</ListItem>
			) : null}
			{data.publicationDate.from ? (
				<ListItem>
					<Typography component="b" fontWeight={700}>
						{t("ebsco.limiters.publicationDate")}
					</Typography>
					<List style={{ margin: 0 }}>
						<ListItem>
							<Typography component="i">
								{data.publicationDate.from}
								<Typography component="b" fontWeight={700}>
									{" → "}
								</Typography>
								{data.publicationDate.to}
							</Typography>
						</ListItem>
					</List>
				</ListItem>
			) : null}
		</List>
	);
};
const Facets = ({ data }: { data: HistoryEntryFacetsDataType }) => {
	const t = useTranslator();
	const keys = Object.keys(data) as ArticleFacetsKeyDataType[];
	return (
		<Stack>
			{keys.map((key) => (
				<List key={key} sx={{ margin: 0 }}>
					<Typography component="b" fontWeight={700}>
						{t(`ebsco.facets.${key}`)}
					</Typography>

					<List style={{ margin: 0 }}>
						{data[key].map((facets) => (
							<ListItem key={facets}>
								<Typography component="i">{facets}</Typography>
							</ListItem>
						))}
					</List>
				</List>
			))}
		</Stack>
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
}: SearchResultsElementProps<HistoryEntryDataType>) => {
	const t = useTranslator();
	const language = useLanguageKey();
	const navigate = useNavigate();
	const { search, setSearch } = useBibContext();
	const { handleDeleteEntry } = useContext(HistoryContext);

	const [open, setOpen] = useState(false);

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
			{first && (
				<Box
					sx={{
						background: (theme) => theme.palette.background.default,
						position: "sticky",
						top: 0,
						padding: 4,
						paddingBottom: 1,
						zIndex: 5,
						gridTemplateColumns: "repeat(5, 1fr) 200px",
						border: (theme) => `2px ${theme.palette.background.default} solid`,
						marginBottom: -4,
						marginLeft: -2,
						marginRight: -2,
						display: { xs: "none", lg: "grid" },
					}}
				>
					<Typography component="b" fontWeight={700}>
						{t("components.search.content.term")}
					</Typography>
					<Typography component="b" fontWeight={700}>
						{t("components.search.content.domain")}
					</Typography>
					<Typography component="b" fontWeight={700}>
						{t("components.search.content.limiters")}
					</Typography>
					<Typography component="b" fontWeight={700}>
						{t("components.search.content.facets")}
					</Typography>
					<Typography component="b" fontWeight={700}>
						{t("components.search.content.nbResult").replace(":", "")}
					</Typography>
					<Typography component="b" fontWeight={700}>
						{t("components.search.content.actions")}
					</Typography>
				</Box>
			)}
			<Card
				sx={{
					minHeight: 0,
					padding: 2,
					display: "grid",
					gridTemplateColumns: { xs: "1fr", lg: "repeat(5, 1fr) 200px" },
					gap: 2,
					"& ul": {
						margin: 0,
						padding: 0,
						display: "flex",
						gap: 0.5,
						flexDirection: "column",
					},
					"& li": {
						paddingTop: 0,
						paddingBottom: 0,
					},
				}}
			>
				<Typography
					component="b"
					fontWeight={700}
					sx={{
						display: { sx: "flex", lg: "none" },
					}}
				>
					{t("components.search.content.term")}
				</Typography>
				<Typography>{data.event.queries[0].term}</Typography>

				<Typography
					component="b"
					fontWeight={700}
					sx={{
						display: { sx: "flex", lg: "none" },
					}}
				>
					{t("components.search.content.domain")}
				</Typography>
				<Typography>{t(`components.domains.${data.event.domain}`)}</Typography>

				<Typography
					component="b"
					fontWeight={700}
					sx={{
						display: { sx: "flex", lg: "none" },
					}}
				>
					{t("components.search.content.limiters")}
				</Typography>
				<Limiters data={data.event.limiters} />

				<Typography
					component="b"
					fontWeight={700}
					sx={{
						display: { sx: "flex", lg: "none" },
					}}
				>
					{t("components.search.content.facets")}
				</Typography>
				<Facets data={data.event.activeFacets} />

				<Typography
					component="b"
					fontWeight={700}
					sx={{
						display: { sx: "flex", lg: "none" },
					}}
				>
					{t("components.search.content.nbResult").replace(":", "")}
				</Typography>
				<Typography>
					{` ${new Intl.NumberFormat(language === "fr" ? "fr-FR" : "en-US").format(data.event.totalHits ?? data.nb_results)}`}
				</Typography>

				<Typography
					component="b"
					fontWeight={700}
					sx={{
						display: { sx: "flex", lg: "none" },
					}}
				>
					{t("components.search.content.actions")}
				</Typography>
				<Stack
					sx={{
						fontWeight: 700,
						flexDirection: "row",
						gap: 0.5,
						alignItems: "flex-start",
					}}
				>
					<Tooltip title={alertText} arrow>
						<Button
							className="table-history-box-actions-button"
							size="small"
							onClick={handleOpen}
							aria-label={t("components.history.alert", {
								term: data.event.queries[0].term,
							})}
							variant="contained"
						>
							<BellIcon hasAlert={data.hasAlert} active={data.active} />
						</Button>
					</Tooltip>

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

					<ShakyButton
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
					</ShakyButton>

					<AlertModification data={data} open={open} onClose={handleClose} />
				</Stack>
			</Card>
		</>
	);
};

export default TableHistory;
