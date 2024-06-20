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
	rectSortingStrategy,
	sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Box } from "@mui/material";
import { useMemo } from "react";
import type { FavouriteResourceDataType } from "../../../shared/types/data.types";
import FavouriteListItem from "./FavouriteListItem";
import type { useFavourites } from "./useFavourites";

type FavouriteListProps = {
	favourites: FavouriteResourceDataType[];
	handleMove: ReturnType<typeof useFavourites>[
		| "moveFavourite"
		| "moveSuperFavourite"];
};

function FavouriteList({ favourites, handleMove }: FavouriteListProps) {
	const identifiers = useMemo(
		() => favourites.map((favourite) => favourite.id),
		[favourites],
	);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const oldIndex = identifiers.indexOf(active.id);
			const newIndex = identifiers.indexOf(over.id);
			handleMove(oldIndex, newIndex);
		}
	};

	return (
		<DndContext
			sensors={sensors}
			onDragEnd={handleDragEnd}
			collisionDetection={closestCenter}
			modifiers={[restrictToWindowEdges]}
		>
			<SortableContext items={identifiers} strategy={rectSortingStrategy}>
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "repeat(3, 1fr)",
						gridAutoRows: "1fr",
						gap: 2,
					}}
				>
					{favourites.map((favourite) => (
						<FavouriteListItem key={favourite.id} favourite={favourite} />
					))}
				</Box>
			</SortableContext>
		</DndContext>
	);
}

export default FavouriteList;
