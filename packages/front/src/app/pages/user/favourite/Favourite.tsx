import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import CustomButton from "../../../components/element/button/CustomButton";
import PersonalBookmark from "../../../components/element/dialog/PersonalBookmark";
import PageTitle from "../../../components/internal/PageTitle";
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

	const [personal, setPersonal] = useState(false);

	const handleAddPersonalOpen = () => {
		setPersonal(true);
	};

	const handlerAddPersonalClose = () => {
		setPersonal(false);
	};

	return (
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
					<CustomButton onClick={handleAddPersonalOpen}>
						{t("pages.favourite.add")}
					</CustomButton>
				</Typography>

				<FavouriteList
					favourites={favouriteResources}
					handleMove={moveFavourite}
				/>
			</Stack>
		</Stack>
	);
};

export default Favourite;
