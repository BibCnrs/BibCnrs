import {
	Card,
	CardActions,
	CardContent,
	Link,
	Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";
import BookmarkButton from "../../../components/element/button/BookmarkButton";
import ExportArticleCheckbox from "../../../components/element/button/ExportArticleCheckbox";
import OpenAccess from "../../../components/element/icon/OpenAccess";
import { useBibContext } from "../../../context/BibContext";
import { ArticleContentGetter } from "../../../services/search/Article";
import { useTranslator } from "../../../shared/locales/I18N";

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

const CardArticleTitle = ({ title, href, openAccess, type }) => {
	const t = useTranslator();

	return (
		<Typography
			component={Link}
			variant="h4"
			sx={{
				fontSize: 20,
				display: "block",
				height: "100%",
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
					? `${t("components.search.content.links")}: ${title}`
					: `${title} (${t("components.search.content.noAccess")})`
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

export const CardArticle = ({ article, setSelectedArticle }) => {
	const t = useTranslator();
	const [getter, _] = useState(new ArticleContentGetter(article, null));
	const {
		search,
		session: { user },
	} = useBibContext();

	const title = getter.getTitle();
	const authors = getter.getAuthors();
	const doi = getter.getDOI();
	const source = getter.getSource();
	const href = getter.proxify(getter.getHref(), search.domain);
	const openAccess = getter.isOpenAccess();

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
			aria-label={`article-title-${getter.getId()}`}
		>
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<ExportArticleCheckbox getter={getter} />
				<ArticleId id={getter.getId()} />
			</Stack>
			<CardContent sx={{ flex: 1, paddingY: 0 }}>
				<CardArticleTitle
					title={title}
					href={href}
					openAccess={openAccess}
					type={getter.getType()}
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
				>
					{t("components.search.content.seeMore")}
				</Link>
			</CardContent>
			<CardActions sx={{ paddingTop: 0 }}>
				<BookmarkButton
					className="table-bookmark-button"
					title={title}
					url={href}
					aria-label={t("components.search.content.bookmark")}
				/>
			</CardActions>
		</Card>
	);
};
