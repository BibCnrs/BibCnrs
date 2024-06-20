import { Card, CardActionArea, CardContent, Link } from "@mui/material";
import { Box } from "@mui/system";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PageTitle from "../../../components/internal/PageTitle";
import { resources } from "../../../services/common/Resources";
import { useLanguageKey, useTranslator } from "../../../shared/locales/I18N";
import type { ResourcesDataType } from "../../../shared/types/data.types";

export const DisplayResources = ({
	data,
}: { data: ResourcesDataType | undefined }) => {
	const language = useLanguageKey();

	if (!data || data.length === 0) {
		return null;
	}

	// sort resources by name in alphabetical order
	data.sort((a, b) => {
		if (language === "en") {
			return a.name_en.localeCompare(b.name_en);
		}
		return a.name_fr.localeCompare(b.name_fr);
	});

	return (
		<Box
			display="grid"
			gridTemplateColumns={{
				xs: "repeat(1, 1fr)",
				sm: "repeat(2, 1fr)",
				md: "repeat(3, 1fr)",
				lg: "repeat(4, 1fr)",
			}}
			gap={2}
		>
			{data.map((resource) => (
				<Card key={resource.id} role="listitem" aria-label={resource.name_fr}>
					<CardActionArea
						component={Link}
						href={resource.href}
						sx={{ height: "100%" }}
						rel="nofollow noreferrer noopener"
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
		<div id="app">
			<PageTitle page="resources" />
			<h1>{t("pages.resources.title")}</h1>
			<DisplayResources data={data} />
		</div>
	);
};

export default Resources;
