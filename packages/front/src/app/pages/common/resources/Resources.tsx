import { Card, CardActionArea, CardContent, Link } from "@mui/material";
import { Box, Container } from "@mui/system";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PageTitle from "../../../components/internal/PageTitle";
import { FakeSearchBar } from "../../../components/page/searchbar/FakeSearchBar";
import { Empty } from "../../../components/shared/Empty";
import { useBibContext } from "../../../context/BibContext";
import { resources } from "../../../services/common/Resources";
import { useTranslator } from "../../../shared/locales/I18N";
import { useMatomo } from "../../../shared/matomo";
import type {
	ResourceDataType,
	ResourcesDataType,
} from "../../../shared/types/data.types";

export const DisplayResources = ({
	data,
}: { data: ResourcesDataType | undefined }) => {
	const { trackEvent } = useMatomo();
	const { language } = useBibContext();

	if (!data || data.length === 0) {
		return <Empty />;
	}

	const ressourceurl = data.find((resource) => resource.media.file === "");

	const otherResources = data.filter(
		(resource) => resource.media.file !== null && resource.media.file !== "",
	);

	otherResources.sort((a, b) => {
		if (language === "en") {
			return a.name_en.localeCompare(b.name_en);
		}
		return a.name_fr.localeCompare(b.name_fr);
	});

	const handleResourceClick = (resource: ResourceDataType) => {
		trackEvent("Resource", "open", resource.name_fr, resource.id);
	};

	return (
		<Box
			display="grid"
			// biome-ignore lint/a11y/useSemanticElements: <explanation>
			role="list"
			gridTemplateColumns={{
				xs: "repeat(1, 1fr)",
				sm: "repeat(2, 1fr)",
				md: "repeat(3, 1fr)",
				lg: "repeat(4, 1fr)",
			}}
			gap={2}
		>
			{otherResources.map((resource) => (
				<Card
					key={resource.id}
					// biome-ignore lint/a11y/useSemanticElements: <explanation>
					role="listitem"
					aria-label={resource.name_fr}
					elevation={3}
					sx={{ minHeight: "100%" }}
				>
					<CardActionArea
						component={Link}
						href={resource.media?.url}
						sx={{ height: "100%" }}
						rel="nofollow noreferrer noopener"
						target="_blank"
						onClick={() => handleResourceClick(resource)}
					>
						<CardContent
							sx={{
								"&:last-child": {
									paddingBottom: 2,
									height: "100%",
								},
							}}
						>
							{language === "en" ? resource.name_en : resource.name_fr}
						</CardContent>
					</CardActionArea>
				</Card>
			))}

			{ressourceurl && (
				<Card
					key={ressourceurl.id}
					// biome-ignore lint/a11y/useSemanticElements: <explanation>
					role="listitem"
					aria-label={ressourceurl.name_fr}
					elevation={3}
					sx={{
						minHeight: "100%",
						backgroundColor: "secondary.main",
						color: "black",
						gridColumn: "1",
					}}
				>
					<CardActionArea
						component={Link}
						href={ressourceurl.media?.url}
						sx={{ height: "100%" }}
						rel="nofollow noreferrer noopener"
						target="_blank"
						onClick={() => handleResourceClick(ressourceurl)}
					>
						<CardContent
							sx={{
								"&:last-child": {
									paddingBottom: 2,
									height: "100%",
								},
							}}
						>
							{language === "en" ? ressourceurl.name_en : ressourceurl.name_fr}
						</CardContent>
					</CardActionArea>
				</Card>
			)}
		</Box>
	);
};

const Resources = () => {
	const t = useTranslator();
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	const { data } = useQuery<ResourcesDataType, any, ResourcesDataType, any>({
		queryKey: ["resources"],
		queryFn: resources,
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	return (
		<>
			<PageTitle page="resources" />
			<FakeSearchBar title={t("pages.resources.title")} />
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
				<DisplayResources data={data} />
			</Container>
		</>
	);
};

export default Resources;
