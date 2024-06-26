import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Button, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Stack } from "@mui/system";
import { type ChangeEvent, useContext } from "react";
import { useTranslator } from "../../../shared/locales/I18N";
import { ArticleContext } from "./ArticlePage";

type ArticlePageHeaderProps = {
	totalHits: number;
	orderBy: string;
	handleDownload: (format: string) => void;
	handleSelectAll: (
		event: ChangeEvent<HTMLInputElement>,
		checked: boolean,
	) => void;
	handleOrderChange: (event) => void;
};

export const ArticlePageHeader = ({
	totalHits,
	orderBy,
	handleDownload,
	handleSelectAll,
	handleOrderChange,
}: ArticlePageHeaderProps) => {
	const t = useTranslator();
	const { exports, setExports } = useContext(ArticleContext);
	return (
		<Stack direction="row" alignItems="center" justifyContent="space-between">
			<Typography fontWeight="bold">
				{totalHits}{" "}
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
				{exports.length !== 0 ? (
					<>
						<Button
							color="primary"
							variant="contained"
							sx={{ paddingLeft: 1, paddingRight: 2 }}
							className="article-action-element"
							onClick={() => {
								handleDownload("bibtex");
							}}
						>
							<SaveAltIcon sx={{ marginRight: 1 }} />
							BIBTEX
						</Button>
						<Button
							variant="contained"
							sx={{ paddingLeft: 1, paddingRight: 2 }}
							className="article-action-element"
							onClick={() => {
								handleDownload("ris");
							}}
						>
							<SaveAltIcon sx={{ marginRight: 1 }} />
							RIS
						</Button>
					</>
				) : null}
				<FormControlLabel
					sx={{ marginLeft: 2 }}
					control={<Checkbox onChange={handleSelectAll} />}
					label={t("pages.article.selectAll")}
				/>
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
