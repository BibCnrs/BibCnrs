import {
	Card,
	CardActions,
	CardContent,
	Link,
	Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import BookmarkButton from "../../../components/element/button/BookmarkButton";
import ExportArticleCheckbox from "../../../components/element/button/ExportArticleCheckbox";
import { useBibContext } from "../../../context/BibContext";
import { ArticleContentGetter } from "../../../services/search/Article";
import { useTranslator } from "../../../shared/locales/I18N";
import { ArticleTitle } from "./ArticleTitle";

function IdArticle({ id }: { id: number }) {
	return (
		<Typography
			component="div"
			sx={{
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

export const ArticleCard = ({ article, setSelectedArticle }) => {
	const t = useTranslator();
	const [getterArticle, _] = useState(new ArticleContentGetter(article, null));
	const { search } = useBibContext();

	const title = getterArticle.getTitle();
	const authors = getterArticle.getAuthors();
	const doi = getterArticle.getDOI();
	const source = getterArticle.getSource();
	const href = getterArticle.proxify(getterArticle.getHref(), search.domain);
	const openAccess = getterArticle.isOpenAccess();

	return (
		<Card
			sx={{
				display: "flex",
				alignItems: "flex-start",
				p: 2,
				backgroundColor: (theme) => theme.palette.info.light,
				border: 0,
				minHeight: "100%",
			}}
			aria-label={`article-title-${getterArticle.getId()}`}
		>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<ExportArticleCheckbox getter={getterArticle} />
				<IdArticle id={getterArticle.getId()} />
			</Stack>
			<CardContent sx={{ flex: 1, paddingY: 0 }}>
				<ArticleTitle
					title={title}
					href={href}
					openAccess={openAccess}
					type={getterArticle.getType()}
				/>
				{authors && (
					<Typography variant="body1">
						{authors.slice(0, 5).join(" | ")}
					</Typography>
				)}
				{source && <Typography variant="body1">{source}</Typography>}
				{doi && (
					<Typography variant="body1">
						{t("components.search.content.doiColon")} {doi}
					</Typography>
				)}
				<Link
					component="button"
					variant="body1"
					sx={{
						mt: 2,
						textDecoration: "none",
						fontWeight: 700,
						color: (theme) => theme.palette.text.primary,
						": hover": {
							color: (theme) => theme.palette.primary.main,
						},
					}}
					onClick={() => {
						setSelectedArticle(article);
					}}
					aria-label={t("components.search.content.seeMoreAbout", { title })}
				>
					{t("components.search.content.seeMore")}
				</Link>
			</CardContent>
			<CardActions sx={{ paddingTop: 0 }}>
				<BookmarkButton
					className="table-bookmark-button"
					title={title}
					url={href}
					aria-label={t("components.search.content.bookmark", { title })}
				/>
			</CardActions>
		</Card>
	);
};
