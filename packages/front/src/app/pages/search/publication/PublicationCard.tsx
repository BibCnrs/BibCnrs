import {
	Card,
	CardActions,
	CardContent,
	Link,
	Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import BookmarkButton from "../../../components/element/button/BookmarkButton";
import { useBibContext } from "../../../context/BibContext";
import { useTranslator } from "../../../shared/locales/I18N";
import type {
	PublicationCoverageDataType,
	PublicationHolding,
} from "../../../shared/types/data.types";
import { PublicationTitle, isOpenAccessLink } from "./PublicationTitle";
import { getPrioritizedLink } from "./prioritizeLinksAlgo";

function PublicationId({ id }: { id: number }) {
	return (
		<Typography
			component="div"
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				fontSize: "1rem",
				fontWeight: 700,
			}}
		>
			{id}
		</Typography>
	);
}

export const PublicationCard = ({ publication, setSelectedPublication }) => {
	const t = useTranslator();
	const {
		session: { user },
		showLoginModal,
	} = useBibContext();

	const {
		fullTextHoldings,
		title,
		issnOnline,
		issnPrint,
		isbnOnline,
		isbnPrint,
		id,
	} = publication;

	// TODO: Remove this when other is testing. This use the original algorithm
	// const reconciledFullTextHoldings = parseFullTextHoldings(
	// 	fullTextHoldings,
	// ) as PublicationHolding[];

	const reconciledFullTextHoldings = getPrioritizedLink(
		fullTextHoldings,
	) as PublicationHolding[];

	const getCoverage = (coverage: PublicationCoverageDataType) => {
		let coverageString = "";
		try {
			coverage.forEach((value) => {
				const start = new Date(
					Number.parseInt(value.start.year, 10),
					Number.parseInt(value.start.month, 10) - 1,
					Number.parseInt(value.start.day, 10),
				);
				const end = new Date(
					Number.parseInt(value.end.year, 10),
					Number.parseInt(value.end.month, 10) - 1,
					Number.parseInt(value.end.day, 10),
				);
				if (coverageString !== "") {
					coverageString += ", ";
				}
				coverageString += `${start.toLocaleDateString()} - ${
					end.getFullYear() > new Date().getFullYear()
						? t("components.search.content.present")
						: end.toLocaleDateString()
				}`;
			});
		} catch (e) {
			console.error(e);
		}
		return coverageString;
	};

	if (reconciledFullTextHoldings.length === 0) {
		return null;
	}

	const isOpenAccess = reconciledFullTextHoldings.every(isOpenAccessLink);
	const href = reconciledFullTextHoldings[0].url;
	const bookmarkTitle = `${title} - ${reconciledFullTextHoldings[0].name}`;

	const getTitleCoverage = () => {
		if (reconciledFullTextHoldings.length > 1) {
			return null;
		}
		let reconciledFullTextHoldingString = getCoverage(
			reconciledFullTextHoldings[0].coverage,
		);
		reconciledFullTextHoldingString +=
			reconciledFullTextHoldings.length < 2 &&
			reconciledFullTextHoldings[0].embargo
				? ` (embargo: ${reconciledFullTextHoldings[0].embargo.value} ${reconciledFullTextHoldings[0].embargo.unit})`
				: "";
		return `${reconciledFullTextHoldingString}`;
	};

	const handleSelectedItem = () => {
		if (!isOpenAccess && !user) {
			return showLoginModal();
		}

		setSelectedPublication(publication);
	};

	return (
		<Card
			sx={{
				display: "flex",
				alignItems: "flex-start",
				p: 2,
				backgroundColor: (theme) => theme.palette.info.light,
				border: 0,
				minHeight: "100%",
			}}
			aria-label={`publication-title-${id}`}
			elevation={3}
		>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<PublicationId id={id} />
			</Stack>
			<CardContent sx={{ flex: 1, paddingY: 0 }}>
				<PublicationTitle
					reconciledFullTextHoldings={reconciledFullTextHoldings}
					titleCoverage={getTitleCoverage()}
					publication={publication}
					getCoverage={getCoverage}
				/>
				{issnOnline && issnOnline.length > 0 ? (
					<Typography variant="body1">
						{t("components.search.content.issnOnline") /* eISSN */}
						{issnOnline.join(", ")}
					</Typography>
				) : null}
				{issnPrint && issnPrint.length > 0 ? (
					<Typography variant="body1">
						{t("components.search.content.issnPrint") /* pISSN */}
						{issnPrint.join(", ")}
					</Typography>
				) : null}
				{isbnOnline && isbnOnline.length > 0 ? (
					<Typography variant="body1">
						{t("components.search.content.isbnOnline") /* eISBN */}
						{isbnOnline.join(", ")}
					</Typography>
				) : null}
				{isbnPrint && isbnPrint.length > 0 ? (
					<Typography variant="body1">
						{t("components.search.content.isbnPrint") /* pISBN */}
						{isbnPrint.join(", ")}
					</Typography>
				) : null}
				<Link
					component="button"
					variant="body1"
					sx={{
						mt: 2,
						textDecoration: "none",
						fontWeight: 700,
						color: (theme) => theme.palette.text.primary,
						": hover": {
							color: (theme) => theme.palette.primary.main,
						},
					}}
					onClick={handleSelectedItem}
					aria-label={t("components.search.content.seeMoreAbout", { title })}
				>
					{t("components.search.content.seeMore", { title })}
				</Link>
			</CardContent>
			<CardActions sx={{ paddingTop: 0 }}>
				{reconciledFullTextHoldings.length < 2 && (
					<BookmarkButton
						className="table-bookmark-button"
						title={bookmarkTitle}
						url={href}
						aria-label={t("components.search.content.bookmark", { title })}
						source="publication"
					/>
				)}
			</CardActions>
		</Card>
	);
};
