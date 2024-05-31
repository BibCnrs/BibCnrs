import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Chip,
	Grid,
	Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { memo, useMemo } from "react";
import { useLanguageKey } from "../../../shared/locales/I18N";
import type {
	TestNewDataType,
	TestNewUrlDataType,
} from "../../../shared/types/data.types";
import type { TestsNewsProps } from "../../../shared/types/props.types";
import PageDate from "../../element/PageDate";
import OpenablePaper from "../../element/paper/openable/OpenablePaper";
import TestsNewsFooter from "../../element/render/TestsNewsFooter";
import { getInstituteColor } from "../../internal/provider/LocalizedThemeProvider";

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

	console.log(filteredData);

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
						<CardMedia
							sx={{ height: 200, objectFit: "contain" }}
							image={`https://source.unsplash.com/random/cats&${data.id}`}
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
									{data.domains?.map((domain) => (
										<Chip key={domain} label={domain} size="small" />
									))}
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
					</Card>
				</Box>
			))}
		</Box>
	);
};

export default memo(RenderNews);
