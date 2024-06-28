import { Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import OpenAccess from "../../../components/element/icon/OpenAccess";
import { useTranslator } from "../../../shared/locales/I18N";

export const ArticleTitle = ({ title, href, openAccess, type }) => {
	const t = useTranslator();

	return (
		<Typography
			component={Link}
			variant="h4"
			sx={{
				fontSize: 20,
				display: "block",
				minHeight: "34px",
				color: (theme) => theme.palette.primary.main,
				fontWeight: 700,
				cursor: "pointer",
				mb: 2,
			}}
			underline={href ? "hover" : "none"}
			href={href ?? undefined}
			target="_blank"
			rel="noreferrer noopener nofollow"
			aria-label={
				href
					? t("components.table.content.links", { title })
					: t("components.table.content.noAccess", { title })
			}
		>
			{openAccess && href ? (
				<Box
					mr={1}
					display="inline-block"
					aria-label={t("components.search.content.openAccess")}
				>
					<OpenAccess />
				</Box>
			) : null}
			{title} {type ? `[${type}]` : null}
			{!href ? <i> ({t("components.search.content.noAccess")})</i> : null}
		</Typography>
	);
};
