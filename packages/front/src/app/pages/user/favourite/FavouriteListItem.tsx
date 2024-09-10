import { useSortable } from "@dnd-kit/sortable";
import { CSS as DndCSS } from "@dnd-kit/utilities";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DragIndicator from "@mui/icons-material/DragIndicator";
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
import { Stack, styled } from "@mui/system";
import { useTranslator } from "../../../shared/locales/I18N";
import type { FavouriteResourceDataType } from "../../../shared/types/data.types";
import { useFavourites } from "./useFavourites";

type FavouriteListItemProps = {
	favourite: FavouriteResourceDataType;
	setFavouriteToDelete: (favourite: FavouriteResourceDataType) => void;
	hasFilter: boolean;
};

// Define keyframes for up and down movement
const upAndDown = `
  @keyframes upAndDown {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
`;

const StyledPinIconButton = styled(IconButton)`
  ${upAndDown} // Include the keyframes in the component

  svg {
    transition: transform 1s ease-in-out;
  }

  &:hover {
    animation: upAndDown 1s ease-in-out infinite; // Apply the up and down animation
    svg {
      transform: rotate(40deg); // Rotate the icon on hover
    }
  }
`;

// Define keyframes for the shaky animation
const shakeAnimation = `
  @keyframes shake {
    0%, 100% {
      transform: rotate(0deg);
    }
    10%, 30%, 50%, 70%, 90% {
      transform: rotate(-10deg);
    }
    20%, 40%, 60%, 80% {
      transform: rotate(10deg);
    }
  }
`;

// Styled IconButton with shaky animation on hover
const ShakyIconButton = styled(IconButton)`
  ${shakeAnimation} // Include the keyframes in the component

  &:hover {
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  }
`;

function FavouriteListItem({
	favourite,
	setFavouriteToDelete,
	hasFilter,
}: FavouriteListItemProps) {
	const t = useTranslator();

	const { superFavouriteResources, addSuperFavourite, removeSuperFavourite } =
		useFavourites();

	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: favourite.id, animateLayoutChanges: () => false });

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
			elevation={3}
			sx={{
				transform: DndCSS.Transform.toString(transform),
				transition,
				display: "flex",
				flexDirection: "row",
				gap: 2,
				"&:hover": {
					backgroundColor: hasFilter ? "#fff" : undefined,
				},
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
					<Stack direction="row">
						<IconButton
							disabled={hasFilter}
							ref={setNodeRef}
							disableRipple
							edge="start"
							aria-label={t("components.dnd.handler", {
								title: favourite.title,
							})}
							sx={{
								paddingTop: 0,
								cursor: "grab",
								":hover:active": {
									cursor: "grabbing",
								},
							}}
							{...attributes}
							{...listeners}
						>
							<DragIndicator />
						</IconButton>
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
					</Stack>

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
				<StyledPinIconButton
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
					color="primary"
				>
					{favourite.isSuperFavorite ? (
						<PushPinIcon />
					) : (
						<PushPinOutlinedIcon />
					)}
				</StyledPinIconButton>

				{!favourite.isSuperFavorite && (
					<ShakyIconButton
						onClick={() => setFavouriteToDelete(favourite)}
						onPointerDown={(e) => e.stopPropagation()}
						size="small"
						aria-label={t("pages.favourite.delete", { url: favourite.url })}
					>
						<DeleteOutlineIcon />
					</ShakyIconButton>
				)}
			</CardActions>
		</Card>
	);
}

export default FavouriteListItem;
