import {
	Card,
	CardActions,
	CardContent,
	Link,
	Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import BookmarkButton from "../../../components/element/button/BookmarkButton";
import { useBibContext } from "../../../context/BibContext";
import { createQuery, environment } from "../../../services/Environment";
import { ArticleContentGetter } from "../../../services/search/Article";
import { useTranslator } from "../../../shared/locales/I18N";
import { ArticleTitle } from "./ArticleTitle";

function ArticleId({ id }: { id: number }) {
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
	const [getterArticle, setArticleGetter] = useState(
		new ArticleContentGetter(article, null),
	);
	const {
		search,
		session: { user },
	} = useBibContext();

	const [href, setHref] = useState<string | null>(null);

	const title = getterArticle.getTitle();
	const authors = getterArticle.getAuthors();
	const doi = getterArticle.getDOI();
	const source = getterArticle.getSource();
	const openAccess = getterArticle.isOpenAccess(
		user?.settings?.articleLinkType === "fullText",
	);

	useEffect(() => {
		const resultHref = getterArticle.getHref(
			user?.settings?.articleLinkType === "fullText",
		);
		if (resultHref) {
			setHref(getterArticle.proxify(resultHref, search.domain));
			return;
		}

		if (getterArticle.isRetrieve()) {
			return;
		}

		// Try to retrieve article link from the server
		void fetch(
			createQuery(
				`${environment.get.retrieve.article.replace("{domain}", search.domain)}?dbid=${getterArticle.getDBID()}&an=${getterArticle.getAN()}`,
			),
		)
			.then((response) => (response.ok ? response.json() : null))
			.then((data) => {
				if (!data) {
					return;
				}

				setArticleGetter(new ArticleContentGetter(article, data));
			});
	}, [article, getterArticle, search.domain, user?.settings?.articleLinkType]);

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
			elevation={3}
		>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<ArticleId id={getterArticle.getId()} />
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
				{!getterArticle.isLinkIq() && (
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
				)}
			</CardContent>
			<CardActions sx={{ paddingTop: 0 }}>
				<BookmarkButton
					className="table-bookmark-button"
					title={title}
					url={href}
					aria-label={t("components.search.content.bookmark", { title })}
					source="article"
				/>
			</CardActions>
		</Card>
	);
};
