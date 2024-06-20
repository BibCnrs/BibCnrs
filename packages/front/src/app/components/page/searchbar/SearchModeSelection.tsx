import type { Theme } from "@mui/material";
import Button from "@mui/material/Button";
import { Stack, type SxProps } from "@mui/system";
import { memo } from "react";
import { useBibContext } from "../../../context/BibContext";
import {
	RouteArticle,
	RouteDatabase,
	RoutePublication,
	RouteResearchData,
	RouteRoot,
	useClickHandler,
	useIsMatching,
} from "../../../shared/Routes";
import { useTranslator } from "../../../shared/locales/I18N";

const buttonStyles: SxProps<Theme> = {
	background: (theme) => theme.palette.background.default,
	color: (theme) => theme.palette.text.primary,
	paddingX: "20px",
	borderRadius: "20px",
	":hover": {
		backgroundColor: (theme) => theme.palette.secondary.main,
		color: (theme) => theme.palette.text.primary,
	},
};

/**
 * Nav bar component used to navigate between: "Article", "Journal, book", "Database" and "Research data"
 */
const SearchModeSelection = () => {
	// Get translation function
	const t = useTranslator();
	const { theme } = useBibContext();
	const getActiveDarkButtonId = () => {
		if (theme === "dark") {
			return "active-nav-button-dark";
		}
		return "active-nav-button";
	};

	// Button action handler
	const article = useClickHandler(RouteArticle);
	const publication = useClickHandler(RoutePublication);
	const database = useClickHandler(RouteDatabase);
	const researchData = useClickHandler(RouteResearchData);

	// Current route
	const articleMatch = !!useIsMatching(RouteArticle);
	const publicationMatch = !!useIsMatching(RoutePublication);
	const databaseMatch = !!useIsMatching(RouteDatabase);
	const researchDataMatch = !!useIsMatching(RouteResearchData);
	const rootMatch = !!useIsMatching(RouteRoot);
	const noneMatch =
		!articleMatch && !publicationMatch && !databaseMatch && !researchDataMatch;
	const disable = noneMatch && !rootMatch;

	return (
		<Stack direction="row" gap={3}>
			<Button
				id={articleMatch && !disable ? getActiveDarkButtonId() : ""}
				disabled={articleMatch ? !disable : false}
				onClick={article.handler}
				href={article.href}
				sx={buttonStyles}
			>
				{t("components.nav.article")}
			</Button>
			<Button
				id={publicationMatch ? getActiveDarkButtonId() : ""}
				disabled={publicationMatch}
				onClick={publication.handler}
				href={publication.href}
				sx={buttonStyles}
			>
				{t("components.nav.publication")}
			</Button>
			<Button
				id={databaseMatch ? getActiveDarkButtonId() : ""}
				disabled={databaseMatch}
				onClick={database.handler}
				href={database.href}
				sx={buttonStyles}
			>
				{t("components.nav.database")}
			</Button>
			<Button
				id={researchDataMatch ? getActiveDarkButtonId() : ""}
				disabled={researchDataMatch}
				onClick={researchData.handler}
				href={researchData.href}
				sx={buttonStyles}
			>
				{t("components.nav.researchData")}
			</Button>
		</Stack>
	);
};

export default memo(SearchModeSelection);
