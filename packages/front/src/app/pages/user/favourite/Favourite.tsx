import {
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Stack,
	Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useMemo, useState } from "react";
import PersonalBookmark from "../../../components/element/dialog/PersonalBookmark";
import PageTitle from "../../../components/internal/PageTitle";
import SearchBar from "../../../components/page/searchbar/SearchBar";
import { useTranslator } from "../../../shared/locales/I18N";
import type { FavouriteResourceDataType } from "../../../shared/types/data.types";
import FavouriteList from "./FavouriteList";
import { useFavourites } from "./useFavourites";

type BooleanFavoriteFilter = Record<
	FavouriteResourceDataType["source"],
	boolean | null
>;

type FavouriteFilter = { title: string | null } & BooleanFavoriteFilter;

const BOOLEAN_FILTERS: (keyof BooleanFavoriteFilter)[] = [
	"article",
	"publication",
	"database",
	"metadore",
	"personal",
];

const Favourite = () => {
	const t = useTranslator();
	const {
		favouriteResources,
		superFavouriteResources,
		moveFavourite,
		moveSuperFavourite,
	} = useFavourites();

	const [filters, setFilters] = useState<FavouriteFilter>({
		title: null,
		article: null,
		publication: null,
		database: null,
		metadore: null,
		personal: null,
	});
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
			if (!hasFilter) {
				return resources;
			}

			return resources.filter((favourite) => {
				if (
					filters.title != null &&
					!favourite.title.toLowerCase().includes(filters.title)
				) {
					return false;
				}

				const activeBooleanFilters = BOOLEAN_FILTERS.filter(
					(filter) => filters[filter] != null,
				);
				if (activeBooleanFilters.length === 0) {
					return true;
				}

				return activeBooleanFilters.some(
					(filter) => favourite.source === filter,
				);
			});
		},
		[filters, hasFilter],
	);

	const filteredFavouriteResources = filterFavoriteResource(favouriteResources);
	const filteredSuperFavouriteResources = filterFavoriteResource(
		superFavouriteResources,
	);

	const handleFilter = (filter: string) => {
		setFilters((filters) => ({
			...filters,
			[filter]: filters[filter] ? null : true,
		}));
	};

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
				<Grid container spacing={4}>
					<Grid item xs={12} md={4} lg={3}>
						<Stack>
							<Typography variant="h6" fontWeight="bold">
								{t("pages.favourite.filters.title")}
							</Typography>

							{BOOLEAN_FILTERS.map((key) => (
								<FormControlLabel
									key={key}
									control={<Checkbox checked={filters[key]} />}
									label={t(`pages.favourite.filters.${key}`)}
									onChange={() => handleFilter(key)}
								/>
							))}
						</Stack>
					</Grid>

					<Grid item xs={12} md={8} lg={9}>
						<Stack gap={2}>
							<Stack gap={1}>
								<Typography variant="h6" fontWeight="bold">
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
									variant="h6"
									fontWeight="bold"
									sx={{
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
					</Grid>
				</Grid>
			</Container>
			<PersonalBookmark open={personal} onClose={handlerAddPersonalClose} />
		</>
	);
};

export default Favourite;
