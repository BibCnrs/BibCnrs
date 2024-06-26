import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { DisplayResources } from "../../../pages/common/resources/Resources";
import { alert, home } from "../../../services/common/CMS";
import { resources } from "../../../services/common/Resources";
import { useTranslator } from "../../../shared/locales/I18N";
import type {
	CMSResultDataType,
	ResourcesDataType,
} from "../../../shared/types/data.types";
import AlertPaper from "../../element/paper/alert/AlertPaper";
import RenderContent from "../render/RenderContent";

export const AnonymousHome = () => {
	const t = useTranslator();

	const { data: alertData } = useQuery<
		CMSResultDataType,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		any,
		CMSResultDataType,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		any
	>({
		queryKey: ["alert"],
		queryFn: alert,
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	const { data: homeData } = useQuery<
		CMSResultDataType,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		any,
		CMSResultDataType,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		any
	>({
		queryKey: ["home"],
		queryFn: home,
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	const { data: ResourcesData } = useQuery<
		ResourcesDataType,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		any,
		ResourcesDataType,
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		any
	>({
		queryKey: ["resources"],
		queryFn: resources,
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	return (
		<Stack gap={4}>
			<RenderContent
				data={alertData}
				page="root"
				t={t}
				Container={AlertPaper}
			/>
			<Box display="grid" gridTemplateColumns="1fr 1fr" gap={12}>
				<RenderContent data={homeData} page="root" t={t} />
				<Stack gap={2}>
					<Typography
						variant="h6"
						aria-label={t("pages.resources.title")}
						color="primary"
					>
						{t("pages.resources.title")}
					</Typography>
					<DisplayResources data={ResourcesData} />
				</Stack>
			</Box>
		</Stack>
	);
};
