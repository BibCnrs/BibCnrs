import CloseIcon from "@mui/icons-material/Close";
import { Chip, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import BookmarkButton from "../../../components/element/button/BookmarkButton";
import { useBibContext } from "../../../context/BibContext";
import { useTranslator } from "../../../shared/locales/I18N";
import type {
	MetadoreResultDescriptionType,
	MetadoreResultTitleType,
} from "../../../shared/types/data.types";
import { MetadoreTitle } from "./MetadoreTitle";

const getTitle = (
	titles: MetadoreResultTitleType[],
	langKey: string,
): string => {
	for (const title of titles) {
		if (title.lang === langKey) {
			return title.title;
		}
	}
	return titles[0].title;
};

const getDescription = (
	descriptions: MetadoreResultDescriptionType[],
	langKey: string,
): string | undefined => {
	if (descriptions.length === 0) {
		return undefined;
	}
	for (const description of descriptions) {
		if (
			description.lang === langKey &&
			description.descriptionType === "Abstract"
		) {
			return description.description;
		}
	}
	for (const description of descriptions) {
		if (description.descriptionType === "Abstract") {
			return description.description;
		}
	}
	return descriptions[0].description;
};

export const MetadoreSidebar = ({ metadore, onClose }) => {
	const t = useTranslator();
	const { language } = useBibContext();

	const title = getTitle(metadore.titles, language);
	const description = getDescription(metadore.descriptions, language);
	const bookmarkTitle = `${metadore.type} - ${title}`;

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
					<Chip label="Metadore" color="secondary" />
					<Box display="flex" alignItems="center" gap={1}>
						<BookmarkButton
							className="table-bookmark-button"
							title={bookmarkTitle}
							url={metadore.url}
							aria-label={t("components.search.content.bookmark", { title })}
							source="metadore"
						/>
						<IconButton aria-label="close" onClick={onClose}>
							<CloseIcon />
						</IconButton>
					</Box>
				</Stack>
				<MetadoreTitle title={title} href={metadore.url} type={metadore.type} />
				<Stack gap={1}>
					<Typography variant="subtitle1" fontWeight="bold">
						{t("components.search.content.doi")}
					</Typography>
					<Typography variant="body1">{metadore.doi}</Typography>
				</Stack>
				<Stack gap={1}>
					<Typography variant="subtitle1" fontWeight="bold">
						{t("components.search.content.type")}
					</Typography>
					<Typography variant="body1">{metadore.type}</Typography>
				</Stack>
				<Stack gap={1}>
					<Typography variant="subtitle1" fontWeight="bold">
						{t("components.search.content.publicationYear")}
					</Typography>
					<Typography variant="body1">{metadore.publicationYear}</Typography>
				</Stack>
				{description && (
					<Stack gap={1}>
						<Typography variant="subtitle1" fontWeight="bold">
							{t("components.search.content.description")}
						</Typography>
						<Typography variant="body1">{description}</Typography>
					</Stack>
				)}
				{metadore.subjects?.length !== 0 && (
					<Stack gap={1}>
						<Typography variant="subtitle1" fontWeight="bold">
							{t("components.search.content.subjects")}
						</Typography>
						<Typography variant="body1">
							{metadore.subjects.join(", ")}
						</Typography>
					</Stack>
				)}
			</Stack>
		</Box>
	);
};
