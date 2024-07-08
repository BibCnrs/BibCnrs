import { arrayMove } from "@dnd-kit/sortable";
import { useCallback, useMemo } from "react";
import { useBibContext } from "../../../context/BibContext";
import { useMatomo } from "../../../shared/matomo";
import type { FavouriteResourceDataType } from "../../../shared/types/data.types";
import { uuidv7 } from "../../../shared/uuidv7";

export function useFavourites() {
	const {
		session: { user },
		updateFavouriteResources,
	} = useBibContext();
	const { trackEvent } = useMatomo();

	const favourites = useMemo(() => {
		return (user?.favouriteResources || []).map((favourite) => ({
			...favourite,
			id: favourite.id || uuidv7(),
		}));
	}, [user]);

	const { favouriteResources, superFavouriteResources } = useMemo(() => {
		return {
			favouriteResources: favourites.filter(
				(favourite) => !favourite.isSuperFavorite,
			),
			superFavouriteResources: favourites.filter(
				(favourite) => favourite.isSuperFavorite,
			),
		};
	}, [favourites]);

	const addFavourite = useCallback(
		(favourite: Omit<FavouriteResourceDataType, "id" | "superFavourite">) => {
			updateFavouriteResources([
				...superFavouriteResources,
				{
					...favourite,
					id: uuidv7(),
					isSuperFavorite: false,
				},
				...favouriteResources,
			]);
		},
		[favouriteResources, superFavouriteResources, updateFavouriteResources],
	);

	const removeFavourite = useCallback(
		({ url, title }: Pick<FavouriteResourceDataType, "url" | "title">) => {
			updateFavouriteResources(
				favourites.filter((value) => {
					return value.title !== title || value.url !== url;
				}),
			);
		},
		[favourites, updateFavouriteResources],
	);

	const moveFavourite = useCallback(
		(oldIndex: number, newIndex: number) => {
			updateFavouriteResources([
				...superFavouriteResources,
				...arrayMove(favouriteResources, oldIndex, newIndex),
			]);
		},
		[favouriteResources, superFavouriteResources, updateFavouriteResources],
	);

	const addSuperFavourite = useCallback(
		(favourite: FavouriteResourceDataType) => {
			trackEvent("Favourite", "Pin Favourite", favourite.title);
			updateFavouriteResources([
				...superFavouriteResources,
				{
					...favourite,
					isSuperFavorite: true,
				},
				...favouriteResources.filter(({ id }) => id !== favourite.id),
			]);
		},
		[
			favouriteResources,
			superFavouriteResources,
			updateFavouriteResources,
			trackEvent,
		],
	);

	const removeSuperFavourite = useCallback(
		(favourite: FavouriteResourceDataType) => {
			updateFavouriteResources([
				...superFavouriteResources.filter(({ id }) => id !== favourite.id),
				{
					...favourite,
					isSuperFavorite: false,
				},
				...favouriteResources,
			]);
		},
		[favouriteResources, superFavouriteResources, updateFavouriteResources],
	);

	const moveSuperFavourite = useCallback(
		(oldIndex: number, newIndex: number) => {
			updateFavouriteResources([
				...arrayMove(superFavouriteResources, oldIndex, newIndex),
				...favouriteResources,
			]);
		},
		[favouriteResources, superFavouriteResources, updateFavouriteResources],
	);

	return {
		allFavourites: favourites,
		favouriteResources,
		superFavouriteResources,
		addFavourite,
		removeFavourite,
		moveFavourite,
		addSuperFavourite,
		removeSuperFavourite,
		moveSuperFavourite,
	};
}
