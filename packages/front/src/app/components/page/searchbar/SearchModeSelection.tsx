import type { Theme } from "@mui/material";
import Button from "@mui/material/Button";
import { Stack, type SxProps } from "@mui/system";
import { memo } from "react";
import { NavLink } from "react-router-dom";
import { useBibContext } from "../../../context/BibContext";
import {
	RouteArticle,
	RouteDatabase,
	RouteMetadore,
	RoutePublication,
	useClickHandler,
} from "../../../shared/Routes";
import { useTranslator } from "../../../shared/locales/I18N";

const buttonStyles: SxProps<Theme> = {
	background: (theme) => theme.palette.background.default,
	color: (theme) => theme.palette.text.primary,
	paddingX: "20px",
	borderRadius: "20px",
	width: "220px",
	textTransform: "none",
	fontWeight: "900",
	fontSize: "1rem",
	":hover": {
		backgroundColor: (theme) => theme.palette.secondary.main,
		color: (theme) => theme.palette.secondary.contrastText,
	},
	"&.active": {
		backgroundColor: (theme) => theme.palette.secondary.main,
		color: (theme) => theme.palette.secondary.contrastText,
	},
};

/**
 * Nav bar component used to navigate between: "Article", "Journal, book", "Database" and "Research data"
 */
const SearchModeSelection = () => {
	// Get translation function
	const t = useTranslator();
	const { theme } = useBibContext();

	// Button action handler
	const article = useClickHandler(RouteArticle);
	const publication = useClickHandler(RoutePublication);
	const database = useClickHandler(RouteDatabase);
	const researchData = useClickHandler(RouteMetadore);

	return (
		<Stack direction={{ xs: "column", md: "row" }} gap={3}>
			<Button component={NavLink} to={article.href} sx={buttonStyles}>
				{t("components.nav.article")}
			</Button>
			<Button component={NavLink} to={publication.href} sx={buttonStyles}>
				{t("components.nav.publication")}
			</Button>
			<Button to={database.href} component={NavLink} sx={buttonStyles}>
				{t("components.nav.database")}
			</Button>
			<Button to={researchData.href} component={NavLink} sx={buttonStyles}>
				{t("components.nav.researchData")}
			</Button>
		</Stack>
	);
};

export default memo(SearchModeSelection);
