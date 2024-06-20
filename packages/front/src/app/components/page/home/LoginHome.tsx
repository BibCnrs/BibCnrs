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
import { alert } from "../../../services/common/CMS";
import { newsHome } from "../../../services/user/TestsNews";
import { useFavouriteResources } from "../../../shared/hook";
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

	const { favouritesWithId } = useFavouriteResources();

	const lastNineFavourites = favouritesWithId
		.sort((a, b) => Number(b.id) - Number(a.id))
		.slice(0, 9);

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

	return (
		<Stack gap={4}>
			<RenderContent
				data={alertData}
				page="root"
				t={t}
				Container={AlertPaper}
			/>

			{!user?.legacy && (
				<Stack gap={2}>
					<Typography variant="h5" aria-label={t("pages.news.title")}>
						{t("pages.favourite.title")}
					</Typography>
					<Box
						display="grid"
						gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr 1fr" }}
						gap={6}
					>
						{lastNineFavourites?.map((favourite) => (
							<Card key={favourite.id}>
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
						{lastNineFavourites.length === 0 && (
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
							{`${t("pages.root.seeMore")} >`}
						</Button>
					</Box>
				</Stack>
			)}

			<Stack gap={2}>
				<Typography variant="h5" aria-label={t("pages.news.title")}>
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
						{`${t("pages.root.seeMore")} >`}
					</Button>
				</Box>
			</Stack>
		</Stack>
	);
};
