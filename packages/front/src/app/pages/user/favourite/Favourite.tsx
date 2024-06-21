import {
	DndContext,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import {
	restrictToVerticalAxis,
	restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
	SortableContext,
	arrayMove,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import PersonalBookmark from "../../../components/element/dialog/PersonalBookmark";
import SortableFavourite from "../../../components/element/dnd/SortableFavourite";
import PageTitle from "../../../components/internal/PageTitle";
import { FakeSearchBar } from "../../../components/page/searchbar/FakeSearchBar";
import { useFavouriteResources } from "../../../shared/hook";
import { useTranslator } from "../../../shared/locales/I18N";
import type { FavouriteResourceWithId } from "../../../shared/types/types";

const Favourite = () => {
	const t = useTranslator();
	const { favouritesWithId, removeFavourite, moveFavourite } =
		useFavouriteResources();

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const [items, setItems] = useState<UniqueIdentifier[]>([]);
	const [personal, setPersonal] = useState(false);

	useEffect(() => {
		setItems(favouritesWithId.map((value) => value.id));
	}, [favouritesWithId]);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over) {
			if (active.id !== over.id) {
				setItems((identifiers) => {
					const oldIndex = identifiers.indexOf(active.id);
					const newIndex = identifiers.indexOf(over.id);

					moveFavourite(favouritesWithId[oldIndex], oldIndex, newIndex);

					return arrayMove(identifiers, oldIndex, newIndex);
				});
			}
		}
	};

	const handleDelete = (entry: FavouriteResourceWithId) => {
		removeFavourite(entry);
	};

	const handleAddPersonalOpen = () => {
		setPersonal(true);
	};

	const handlerAddPersonalClose = () => {
		setPersonal(false);
	};

	return (
		<>
			<PageTitle page="licences" />
			<FakeSearchBar title={t("pages.favourite.title")} />
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
				<PersonalBookmark open={personal} onClose={handlerAddPersonalClose} />
				<Button variant="contained" onClick={handleAddPersonalOpen}>
					{t("pages.favourite.add")}
				</Button>
				<DndContext
					sensors={sensors}
					onDragEnd={handleDragEnd}
					collisionDetection={closestCenter}
					modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
				>
					<SortableContext items={items} strategy={verticalListSortingStrategy}>
						<div>
							{items.map((id) => {
								return (
									<SortableFavourite key={id} id={id} onDelete={handleDelete} />
								);
							})}
						</div>
					</SortableContext>
				</DndContext>
			</Container>
		</>
	);
};

export default Favourite;
