import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { Box, Stack } from "@mui/system";
import { Fragment, memo } from "react";
import { useBibContext } from "../../../context/BibContext";
import type { ArticleContentGetter } from "../../../services/search/Article";
import { useTranslator } from "../../../shared/locales/I18N";
import BookmarkButton from "../button/BookmarkButton";
import ExportArticleCheckbox from "../button/ExportArticleCheckbox";
import OpenAccess from "../icon/OpenAccess";
import OpenablePaper from "../paper/OpenablePaper";
import SkeletonEntry from "../skeleton/SkeletonEntry";
import ArticleLinks from "./ArticleLinks";

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

const Article = ({
	getter,
	open,
	isWaiting,
	onChange,
}: {
	getter: ArticleContentGetter;
	open: boolean;
	isWaiting: boolean;
	onChange: (isOpen: boolean) => void;
}) => {
	const t = useTranslator();
	const {
		search,
		session: { user },
	} = useBibContext();
	const authors = getter.getAuthors();
	const doi = getter.getDOI();
	const source = getter.getSource();
	const href = getter.proxify(getter.getHref(), search.domain);
	const openAccess = getter.isOpenAccess();
	const articlesLinks = getter.getArticleLinks();
	const title = getter.getTitle();

	return (
		<div className={user ? "table-bookmark-size" : undefined}>
			<OpenablePaper
				onChange={onChange}
				defaultOpenState={open}
				title={
					<>
						<Link
							className="table-list-title link"
							underline={href ? "hover" : "none"}
							href={href ?? undefined}
							target="_blank"
							rel="noreferrer noopener nofollow"
							aria-label={
								href
									? t("components.table.content.links")
									: t("components.table.content.noAccess")
							}
						>
							{title} {getter.getType() ? `[${getter.getType()}]` : null}
							{!href ? (
								<i> ({t("components.table.content.noAccess")})</i>
							) : null}
						</Link>
						{openAccess && href ? (
							<OpenAccess className="table-icon table-icon-oa" />
						) : null}
					</>
				}
				leftAction={
					<Stack direction="row">
						<ExportArticleCheckbox getter={getter} />
						<ArticleId id={getter.getId()} />
					</Stack>
				}
				summary={
					<Box>
						{authors && (
							<Typography variant="body1">{authors.join(", ")}</Typography>
						)}
						{source && <Typography variant="body1">{source}</Typography>}
						{doi && (
							<Typography variant="body1">
								{t("components.table.content.doiColon")} {doi}
							</Typography>
						)}
					</Box>
				}
				content={
					isWaiting ? (
						<SkeletonEntry animation="pulse" height={450} />
					) : (
						<Box component="dl" className="table-list-body">
							{getter.getAllItems().map((entry) => {
								if (entry.label === "Access URL") {
									return (
										<Fragment key={entry.label}>
											<Typography component="dt" variant="subtitle1">
												{entry.label}
											</Typography>
											<Typography
												component="dd"
												sx={{ marginInlineStart: "40px" }}
											>
												{entry.content.map((value) => {
													const link = getter.proxify(
														{ url: value, name: value },
														search.domain,
													);
													if (!link) {
														return null;
													}
													return (
														<Link key={value} href={link}>
															{value}
														</Link>
													);
												})}
											</Typography>
										</Fragment>
									);
								}
								return (
									<Fragment key={entry.label}>
										<Typography component="dt" variant="subtitle1">
											{entry.label}
										</Typography>
										<Typography
											component="dd"
											sx={{ marginInlineStart: "40px" }}
										>
											{entry.content.map((value) => (
												<Fragment key={value}>{value}</Fragment>
											))}
										</Typography>
									</Fragment>
								);
							})}
							{articlesLinks.fullTextLinks.length > 0 && (
								<>
									<Typography component="dt" variant="subtitle1">
										{t("components.table.content.links")}
									</Typography>
									<ArticleLinks
										links={articlesLinks.fullTextLinks}
										title={title}
										domain={search.domain}
										proxify={getter.proxify}
									/>
								</>
							)}
							{articlesLinks.pdfLinks.length > 0 && (
								<>
									<Typography component="dt" variant="subtitle1">
										{t("components.table.content.pdf")}
									</Typography>
									<ArticleLinks
										links={articlesLinks.pdfLinks}
										title={title}
										domain={search.domain}
										proxify={getter.proxify}
									/>
								</>
							)}
						</Box>
					)
				}
				rightAction={
					user && title && href ? (
						<BookmarkButton
							className="table-bookmark-button"
							title={title}
							url={href}
						/>
					) : null
				}
			/>
		</div>
	);
};

export default memo(Article);
