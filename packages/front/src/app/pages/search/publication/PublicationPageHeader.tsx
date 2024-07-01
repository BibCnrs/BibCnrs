import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useTranslator } from "../../../shared/locales/I18N";

type ArticlePageHeaderProps = {
	totalHits: number;
};

export const PublicationPageHeader = ({
	totalHits,
}: ArticlePageHeaderProps) => {
	const t = useTranslator();
	return (
		<Stack direction="row" alignItems="center" justifyContent="space-between">
			<Typography fontWeight="bold">
				{totalHits}{" "}
				{t("components.search.content.result", {
					count: totalHits,
				})}
			</Typography>
		</Stack>
	);
};
