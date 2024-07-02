import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	Typography,
} from "@mui/material";
import { Link as MuiLink } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useBibContext } from "../../../context/BibContext";
import { useFavourites } from "../../../pages/user/favourite/useFavourites";
import { alert } from "../../../services/common/CMS";
import { newsHome } from "../../../services/user/TestsNews";
import { useTranslator } from "../../../shared/locales/I18N";
import type {
	CMSResultDataType,
	TestsNewsDataType,
} from "../../../shared/types/data.types";
import AlertPaper from "../../element/paper/alert/AlertPaper";
import RenderContent from "../render/RenderContent";
import RenderNews from "../render/RenderNews";

export const LoginHome = () => {
	const t = useTranslator();

	const {
		session: { user },
	} = useBibContext();

	const { superFavouriteResources } = useFavourites();

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

	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	const { data } = useQuery<TestsNewsDataType, any, TestsNewsDataType, any>({
		queryKey: ["news", "home"],
		queryFn: () => newsHome(user?.domains),
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	// Display favorite only if the user is not legacy and has the setting enabled
	const displayFavourites = !user?.legacy && user?.settings?.displayFavorites;

	// We always display test news if the user is legacy.
	// If janus account, we display test news if the setting is enabled
	const displayTestNews = user?.legacy || user?.settings?.displayTestNews;

	return (
		<Stack gap={4}>
			<RenderContent
				data={alertData}
				page="root"
				t={t}
				Container={AlertPaper}
			/>

			{displayFavourites && (
				<Stack gap={2}>
					<Typography
						variant="h5"
						aria-label={t("pages.news.title")}
						color="primary"
					>
						{t("pages.favourite.superFavourites")}
					</Typography>
					<Box
						display="grid"
						gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr 1fr" }}
						gap={6}
					>
						{superFavouriteResources?.map((favourite) => (
							<Card key={favourite.id} elevation={3}>
								<CardActionArea
									component={MuiLink}
									href={favourite.url}
									target="_blank"
									sx={{ height: "100%" }}
									rel="nofollow noreferrer noopener"
								>
									<CardContent>
										<Typography>{favourite.title}</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						))}
						{superFavouriteResources?.length === 0 && (
							<Typography>{t("pages.root.emptyFavorites")}</Typography>
						)}
					</Box>

					<Box sx={{ textAlign: "right" }}>
						<Button
							component={Link}
							to="account/favourite"
							sx={{
								textTransform: "none",
							}}
						>
							{`${t("pages.root.seeMoreFavourites")} >`}
						</Button>
					</Box>
				</Stack>
			)}

			{displayTestNews && (
				<Stack gap={2}>
					<Typography
						variant="h5"
						aria-label={t("pages.news.title")}
						color="primary"
					>
						{t("pages.news.title")}
					</Typography>
					<RenderNews data={data} />
					<Box sx={{ textAlign: "right" }}>
						<Button
							component={Link}
							to="news"
							sx={{
								textTransform: "none",
							}}
						>
							{`${t("pages.root.seeMoreNews")} >`}
						</Button>
					</Box>
				</Stack>
			)}
		</Stack>
	);
};
