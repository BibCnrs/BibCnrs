import {
	Card,
	CardActions,
	CardContent,
	Link,
	Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import BookmarkButton from "../../../components/element/button/BookmarkButton";
import { useLanguageKey, useTranslator } from "../../../shared/locales/I18N";
import type { MetadoreResultTitleType } from "../../../shared/types/data.types";
import { MetadoreTitle } from "./MetadoreTitle";

function MetadoreId({ id }: { id: number }) {
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

export const MetadoreCard = ({ metadore, setSelectedMetadore }) => {
	const t = useTranslator();
	const languageKey = useLanguageKey();

	// Get translated title and description if available
	const title = getTitle(metadore.titles, languageKey);
	const bookmarkTitle = `${metadore.type} - ${title}`;

	const handleSelectedItem = () => {
		setSelectedMetadore(metadore);
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
			aria-label={`metadore-title-${metadore.id}`}
			elevation={3}
		>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<MetadoreId id={metadore.id} />
			</Stack>
			<CardContent sx={{ flex: 1, paddingY: 0 }}>
				<MetadoreTitle title={title} href={metadore.url} type={metadore.type} />
				{metadore.doi && (
					<Typography variant="body1">
						{t("components.search.content.doiColon")} {metadore.doi}
					</Typography>
				)}
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
					{t("components.search.content.seeMore")}
				</Link>
			</CardContent>
			<CardActions sx={{ paddingTop: 0 }}>
				<BookmarkButton
					className="table-bookmark-button"
					title={bookmarkTitle}
					url={metadore.url}
					source="metadore"
				/>
			</CardActions>
		</Card>
	);
};
