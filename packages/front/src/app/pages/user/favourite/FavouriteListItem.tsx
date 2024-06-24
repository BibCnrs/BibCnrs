import { useSortable } from "@dnd-kit/sortable";
import { CSS as DndCSS } from "@dnd-kit/utilities";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import {
	Box,
	Card,
	CardActions,
	CardContent,
	IconButton,
	Link,
	Tooltip,
} from "@mui/material";
import type { FavouriteResourceDataType } from "../../../shared/types/data.types";
import { useFavourites } from "./useFavourites";

type FavouriteListItemProps = {
	favourite: FavouriteResourceDataType;
};

function FavouriteListItem({ favourite }: FavouriteListItemProps) {
	const {
		superFavouriteResources,
		removeFavourite,
		addSuperFavourite,
		removeSuperFavourite,
	} = useFavourites();

	const {
		attributes,
		listeners,
		setNodeRef,
		setActivatorNodeRef,
		transform,
		transition,
	} = useSortable({ id: favourite.id });

	if (!favourite) {
		return null;
	}

	const handleDelete = () => {
		removeFavourite(favourite);
	};

	const handleToggleSuperFavourite = () => {
		if (favourite.isSuperFavorite) {
			removeSuperFavourite(favourite);
		} else {
			addSuperFavourite(favourite);
		}
	};

	return (
		<Card
			color={favourite.personal ? "#00FFFF" : undefined}
			ref={setNodeRef}
			sx={{
				transform: DndCSS.Transform.toString(transform),
				transition,
				display: "flex",
				flexDirection: "row",
				gap: 2,
			}}
			{...attributes}
		>
			<Box
				ref={setActivatorNodeRef}
				{...listeners}
				sx={{
					cursor: "grab",
					display: "flex",
					alignItems: "center",
				}}
			>
				<DragIndicatorIcon
					htmlColor={favourite.personal ? "#00FFFF" : "var(--table-border)"}
				/>
			</Box>

			<CardContent
				sx={{
					flexGrow: 1,
					paddingInline: 0,
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
						<Link
							href={favourite.url}
							target="_blank"
							rel="noreferrer noopener nofollow"
						>
							{favourite.title}
						</Link>
					</Box>
				</Tooltip>
			</CardContent>

			<CardActions
				sx={{
					paddingInlineStart: 0,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: favourite.isSuperFavorite
						? "flex-start"
						: "space-between",
					"& button ~ button": {
						margin: 0,
					},
				}}
			>
				<IconButton
					size="small"
					onClick={handleToggleSuperFavourite}
					disabled={
						!favourite.isSuperFavorite && superFavouriteResources?.length === 9
					}
				>
					{favourite.isSuperFavorite ? (
						<PushPinIcon />
					) : (
						<PushPinOutlinedIcon />
					)}
				</IconButton>

				{!favourite.isSuperFavorite && (
					<IconButton onClick={handleDelete} size="small">
						<DeleteOutlineIcon />
					</IconButton>
				)}
			</CardActions>
		</Card>
	);
}

export default FavouriteListItem;
