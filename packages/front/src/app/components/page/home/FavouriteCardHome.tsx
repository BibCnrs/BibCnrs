import { Box, Card, CardContent, Chip, Link, Tooltip } from "@mui/material";
import { Stack } from "@mui/system";
import { useTranslator } from "../../../shared/locales/I18N";

// Assuming `t` is a function for translation, you might need to pass it as a prop or use a translation hook/context
const FavouriteCardHome = ({ favourite }) => {
	const t = useTranslator();
	return (
		<Card
			elevation={3}
			sx={{
				display: "flex",
				flexDirection: "row",
				gap: 2,
			}}
			role="listitem"
			aria-label={favourite.url}
		>
			<CardContent
				sx={{
					flexGrow: 1,
					display: "flex",
				}}
			>
				<Stack direction="column" spacing={1}>
					{favourite.source === "personal" || favourite.personal ? (
						<Chip
							label={t("pages.favourite.personal")}
							color="secondary"
							size="small"
							sx={{
								fontWeight: 700,
								textTransform: "uppercase",
								width: "fit-content",
							}}
						/>
					) : (
						<Chip
							label={t(`pages.favourite.${favourite.source ?? "unknown"}`)}
							color="default"
							size="small"
							sx={{
								fontWeight: 700,
								textTransform: "uppercase",
								width: "fit-content",
							}}
						/>
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
								textDecoration: "none",
							}}
							component={Link}
							href={favourite.url}
							target="_blank"
							rel="noreferrer noopener nofollow"
							onPointerDown={(e) => e.stopPropagation()}
						>
							{favourite.title}
						</Box>
					</Tooltip>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default FavouriteCardHome;
