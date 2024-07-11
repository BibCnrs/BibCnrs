import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createQuery } from "../../../services/Environment";
import type { FavouriteResourceDataType } from "../../../shared/types/data.types";

export function useSharedFavourites() {
	return useQuery<FavouriteResourceDataType[]>({
		queryKey: ["favourites", "shared"],
		queryFn: async () => {
			const query = createQuery("/front/favourite_resources/revues");

			const response: Response = await fetch(query, {
				credentials: "include",
			});

			return await response.json();
		},
		placeholderData: keepPreviousData,
		staleTime: 3600000, // 1 hour of cache
		gcTime: 3600000, // 1000 * 60 * 60
	});
}
