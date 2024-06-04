import LinkIcon from "@mui/icons-material/Link";
import { Button, Chip, Link, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../../components/internal/PageTitle";
import { getDomains, getFavouriteDomain } from "../../../services/user/Session";
import { newsById } from "../../../services/user/TestsNews";
import { useLanguageKey } from "../../../shared/locales/I18N";
import type {
	TestNewDataType,
	TestNewUrlDataType,
} from "../../../shared/types/data.types";
import Error404 from "../../errors/Error404";

const IndividualNews = () => {
	const params = useParams();
	const language = useLanguageKey();

	const id = useMemo(() => {
		if (params.id) {
			return Number.parseInt(params.id, 10);
		}
		return -1;
	}, [params.id]);

	const favouriteDomain = getFavouriteDomain();
	const userDomains = getDomains();

	const selectedDomain = useMemo(() => {
		const filteredUserDomain = userDomains.filter(
			(domain) => domain !== favouriteDomain,
		);
		return favouriteDomain || filteredUserDomain[0];
	}, [favouriteDomain, userDomains]);

	const getUrl = (url: TestNewUrlDataType): string => {
		return url.proxy
			? `https://${selectedDomain}.bib.cnrs.fr/login?url=${url.url}`
			: url.url;
	};

	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	const { data } = useQuery<TestNewDataType, any, TestNewDataType, any>({
		queryKey: ["individual_news", id],
		queryFn: () => newsById(id),
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	return data ? (
		<Container
			sx={{
				marginTop: 4,
				marginBottom: 4,
			}}
		>
			<PageTitle
				customTitle
				page={language === "en" ? data.name_en : data.name_fr}
			/>
			<Stack spacing={2}>
				<Typography variant="h4" component="h1">
					{language === "en" ? data.name_en : data.name_fr}
				</Typography>
				<Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
					{data.page === "tests" && (
						<Chip label="Test" size="small" variant="outlined" />
					)}
				</Stack>

				<Typography color="textSecondary">
					{new Date(data.from).toLocaleDateString()}
				</Typography>

				{data.media?.url && (
					<img
						src={data.media.url}
						alt={data.name_en}
						loading="lazy"
						style={{
							maxWidth: "800px",
							objectFit: "contain",
							margin: "0 auto",
							borderRadius: "8px",
						}}
					/>
				)}

				<div
					className="tests-news-content cms-content"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{
						__html: language === "en" ? data.content_en : data.content_fr,
					}}
				/>

				{Array.isArray(data.urls) && data.urls.length > 0 ? (
					<Stack spacing={2} direction="row">
						{data.urls.map((url) => (
							<Button
								key={url.name}
								variant="outlined"
								startIcon={<LinkIcon />}
								component={Link}
								href={getUrl(url)}
								target="_blank"
								rel="noreferrer noopener nofollow"
							>
								{url.name}
							</Button>
						))}
					</Stack>
				) : null}
			</Stack>
		</Container>
	) : (
		<Error404 />
	);
};

export default IndividualNews;
