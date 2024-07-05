import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	Chip,
	Link as MuiLink,
	Tooltip,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useTranslator } from "../../../shared/locales/I18N";

// Assuming `t` is a function for translation, you might need to pass it as a prop or use a translation hook/context
const FavouriteCardHome = ({ favourite }) => {
	const t = useTranslator();
	return (
		<Card
			key={favourite.id}
			elevation={3}
			sx={{
				display: "flex",
				flexDirection: "row",
			}}
		>
			<CardActionArea
				component={MuiLink}
				href={favourite.url}
				target="_blank"
				rel="noreferrer noopener nofollow"
				sx={{
					flexGrow: 1,
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-start",
				}}
			>
				<CardContent>
					<Stack direction="column" spacing={1}>
						{favourite.personal && (
							<Stack direction="row">
								<Chip
									label={t("pages.favourite.personal")}
									color="secondary"
									size="small"
									sx={{
										fontWeight: 700,
										textTransform: "uppercase",
										width: "auto",
									}}
								/>
							</Stack>
						)}
						<Tooltip
							enterDelay={500}
							enterNextDelay={500}
							leaveDelay={200}
							title={favourite.title}
							arrow
						>
							<Box
								sx={{
									display: "-webkit-box",
									"-webkit-line-clamp": "4",
									"-webkit-box-orient": "vertical",
									overflow: "hidden",
									color: (theme) => theme.palette.primary.main,
								}}
							>
								{favourite.title}
							</Box>
						</Tooltip>
					</Stack>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default FavouriteCardHome;
