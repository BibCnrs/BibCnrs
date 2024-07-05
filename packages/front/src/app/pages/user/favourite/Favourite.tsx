import { Button, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useMemo, useState } from "react";
import PersonalBookmark from "../../../components/element/dialog/PersonalBookmark";
import PageTitle from "../../../components/internal/PageTitle";
import SearchBar from "../../../components/page/searchbar/SearchBar";
import { useTranslator } from "../../../shared/locales/I18N";
import type { FavouriteResourceDataType } from "../../../shared/types/data.types";
import FavouriteList from "./FavouriteList";
import { useFavourites } from "./useFavourites";

type FavouriteFilter = {
	title: string | null;
};

const Favourite = () => {
	const t = useTranslator();
	const {
		favouriteResources,
		superFavouriteResources,
		moveFavourite,
		moveSuperFavourite,
	} = useFavourites();

	const [filters, setFilters] = useState<FavouriteFilter>({ title: null });
	const [personal, setPersonal] = useState(false);

	const handleAddPersonalOpen = () => {
		setPersonal(true);
	};

	const handlerAddPersonalClose = () => {
		setPersonal(false);
	};

	const hasFilter = useMemo(() => {
		return Object.values(filters).some((filter) => filter != null);
	}, [filters]);

	const filterFavoriteResource = useCallback(
		(resources: FavouriteResourceDataType[]) => {
			if (!filters.title) {
				return resources;
			}

			const lowerCaseSearch = filters.title.toLowerCase();
			return resources.filter((favourite) =>
				favourite.title.toLowerCase().includes(lowerCaseSearch),
			);
		},
		[filters],
	);

	const filteredFavouriteResources = filterFavoriteResource(favouriteResources);
	const filteredSuperFavouriteResources = filterFavoriteResource(
		superFavouriteResources,
	);

	return (
		<>
			<PageTitle page="favourite" />
			<SearchBar
				placeholder={t("pages.favourite.search")}
				value={filters.title}
				onSearch={(search: string) =>
					setFilters((filters) => ({
						...filters,
						title: search?.toLocaleLowerCase() ?? null,
					}))
				}
			/>

			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
				<Stack gap={2} id="app">
					<Stack gap={1}>
						<Typography
							variant="h2"
							sx={{
								fontSize: 24,
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							{t("pages.favourite.superFavourites")}
						</Typography>

						<FavouriteList
							favourites={filteredSuperFavouriteResources}
							handleMove={moveSuperFavourite}
							hasFilter={hasFilter}
						/>
					</Stack>

					<Stack gap={1}>
						<Typography
							variant="h2"
							sx={{
								fontSize: 24,
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							{t("pages.favourite.title")}
							<Button onClick={handleAddPersonalOpen} color="primary">
								{t("pages.favourite.add")}
							</Button>
						</Typography>

						<FavouriteList
							favourites={filteredFavouriteResources}
							handleMove={moveFavourite}
							hasFilter={hasFilter}
						/>
					</Stack>
				</Stack>
			</Container>
			<PersonalBookmark open={personal} onClose={handlerAddPersonalClose} />
		</>
	);
};

export default Favourite;
