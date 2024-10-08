import LinkIcon from "@mui/icons-material/Link";
import { Button, Chip, Link, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../../components/internal/PageTitle";
import { FakeSearchBar } from "../../../components/page/searchbar/FakeSearchBar";
import { useBibContext } from "../../../context/BibContext";
import { newsById } from "../../../services/user/TestsNews";
import type {
	TestNewDataType,
	TestNewUrlDataType,
} from "../../../shared/types/data.types";
import Error404 from "../../errors/Error404";

const IndividualNews = () => {
	const params = useParams();
	const { language } = useBibContext();

	const id = useMemo(() => {
		if (params.id) {
			return Number.parseInt(params.id, 10);
		}
		return -1;
	}, [params.id]);

	const {
		session: { user },
	} = useBibContext();

	const selectedDomain = useMemo(() => {
		const filteredUserDomain = user?.domains?.filter(
			(domain) => domain !== user?.favorite_domain,
		);
		return user.favorite_domain || filteredUserDomain?.at(0);
	}, [user]);

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
		<>
			<PageTitle
				customTitle
				page={language === "en" ? data.name_en : data.name_fr}
			/>
			<FakeSearchBar title={language === "en" ? data.name_en : data.name_fr} />
			<Container
				sx={{
					marginTop: 4,
					marginBottom: 4,
				}}
			>
				<Stack spacing={2}>
					<Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
						{data.page === "tests" && (
							<Chip
								label="Test"
								size="small"
								variant="filled"
								color="secondary"
								sx={{
									fontWeight: 700,
									textTransform: "uppercase",
								}}
							/>
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

					<Box
						sx={{
							a: {
								color: "primary.main",
							},
						}}
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
		</>
	) : (
		<Error404 />
	);
};

export default IndividualNews;
