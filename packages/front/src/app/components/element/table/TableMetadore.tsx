import "./scss/TableList.scss";
import { Link, Typography } from "@mui/material";
import { memo } from "react";
import { useBibContext } from "../../../context/BibContext";
import { useLanguageKey, useTranslator } from "../../../shared/locales/I18N";
import type {
	MetadoreResultDescriptionType,
	MetadoreResultTitleType,
	MetadoreResultType,
} from "../../../shared/types/data.types";
import type { SearchResultsElementProps } from "../../page/search/SearchResults";
import BookmarkButton from "../button/BookmarkButton";
import OpenablePaper from "../paper/OpenablePaper";

/**
 * Function used to get the translated title if available
 * @param titles Array of titles
 * @param langKey Language key
 * @return Translated title if found, or first if not found
 */
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

/**
 * Function used to get the translated description if available
 * @param descriptions Array of descriptions
 * @param langKey Language key
 * @return Translated description if found, first if not found, or undefined as fallback if descriptions are empty
 */
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

function MetadoreId({ id }: { id: number }) {
	return (
		<Typography
			component="div"
			sx={{
				width: "34px",
				height: "34px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				fontSize: "1.2rem",
				fontWeight: 700,
			}}
		>
			{id}
		</Typography>
	);
}

/**
 * Table Metadore display component, this component is used to display Metadore results
 * @param data Component parameter containing the data to display
 * @see TableDisplayElementProps
 */
const TableMetadore = ({
	data,
}: SearchResultsElementProps<MetadoreResultType>) => {
	// Get translation function and language key
	const t = useTranslator();
	const languageKey = useLanguageKey();
	const {
		session: { user },
	} = useBibContext();

	// Get translated title and description if available
	const title = getTitle(data.titles, languageKey);
	const description = getDescription(data.descriptions, languageKey);
	const bookmarkTitle = `${data.type} - ${title}`;

	return (
		<div className={user ? "table-bookmark-size" : undefined}>
			<OpenablePaper
				title={
					<Link
						className="table-list-title link"
						href={data.url}
						target="_blank"
						rel="noopener noreferrer nofollow"
						sx={{
							textDecoration: "none",
							textTransform: "none",
						}}
					>
						{title} [{data.type}]
					</Link>
				}
				leftAction={<MetadoreId id={data.id} />}
				summary={
					<div className="table-list-body">
						{t("components.table.content.doiColon")}
						{data.doi}
					</div>
				}
				content={
					<Typography component="dl">
						<Typography component="dt" variant="subtitle1">
							{t("components.table.content.doi")}
						</Typography>
						<Typography component="dd" sx={{ marginInlineStart: "40px" }}>
							{data.doi}
						</Typography>
						<Typography component="dt" variant="subtitle1">
							{t("components.table.content.type")}
						</Typography>
						<Typography component="dd" sx={{ marginInlineStart: "40px" }}>
							{data.type}
						</Typography>
						<Typography component="dt" variant="subtitle1">
							{t("components.table.content.publicationYear")}
						</Typography>
						<Typography component="dd" sx={{ marginInlineStart: "40px" }}>
							{data.publicationYear}
						</Typography>
						{/* Show description if available */}
						{description ? (
							<>
								<Typography component="dt" variant="subtitle1">
									{t("components.table.content.description")}
								</Typography>
								<Typography component="dd" sx={{ marginInlineStart: "40px" }}>
									{description}
								</Typography>
							</>
						) : null}
						{/* Show subjects if available */}
						{data.subjects.length !== 0 ? (
							<>
								<Typography component="dt" variant="subtitle1">
									{t("components.table.content.subjects")}
								</Typography>
								<Typography component="dd" sx={{ marginInlineStart: "40px" }}>
									{data.subjects.join(", ")}
								</Typography>
							</>
						) : null}
					</Typography>
				}
				rightAction={
					user ? (
						<BookmarkButton
							className="table-bookmark-button"
							title={bookmarkTitle}
							url={data.url}
						/>
					) : null
				}
			/>
		</div>
	);
};

export default memo(TableMetadore);
