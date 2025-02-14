import {
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import {
	SortableContext,
	arrayMove,
	rectSortingStrategy,
	sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useTranslator } from "../../../shared/locales/I18N";
import type { FavouriteResourceDataType } from "../../../shared/types/data.types";
import FavouriteListItem from "./FavouriteListItem";
import { useFavourites } from "./useFavourites";

type FavouriteListProps = {
	favourites: FavouriteResourceDataType[];
	handleMove: ReturnType<typeof useFavourites>[
		| "moveFavourite"
		| "moveSuperFavourite"];
	hasFilter: boolean;
};

function FavouriteList({
	favourites,
	handleMove,
	hasFilter,
}: FavouriteListProps) {
	const t = useTranslator();
	const [favouriteToDelete, setFavouriteToDelete] = useState(null);
	const identifiers = useMemo(
		() => favourites.map((favourite) => favourite.id),
		[favourites],
	);

	const [localeFavourites, setLocaleFavourites] =
		useState<FavouriteResourceDataType[]>(favourites);

	useEffect(() => {
		setLocaleFavourites(favourites);
	}, [favourites]);

	const { removeFavourite } = useFavourites();

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleDragEnd = (event: DragEndEvent) => {
		if (hasFilter) {
			return;
		}

		const { active, over } = event;

		if (over && active.id !== over.id) {
			const oldIndex = identifiers.indexOf(active.id);
			const newIndex = identifiers.indexOf(over.id);
			// reorder favourites locally to avoid async lag
			setLocaleFavourites(arrayMove(localeFavourites, oldIndex, newIndex));
			// trigger the async operation
			handleMove(oldIndex, newIndex);
		}
	};

	const handleDelete = () => {
		removeFavourite(favouriteToDelete);
		setFavouriteToDelete(null);
	};

	if (localeFavourites.length === 0) {
		return (
			<Typography
				variant="h6"
				component="h2"
				sx={{
					color: "text.disabled",
				}}
			>
				{t("pages.favourite.emptyFavorites")}
			</Typography>
		);
	}

	return (
		<Box
			sx={{
				display: "grid",
				gridTemplateColumns: {
					xs: "repeat(1, 1fr)",
					md: "repeat(2, 1fr)",
					lg: "repeat(3, 1fr)",
				},
				gridAutoRows: "1fr",
				gap: 2,
			}}
		>
			<DndContext
				sensors={sensors}
				onDragEnd={handleDragEnd}
				collisionDetection={closestCenter}
				modifiers={[restrictToWindowEdges]}
			>
				<SortableContext
					items={identifiers}
					strategy={rectSortingStrategy}
					disabled={hasFilter}
				>
					{localeFavourites.map((favourite) => (
						<FavouriteListItem
							key={favourite.id}
							favourite={favourite}
							setFavouriteToDelete={setFavouriteToDelete}
							hasFilter={hasFilter}
						/>
					))}
				</SortableContext>
			</DndContext>
			<Dialog
				open={favouriteToDelete !== null}
				onClose={() => setFavouriteToDelete(null)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{t("pages.favourite.confirmDelete.title")}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{t("pages.favourite.confirmDelete.description")}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setFavouriteToDelete(null)}>
						{t("pages.favourite.confirmDelete.cancel")}
					</Button>
					<Button onClick={handleDelete} autoFocus variant="contained">
						{t("pages.favourite.confirmDelete.confirm")}
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}

export default FavouriteList;
