import { Link, Typography } from "@mui/material";
import { useMemo } from "react";
import type { ArticleContentGetter } from "../../../services/search/Article";
import type { Url } from "../../../shared/types/types";

const ArticleLinks = ({
	links,
	title,
	proxify,
	domain,
}: {
	links: Url[];
	title?: string | null;
	proxify: ArticleContentGetter["proxify"];
	domain?: string;
}) => {
	const proxyLinks = useMemo(() => {
		return links.map((link): Url => {
			const proxyUrl = proxify(link, domain);
			if (proxyUrl) {
				link.url = proxyUrl;
			}
			return link;
		});
	}, [domain, links, proxify]);

	return (
		<Typography component="dd" sx={{ marginInlineStart: "40px" }}>
			{proxyLinks.map((value) => (
				<Link
					key={value.url}
					href={value.url}
					target="_blank"
					rel="nofollow noreferrer noopener"
				>
					{value.name}
				</Link>
			))}
		</Typography>
	);
};

export default ArticleLinks;
