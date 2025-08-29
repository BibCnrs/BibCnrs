import CloseIcon from "@mui/icons-material/Close";
import {
	Alert,
	Chip,
	IconButton,
	Link,
	Skeleton,
	Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import BookmarkButton from "../../../components/element/button/BookmarkButton";
import { useBibContext } from "../../../context/BibContext";
import { retrieve } from "../../../services/search/Publication";
import { useTranslator } from "../../../shared/locales/I18N";
import type {
	PublicationCoverageDataType,
	PublicationHolding,
	PublicationRetrieveDataType,
} from "../../../shared/types/data.types";
import { PublicationTitle } from "./PublicationTitle";
import { getPrioritizedLink } from "./prioritizeLinks";

export const PublicationSidebar = ({ publication, onClose }) => {
	const t = useTranslator();
	const { search } = useBibContext();

	const {
		data: dataRetrieve,
		isLoading,
		isError,
	} = useQuery<
		PublicationRetrieveDataType,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		any,
		PublicationRetrieveDataType,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		any
	>({
		queryKey: [
			"publication_retrieve",
			open,
			search.domain,
			publication.publicationId,
		],
		queryFn: async () => {
			if (open && search.domain) {
				return retrieve(search.domain, publication.publicationId);
			}
			return null;
		},
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	// const reconciledFullTextHoldings = parseFullTextHoldings(
	// 	publication.fullTextHoldings,
	// ) as PublicationHolding[];

	const reconciledFullTextHoldings = getPrioritizedLink(
		publication.fullTextHoldings,
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
				if (coverageString.includes("01/01/1789")) {
					coverageString = "";
				}
			});
		} catch (e) {
			console.error(e);
		}
		return coverageString;
	};

	if (reconciledFullTextHoldings.length === 0) {
		return null;
	}

	const href = reconciledFullTextHoldings[0].url;
	const bookmarkTitle = `${publication.title} - ${reconciledFullTextHoldings[0].name}`;

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

	return (
		<Box
			display="grid"
			gridTemplateColumns={{
				xs: "1fr",
			}}
			gap={10}
			maxWidth="80vw"
			padding={4}
			position="relative"
		>
			<Stack gap={2}>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Chip label="Publication" color="secondary" />
					<Box display="flex" alignItems="center" gap={1}>
						<BookmarkButton
							className="table-bookmark-button"
							title={bookmarkTitle}
							url={href}
							aria-label={t("components.search.content.bookmark", {
								title: publication.title,
							})}
							source="publication"
						/>
						<IconButton aria-label="close" onClick={onClose}>
							<CloseIcon />
						</IconButton>
					</Box>
				</Stack>
				<PublicationTitle
					reconciledFullTextHoldings={reconciledFullTextHoldings}
					titleCoverage={getTitleCoverage()}
					publication={publication}
					getCoverage={getCoverage}
				/>

				{isLoading && (
					<>
						<Skeleton />
						<Skeleton animation="wave" />
						<Skeleton animation="wave" />
						<Skeleton animation="wave" />
						<Skeleton animation="wave" />
						<Skeleton animation="wave" />
						<Skeleton animation="wave" />
						<Skeleton animation="wave" />
						<Skeleton animation="wave" />
					</>
				)}

				{isError && (
					<Alert severity="error">
						{t("components.search.content.failedFetch")}
					</Alert>
				)}

				{dataRetrieve?.items?.map((item) => {
					if (item.name.toLowerCase() === "title") {
						return null;
					}
					return (
						<Stack gap={1} key={item.label}>
							<Typography variant="subtitle1" fontWeight="bold">
								{t(`components.search.content.${item.label}`, {
									defaultValue: item.label,
									returnObjects: false,
								})}
							</Typography>
							<Typography variant="body1">
								{item.value.map((value, _) => (
									<Box key={value}>{value}</Box>
								))}
							</Typography>
						</Stack>
					);
				})}
				<Stack gap={1}>
					<Typography variant="subtitle1" fontWeight="bold">
						{t("components.search.content.AccessLink")}
					</Typography>
					<Typography variant="body1">
						{publication.fullTextHoldings.map((value) => (
							<Link
								key={value.name}
								href={value.url}
								target="_blank"
								rel="noreferrer nofollow noopener"
								sx={{ display: "block" }}
							>
								{value.name} {getCoverage(value.coverage)}{" "}
								{value.embargo
									? ` (embargo: ${value.embargo.value} ${value.embargo.unit})`
									: null}
							</Link>
						))}
					</Typography>
				</Stack>
			</Stack>
		</Box>
	);
};
