import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useLanguageKey, useTranslator } from "../../../shared/locales/I18N";

type PublicationPageHeaderProps = {
	totalHits: number;
};

export const PublicationPageHeader = ({
	totalHits,
}: PublicationPageHeaderProps) => {
	const t = useTranslator();
	const language = useLanguageKey();
	return (
		<Stack
			direction="row"
			alignItems="center"
			justifyContent="space-between"
			sx={{
				height: "42px",
			}}
		>
			<Typography fontWeight="bold">
				{new Intl.NumberFormat(language === "fr" ? "fr-FR" : "en-US").format(
					totalHits,
				)}{" "}
				{t("components.search.content.result", {
					count: totalHits,
				})}
			</Typography>
		</Stack>
	);
};
