import { Button, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import PersonalBookmark from "../../../components/element/dialog/PersonalBookmark";
import PageTitle from "../../../components/internal/PageTitle";
import { FakeSearchBar } from "../../../components/page/searchbar/FakeSearchBar";
import { useTranslator } from "../../../shared/locales/I18N";
import FavouriteList from "./FavouriteList";
import { useFavourites } from "./useFavourites";

const Favourite = () => {
	const t = useTranslator();
	const {
		favouriteResources,
		superFavouriteResources,
		moveFavourite,
		moveSuperFavourite,
	} = useFavourites();

	console.log(favouriteResources);

	const [personal, setPersonal] = useState(false);

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
				<Stack gap={2} id="app">
					<PageTitle page="favourite" />
					<PersonalBookmark open={personal} onClose={handlerAddPersonalClose} />

					<Stack gap={1}>
						<Typography
							variant="h1"
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
							favourites={superFavouriteResources}
							handleMove={moveSuperFavourite}
						/>
					</Stack>

					<Stack gap={1}>
						<Typography
							variant="h1"
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
							favourites={favouriteResources}
							handleMove={moveFavourite}
						/>
					</Stack>
				</Stack>
			</Container>
		</>
	);
};

export default Favourite;
