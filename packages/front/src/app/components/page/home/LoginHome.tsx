import { Button, Typography } from "@mui/material";
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
import AlertPaper from "../../element/paper/alert/AlertCard";
import RenderContent from "../render/RenderContent";
import RenderNews from "../render/RenderNews";
import FavouriteCardHome from "./FavouriteCardHome";
import { useSharedFavourites } from "./useSharedFavourites";

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

	const { data: news } = useQuery<TestsNewsDataType>({
		queryKey: ["news", "home"],
		queryFn: () => newsHome(user?.domains),
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});

	const { data: sharedFavourites } = useSharedFavourites();

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
						{superFavouriteResources?.length
							? t("pages.favourite.superFavourites")
							: t("pages.favourite.sharedFavourites")}
					</Typography>

					{superFavouriteResources?.length ? (
						<Box
							display="grid"
							gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr 1fr" }}
							gap={6}
						>
							{superFavouriteResources?.map((favourite) => (
								<FavouriteCardHome key={favourite.id} favourite={favourite} />
							))}
						</Box>
					) : sharedFavourites?.length ? (
						<Box
							display="grid"
							gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr 1fr" }}
							gap={6}
						>
							{sharedFavourites?.map((favourite) => (
								<FavouriteCardHome key={favourite.id} favourite={favourite} />
							))}
						</Box>
					) : (
						<Typography>{t("pages.root.emptyFavorites")}</Typography>
					)}

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
					<RenderNews data={news} />
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
