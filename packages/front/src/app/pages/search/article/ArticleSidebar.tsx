import { Chip, Divider, Link, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import BookmarkButton from "../../../components/element/button/BookmarkButton";
import { useBibContext } from "../../../context/BibContext";
import {
	ArticleContentGetter,
	retrieve,
} from "../../../services/search/Article";
import { useTranslator } from "../../../shared/locales/I18N";
import type { ArticleRetrieveDataType } from "../../../shared/types/data.types";
import { ArticleTitle } from "./ArticleTitle";

export const ArticleSidebar = ({ article }) => {
	const t = useTranslator();
	const { search } = useBibContext();
	const [getterArticle, setGetterArticle] = useState(
		new ArticleContentGetter(article, null),
	);

	const {
		data: dataRetrieve,
		isFetching,
		isLoading,
		isSuccess,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	} = useQuery<ArticleRetrieveDataType, any, ArticleRetrieveDataType, any>({
		queryKey: [
			"article_retrieve",
			search.domain,
			getterArticle.getDBID(),
			getterArticle.getAN(),
		],
		queryFn: async () => {
			if (search.domain) {
				return retrieve(
					search.domain,
					getterArticle.getDBID(),
					getterArticle.getAN(),
				);
			}
			return null;
		},
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	useEffect(() => {
		setGetterArticle(new ArticleContentGetter(article, dataRetrieve));
	}, [dataRetrieve, article]);

	const allItems = getterArticle.getAllItems();
	const otherFields = allItems.filter(
		(item) =>
			![
				"Title",
				"Authors",
				"Contributors",
				"Source",
				"Publisher Information",
				"Publisher Year",
				"Publication Year",
				"Collection",
				"Subject Terms",
				"Description",
				"Abstract",
				"Access URL",
				"Page Count",
			].includes(item.label),
	);

	return (
		<Box
			display="grid"
			gridTemplateColumns={{
				xs: "1fr",
				sm: "3fr 1fr",
			}}
			gap={10}
			maxWidth="80vw"
			padding={4}
		>
			<Stack
				gap={2}
				sx={{
					position: "relative",
					"&:after": {
						content: '""',
						position: "absolute",
						right: "-40px", // Adjust based on your layout
						top: 0,
						bottom: 0,
						width: "1px",
						backgroundColor: (theme) => theme.palette.divider,
					},
				}}
			>
				<Stack direction="row" justifyContent="space-between">
					<Chip label="Article" color="secondary" />
					<BookmarkButton
						className="table-bookmark-button"
						title={getterArticle.getTitle()}
						url={getterArticle.proxify(getterArticle.getHref(), search.domain)}
						aria-label={t("components.search.content.bookmark")}
					/>
				</Stack>
				<ArticleTitle
					title={getterArticle.getTitle()}
					href={getterArticle.proxify(getterArticle.getHref(), search.domain)}
					openAccess={getterArticle.isOpenAccess()}
					type={getterArticle.getType()}
				/>

				{getterArticle.getAbstract() && (
					<Stack gap={1}>
						<Typography variant="subtitle1" fontWeight="bold">
							{t("components.search.content.abstract")}
						</Typography>
						<Typography variant="body1">
							{getterArticle.getAbstract()}
						</Typography>
					</Stack>
				)}

				{getterArticle.getContributors() && (
					<Stack gap={1}>
						<Typography variant="subtitle1" fontWeight="bold">
							{t("components.search.content.contributors")}
						</Typography>
						<Typography variant="body1">
							{getterArticle.getContributors().map((contributor) => (
								<Box key={contributor}>{contributor}</Box>
							))}
						</Typography>
					</Stack>
				)}

				{getterArticle.getCollections() && (
					<Stack gap={1}>
						<Typography variant="subtitle1" fontWeight="bold">
							{t("components.search.content.collections")}
						</Typography>
						<Typography variant="body1">
							{getterArticle.getCollections().map((collection) => (
								<Box key={collection}>{collection}</Box>
							))}
						</Typography>
					</Stack>
				)}

				{otherFields.length > 0 &&
					otherFields.map(({ label, content }) => (
						<Stack gap={1} key={label}>
							<Typography variant="subtitle1" fontWeight="bold">
								{label}
							</Typography>
							<Typography variant="body1">
								{content.map((value, index) => (
									<Box key={value}>{value}</Box>
								))}
							</Typography>
						</Stack>
					))}
			</Stack>
			<Stack gap={2}>
				{getterArticle.getSubjectTerms() && (
					<Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
						{getterArticle.getSubjectTerms().map((term) => (
							<Chip key={term} label={term} />
						))}
					</Box>
				)}

				{getterArticle.getAuthorsWithoutContributors() && (
					<Stack gap={1}>
						<Typography variant="subtitle1" fontWeight="bold">
							{t("components.search.content.authors")}
						</Typography>
						<Typography variant="body1">
							{getterArticle.getAuthorsWithoutContributors().map((author) => (
								<Box key={author}>{author}</Box>
							))}
						</Typography>
					</Stack>
				)}

				{getterArticle.getSource() && (
					<Stack gap={1}>
						<Typography variant="subtitle1" fontWeight="bold">
							{t("components.search.content.source")}
						</Typography>
						<Typography variant="body1">{getterArticle.getSource()}</Typography>
					</Stack>
				)}
				{getterArticle.getPublisher() && (
					<Stack gap={1}>
						<Typography variant="subtitle1" fontWeight="bold">
							{t("components.search.content.publisher")}
						</Typography>
						<Typography variant="body1">
							{getterArticle.getPublisher()}
						</Typography>
					</Stack>
				)}

				{getterArticle.getPublicationYear() && (
					<Stack gap={1}>
						<Typography variant="subtitle1" fontWeight="bold">
							{t("components.search.content.publicationYear")}
						</Typography>
						<Typography variant="body1">
							{getterArticle.getPublicationYear()}
						</Typography>
					</Stack>
				)}

				{getterArticle.getPageCount() && (
					<Stack gap={1}>
						<Typography variant="subtitle1" fontWeight="bold">
							{t("components.search.content.pageCount")}
						</Typography>
						<Typography variant="body1">
							{getterArticle.getPageCount()}
						</Typography>
					</Stack>
				)}

				{getterArticle.getArticleLinks() && (
					<Stack gap={1}>
						<Typography variant="subtitle1" fontWeight="bold">
							{t("components.search.content.links")}
						</Typography>
						<Stack gap={1}>
							{[
								...getterArticle.getArticleLinks().fullTextLinks,
								...getterArticle.getArticleLinks().urls,
							].map((value) => {
								const link = getterArticle.proxify(
									{ url: value.url, name: value.name },
									search.domain,
								);
								if (!link) {
									return null;
								}
								return (
									<Link key={value.name} href={link} target="_blank">
										{value.name.length > 60
											? `${value.name.slice(0, 60)}...`
											: value.name}
									</Link>
								);
							})}
						</Stack>
					</Stack>
				)}
			</Stack>
		</Box>
	);
};
