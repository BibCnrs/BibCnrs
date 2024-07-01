import { Link, Typography } from "@mui/material";
import { useTranslator } from "../../../shared/locales/I18N";

export const MetadoreTitle = ({ title, href, type }) => {
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
					? t("components.search.content.links", { title })
					: t("components.search.content.noAccess", { title })
			}
		>
			{title} {type ? `[${type}]` : null}
			{!href ? <i> ({t("components.search.content.noAccess")})</i> : null}
		</Typography>
	);
};
