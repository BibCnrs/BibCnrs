import { Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Stack } from "@mui/system";
import { useBibContext } from "../../../context/BibContext";
import { useTranslator } from "../../../shared/locales/I18N";

type ArticlePageHeaderProps = {
	totalHits: number;
	orderBy: string;
	handleOrderChange: (event) => void;
};

export const ArticlePageHeader = ({
	totalHits,
	orderBy,
	handleOrderChange,
}: ArticlePageHeaderProps) => {
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
			<Stack
				direction="row"
				component={FormControl}
				id="article-action"
				size="small"
				gap={1}
			>
				<Select
					className="article-action-element"
					value={orderBy}
					onChange={handleOrderChange}
					displayEmpty
				>
					<MenuItem value="date_asc">
						{t("pages.article.order.dateAsc")}
					</MenuItem>
					<MenuItem value="date_desc">
						{t("pages.article.order.dateDesc")}
					</MenuItem>
					<MenuItem value="relevance">
						{t("pages.article.order.relevance")}
					</MenuItem>
				</Select>
			</Stack>
		</Stack>
	);
};
