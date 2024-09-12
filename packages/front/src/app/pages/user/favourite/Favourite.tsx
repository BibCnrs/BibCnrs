import {
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Stack,
	Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useMemo, useState } from "react";
import PersonalBookmark from "../../../components/element/dialog/PersonalBookmark";
import PageTitle from "../../../components/internal/PageTitle";
import SearchBar from "../../../components/page/searchbar/SearchBar";
import { useTranslator } from "../../../shared/locales/I18N";
import type { FavouriteResourceDataType } from "../../../shared/types/data.types";
import FavouriteList from "./FavouriteList";
import { useFavourites } from "./useFavourites";

type BooleanFavoriteFilter = Record<
	Exclude<FavouriteResourceDataType["source"], "shared"> | "noSource",
	boolean | null
>;

type FavouriteFilter = {
	title: string | null;
	noSource: boolean;
} & BooleanFavoriteFilter;

const BOOLEAN_FILTERS: (keyof BooleanFavoriteFilter)[] = [
	"article",
	"publication",
	"database",
	"metadore",
	"personal",
	"noSource",
];

const INITIAL_FILTERS: FavouriteFilter = {
	title: null,
	article: null,
	publication: null,
	database: null,
	metadore: null,
	personal: null,
	noSource: null,
};

const Favourite = () => {
	const t = useTranslator();
	const {
		allFavourites,
		favouriteResources,
		superFavouriteResources,
		moveFavourite,
		moveSuperFavourite,
	} = useFavourites();

	const [filters, setFilters] = useState<FavouriteFilter>({
		...INITIAL_FILTERS,
	});
	const [personal, setPersonal] = useState(false);

	const handleAddPersonalOpen = () => {
		setPersonal(true);
	};

	const handlerAddPersonalClose = () => {
		setPersonal(false);
	};

	const handleFilter = (filter: string) => {
		setFilters((filters) => ({
			...filters,
			[filter]: filters[filter] ? null : true,
		}));
	};

	const resetSearch = () => {
		setFilters({ ...INITIAL_FILTERS });
	};

	const hasFilter = useMemo(() => {
		return Object.values(filters).some(
			(filter) => filter != null && filter !== "",
		);
	}, [filters]);

	useEffect(() => {
		const allTrue = BOOLEAN_FILTERS.every((filter) => filters[filter] === true);
		if (allTrue) {
			setFilters((filters) => ({
				...INITIAL_FILTERS,
				title: filters.title,
			}));
		}
	}, [filters]);

	const _filterByTitle = useCallback(
		(title: string) => {
			return (
				filters.title != null && !title.toLowerCase().includes(filters.title)
			);
		},
		[filters.title],
	);

	const filterFavoriteResource = useCallback(
		(resources: FavouriteResourceDataType[]) => {
			if (!hasFilter) {
				return resources;
			}

			return resources.filter((favourite) => {
				if (_filterByTitle(favourite.title)) {
					return false;
				}

				const activeBooleanFilters = BOOLEAN_FILTERS.filter(
					(filter) => filters[filter] != null,
				);
				if (activeBooleanFilters.length === 0) {
					return true;
				}

				return (
					activeBooleanFilters.some((filter) => favourite.source === filter) ||
					(filters.noSource === true && !favourite.source)
				);
			});
		},
		[filters, hasFilter, _filterByTitle],
	);

	const filteredFavouriteResources = filterFavoriteResource(favouriteResources);
	const filteredSuperFavouriteResources = filterFavoriteResource(
		superFavouriteResources,
	);

	const noSourceCount = allFavourites.filter(
		(favourite) => !favourite.source && !_filterByTitle(favourite.title),
	).length;

	return (
		<>
			<PageTitle page="favourite" />
			<SearchBar
				placeholder={t("pages.favourite.search")}
				value={filters.title ?? ""}
				onSearch={(search: string) =>
					setFilters((filters) => ({
						...filters,
						title: search?.toLocaleLowerCase() ?? null,
					}))
				}
				disableAutocomplete
				disableSearchButton
			/>

			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
				<Grid container spacing={4}>
					<Grid item xs={12} md={4} lg={3}>
						<Stack>
							<Typography variant="h6" fontWeight="bold">
								{t("pages.favourite.filters.title")}
							</Typography>

							{BOOLEAN_FILTERS.map((key) => {
								const count = allFavourites.filter((favourite) => {
									if (key === "noSource") {
										return (
											!favourite.source && !_filterByTitle(favourite.title)
										);
									}
									return (
										favourite.source === key && !_filterByTitle(favourite.title)
									);
								}).length;

								return (
									<FormControlLabel
										key={key}
										control={
											<Checkbox
												checked={filters[key] === true}
												disabled={count === 0}
											/>
										}
										label={t(`pages.favourite.filters.${key}`, {
											count,
										})}
										onChange={() => handleFilter(key)}
									/>
								);
							})}
							<Button
								color="error"
								sx={{
									mt: 2,
								}}
								onClick={resetSearch}
								size="small"
							>
								{t("pages.favourite.reset")}
							</Button>
						</Stack>
					</Grid>

					<Grid item xs={12} md={8} lg={9}>
						<Stack gap={2}>
							<Stack gap={1}>
								<Typography variant="h6" fontWeight="bold" color="primary">
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
									color="primary"
								>
									{t("pages.favourite.favourites")}
									<Button
										color="secondary"
										variant="contained"
										onClick={handleAddPersonalOpen}
										sx={{
											borderRadius: "20px",
											fontWeight: "bold",
											":hover": {
												backgroundColor: (theme) =>
													theme.palette.background.default,
												color: (theme) => theme.palette.text.primary,
												boxShadow: (theme) =>
													`inset 0 0 0 2px ${theme.palette.secondary.main}`,
											},
										}}
									>
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
