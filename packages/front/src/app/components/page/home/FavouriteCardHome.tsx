import LockPersonIcon from "@mui/icons-material/LockPerson";
import {
	Box,
	Card,
	CardActions,
	CardContent,
	IconButton,
	Link as MuiLink,
	Tooltip,
} from "@mui/material";
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
				gap: 2,
			}}
		>
			<CardContent
				sx={{
					flexGrow: 1,
					display: "flex",
					alignItems: "center",
				}}
			>
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
						}}
					>
						<MuiLink
							href={favourite.url}
							target="_blank"
							rel="noreferrer noopener nofollow"
							onPointerDown={(e) => e.stopPropagation()}
						>
							{favourite.title}
						</MuiLink>
					</Box>
				</Tooltip>
			</CardContent>
			<CardActions
				sx={{
					paddingInlineStart: 0,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "flex-end",
					"& button ~ button": {
						margin: 0,
					},
				}}
			>
				{favourite.personal && (
					<Tooltip title={t("pages.favourite.personal")} sx={{ margin: 0 }}>
						<IconButton sx={{ cursor: "default" }}>
							<LockPersonIcon
								fontSize="small"
								color="primary"
								sx={{ margin: 0 }}
							/>
						</IconButton>
					</Tooltip>
				)}
			</CardActions>
		</Card>
	);
};

export default FavouriteCardHome;
