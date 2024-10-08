import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useBibContext } from "../../../context/BibContext";
import { useTranslator } from "../../../shared/locales/I18N";

type MetadorePageHeaderProps = {
	totalHits: number;
};

export const MetadorePageHeader = ({ totalHits }: MetadorePageHeaderProps) => {
	const t = useTranslator();
	const { language } = useBibContext();
	return (
		<Stack direction="row" alignItems="center" justifyContent="space-between">
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
