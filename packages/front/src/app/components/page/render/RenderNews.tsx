import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Chip,
	Typography,
} from "@mui/material";
import { Box, Stack, useTheme } from "@mui/system";
import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { useBibContext } from "../../../context/BibContext";
import type { TestsNewsProps } from "../../../shared/types/props.types";
import { Empty } from "../../shared/Empty";

/**
 * Component used to display news and tests article
 * @param data - Array of Articles
 * @param domain
 */
const newName = (name) => {
	return name?.replace(/[^a-zA-Z0-9 ]/g, "");
};
const RenderNews = ({ data }: TestsNewsProps) => {
	const { language } = useBibContext();
	const theme = useTheme();

	const filteredData = useMemo(() => {
		if (!data) {
			return [];
		}
		const today = new Date();
		today.setHours(0, 0, 0, 0); // On compare uniquement la date, pas l'heure

		return data
			.filter((item) => {
				const fromDate = new Date(item.from);
				fromDate.setHours(0, 0, 0, 0);
				return fromDate <= today;
			})
			.filter(
				(data, index, self) =>
					index === self.findIndex((t) => t.id === data.id),
			);
	}, [data]);

	if (!filteredData || filteredData.length === 0) {
		return <Empty />;
	}

	const cardActionAreaDirection = filteredData.length > 1 ? "column" : "row";
	const imageStyle =
		filteredData.length > 1
			? { height: 200, objectFit: "cover" }
			: { width: 250, height: 200, objectFit: "contain" };

	return (
		<Box
			display="grid"
			gridTemplateColumns={{
				xs: "1fr",
				md: filteredData.length === 1 ? "1fr" : "1fr 1fr 1fr",
			}}
			gap={6}
		>
			{filteredData.map((data) => (
				<Card key={data.id} elevation={3}>
					<CardActionArea
						component={Link}
						to={`/news/${data.id}`}
						sx={{
							height: "100%",
							display: "flex",
							flexDirection: cardActionAreaDirection,
						}}
					>
						<CardMedia
							component="img"
							sx={imageStyle}
							image={
								data.media
									? data.media.url
									: "https://bib.cnrs.fr/wp-content/uploads/2018/04/bibcnrs-logo-visite.png"
							}
							alt={data.media?.name ? newName(data.media.name) : "image"}
						/>
						<CardContent
							sx={{
								flex: 1,
								width: "100%",
								height: "100%",
								display: "flex",
								justifyContent: "space-between",
								flexDirection: "column",
								backgroundColor:
									data.page === "tests"
										? theme.palette.secondary.main
										: "inherit",
								color:
									data.page === "tests"
										? theme.palette.common.black
										: "inherit",
							}}
						>
							<Stack spacing={1}>
								<Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
									{data.page === "tests" && (
										<Chip
											label="Test"
											size="medium"
											variant="filled"
											sx={{
												fontWeight: 700,
												textTransform: "uppercase",
												backgroundColor: theme.palette.common.white,
												color: theme.palette.common.black,
											}}
										/>
									)}
								</Stack>
								<Typography
									variant="h6"
									component="h6"
									sx={{ fontSize: "1rem" }}
								>
									{language === "en" ? data.name_en : data.name_fr}
								</Typography>
							</Stack>
							<Typography>
								{new Date(data.from).toLocaleDateString()}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			))}
		</Box>
	);
};

export default memo(RenderNews);
