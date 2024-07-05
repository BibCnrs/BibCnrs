import { useSortable } from "@dnd-kit/sortable";
import { CSS as DndCSS } from "@dnd-kit/utilities";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import {
	Box,
	Card,
	CardActions,
	CardContent,
	Chip,
	IconButton,
	Link,
	Tooltip,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useTranslator } from "../../../shared/locales/I18N";
import type { FavouriteResourceDataType } from "../../../shared/types/data.types";
import { useFavourites } from "./useFavourites";
type FavouriteListItemProps = {
	favourite: FavouriteResourceDataType;
	setFavouriteToDelete: (favourite: FavouriteResourceDataType) => void;
};

function FavouriteListItem({
	favourite,
	setFavouriteToDelete,
}: FavouriteListItemProps) {
	const t = useTranslator();

	const { superFavouriteResources, addSuperFavourite, removeSuperFavourite } =
		useFavourites();

	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: favourite.id });

	if (!favourite) {
		return null;
	}

	const handleToggleSuperFavourite = () => {
		if (favourite.isSuperFavorite) {
			removeSuperFavourite(favourite);
		} else {
			addSuperFavourite(favourite);
		}
	};

	return (
		<Card
			ref={setNodeRef}
			elevation={3}
			sx={{
				cursor: "grab",
				transform: DndCSS.Transform.toString(transform),
				transition,
				display: "flex",
				flexDirection: "row",
				gap: 2,
			}}
			{...attributes}
			{...listeners}
			role="listitem"
			aria-label={favourite.url}
		>
			<CardContent
				sx={{
					flexGrow: 1,
					display: "flex",
					alignItems: "center",
				}}
			>
				<Stack direction="column" spacing={1}>
					{favourite.personal && (
						<Stack direction="row">
							<Chip
								label="Personal"
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
							}}
							component={Link}
							href={favourite.url}
							target="_blank"
							rel="noreferrer noopener nofollow"
							onPointerDown={(e) => e.stopPropagation()}
						>
							{favourite.personal && (
								<Tooltip
									title={t("pages.favourite.personal")}
									sx={{ margin: 0 }}
								>
									<IconButton sx={{ cursor: "default", mr: 1 }}>
										<LockPersonIcon
											fontSize="small"
											color="primary"
											sx={{ margin: 0 }}
										/>
									</IconButton>
								</Tooltip>
							)}
							{favourite.title}
						</Box>
					</Tooltip>
				</Stack>
			</CardContent>

			<CardActions
				sx={{
					paddingInlineStart: 0,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "space-between",
					"& button ~ button": {
						margin: 0,
					},
				}}
			>
				<IconButton
					size="small"
					onClick={handleToggleSuperFavourite}
					onPointerDown={(e) => e.stopPropagation()}
					disabled={
						!favourite.isSuperFavorite && superFavouriteResources?.length === 9
					}
					aria-label={t(
						favourite.isSuperFavorite
							? "pages.favourite.unpin"
							: "pages.favourite.pin",
						{ url: favourite.url },
					)}
				>
					{favourite.isSuperFavorite ? (
						<PushPinIcon />
					) : (
						<PushPinOutlinedIcon />
					)}
				</IconButton>

				{!favourite.isSuperFavorite && (
					<IconButton
						onClick={() => setFavouriteToDelete(favourite)}
						onPointerDown={(e) => e.stopPropagation()}
						size="small"
						aria-label={t("pages.favourite.delete", { url: favourite.url })}
					>
						<DeleteOutlineIcon />
					</IconButton>
				)}
			</CardActions>
		</Card>
	);
}

export default FavouriteListItem;
