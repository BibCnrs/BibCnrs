import { arrayMove } from "@dnd-kit/sortable";
import { useCallback, useMemo } from "react";
import { useBibContext } from "../../../context/BibContext";
import type { FavouriteResourceDataType } from "../../../shared/types/data.types";

function uuidv7() {
	// random bytes
	const value = new Uint8Array(16);
	crypto.getRandomValues(value);

	// current timestamp in ms
	const timestamp = BigInt(Date.now());

	// timestamp
	value[0] = Number((timestamp >> 40n) & 0xffn);
	value[1] = Number((timestamp >> 32n) & 0xffn);
	value[2] = Number((timestamp >> 24n) & 0xffn);
	value[3] = Number((timestamp >> 16n) & 0xffn);
	value[4] = Number((timestamp >> 8n) & 0xffn);
	value[5] = Number(timestamp & 0xffn);

	// version and variant
	value[6] = (value[6] & 0x0f) | 0x70;
	value[8] = (value[8] & 0x3f) | 0x80;

	return Array.from(value)
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
}

export function useFavourites() {
	const {
		session: { user },
		updateFavouriteResources,
	} = useBibContext();

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
			console.log("addSuperFavourite");
			updateFavouriteResources([
				...superFavouriteResources,
				{
					...favourite,
					isSuperFavorite: true,
				},
				...favouriteResources.filter(({ id }) => id !== favourite.id),
			]);
		},
		[favouriteResources, superFavouriteResources, updateFavouriteResources],
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
