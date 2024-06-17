import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Chip,
	Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { useLanguageKey } from "../../../shared/locales/I18N";
import type { TestsNewsProps } from "../../../shared/types/props.types";

/**
 * Component used to display news and tests article
 * @param data - Array of Articles
 * @param domain
 */
const RenderNews = ({ data }: TestsNewsProps) => {
	const language = useLanguageKey();

	const filteredData = useMemo(() => {
		if (!data) {
			return [];
		}

		return data.filter(
			(data, index, self) => index === self.findIndex((t) => t.id === data.id),
		);
	}, [data]);

	return (
		<Box
			display="grid"
			gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr 1fr" }}
			gap={6}
		>
			{filteredData.map((data) => (
				<Box key={data.id}>
					<Card
						sx={{
							display: "flex",
							flexDirection: "column",
							height: "100%",
							cursor: "pointer",
							":hover": {
								boxShadow: 20, // theme.shadows[20]
							},
						}}
					>
						<CardActionArea
							component={Link}
							to={`/news/${data.id}`}
							sx={{ height: "100%" }}
						>
							<CardMedia
								component="img"
								sx={{ height: 200, objectFit: "cover" }}
								image={
									data.media
										? data.media.url
										: "https://bib.cnrs.fr/wp-content/uploads/2018/04/bibcnrs-logo-visite.png"
								}
							/>
							<CardContent
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									flex: 1,
									gap: 2,
								}}
							>
								<Stack spacing={1}>
									<Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
										{data.page === "tests" && (
											<Chip label="Test" size="small" variant="outlined" />
										)}
									</Stack>
									<Typography variant="h5" component="h6">
										{language === "en" ? data.name_en : data.name_fr}
									</Typography>
								</Stack>
								<Typography color="textSecondary">
									{new Date(data.from).toLocaleDateString()}
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Box>
			))}
		</Box>
	);
};

export default memo(RenderNews);
