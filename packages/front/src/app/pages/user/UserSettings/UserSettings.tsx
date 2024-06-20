import {
	FormControlLabel,
	LinearProgress,
	Switch,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import {
	type UseQueryResult,
	keepPreviousData,
	useMutation,
	useQuery,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useBibContext } from "../../../context/BibContext";
import {
	type UserSettingsType,
	getSettings,
	updateSettings,
} from "../../../services/user/UserSettings";
import { useTranslator } from "../../../shared/locales/I18N";
import type { UserSettingsDataType } from "../../../shared/types/data.types";

const UserSettings = () => {
	const {
		session: { user },
		updateUserSettings,
	} = useBibContext();
	const t = useTranslator();

	const { data, isLoading } = useQuery<UserSettingsType>({
		queryKey: ["user_settings"],
		queryFn: () => getSettings(user.id),
		placeholderData: keepPreviousData,
	}) as UseQueryResult<UserSettingsType, unknown>;

	const mutation = useMutation({
		mutationFn: updateSettings,
		onSuccess: (data: UserSettingsDataType) => {
			updateUserSettings(data);
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const [switchState, setSwitchState] = useState({
		displayFavorites: false,
		displayTestNews: false,
	});

	const [toggleState, setToggleState] = useState({
		defaultSearchMode: "article",
		defaultLanguage: "auto",
		defaultTheme: "auto",
	});

	useEffect(() => {
		if (data) {
			setSwitchState({
				displayFavorites: data.displayFavorites,
				displayTestNews: data.displayTestNews,
			});

			setToggleState({
				defaultSearchMode: data.defaultSearchMode,
				defaultLanguage: data.defaultLanguage,
				defaultTheme: data.defaultTheme,
			});
		}
	}, [data]);

	const handleSwitchChange = (event) => {
		setSwitchState({
			...switchState,
			[event.target.name]: event.target.checked,
		});
		mutation.mutate({
			userId: user.id,
			[event.target.name]: event.target.checked,
		});
	};

	const handleToggleChange =
		(property: keyof typeof toggleState) => (_, newToggleValue) => {
			if (newToggleValue === null) return;
			setToggleState((prevState) => ({
				...prevState,
				[property]: newToggleValue,
			}));
			mutation.mutate({
				userId: user.id,
				[property]: newToggleValue,
			});
		};

	if (isLoading) {
		return (
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
				<LinearProgress color="primary" />
			</Container>
		);
	}

	return (
		<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
			<Typography variant="h4" gutterBottom>
				{t("pages.userSettings.title")}
			</Typography>
			<Stack gap={4}>
				<Box>
					<Typography variant="h5" gutterBottom>
						{t("pages.userSettings.homeSection.title")}
					</Typography>
					<Typography variant="body1" gutterBottom>
						{t("pages.userSettings.homeSection.description")}
					</Typography>
					<Stack gap={2}>
						<FormControlLabel
							control={
								<Switch
									checked={switchState.displayFavorites}
									onChange={handleSwitchChange}
									name="displayFavorites"
									aria-label={t(
										"pages.userSettings.homeSection.displayFavorites",
									)}
								/>
							}
							label={t("pages.userSettings.homeSection.displayFavorites")}
						/>
						<FormControlLabel
							control={
								<Switch
									checked={switchState.displayTestNews}
									onChange={handleSwitchChange}
									name="displayTestNews"
									aria-label={t(
										"pages.userSettings.homeSection.displayTestNews",
									)}
								/>
							}
							label={t("pages.userSettings.homeSection.displayTestNews")}
						/>
					</Stack>
				</Box>

				<Box>
					<Typography variant="h5" gutterBottom>
						{t("pages.userSettings.searchSection.title")}
					</Typography>
					<Typography variant="body1" gutterBottom>
						{t("pages.userSettings.searchSection.description")}
					</Typography>
					<ToggleButtonGroup
						value={toggleState.defaultSearchMode}
						exclusive
						onChange={handleToggleChange("defaultSearchMode")}
						aria-label={t("pages.userSettings.searchSection.description")}
						color="primary"
					>
						<ToggleButton
							value="article"
							aria-label={t("pages.userSettings.searchSection.article")}
						>
							{t("pages.userSettings.searchSection.article")}
						</ToggleButton>
						<ToggleButton
							value="journal"
							aria-label={t("pages.userSettings.searchSection.journal")}
						>
							{t("pages.userSettings.searchSection.journal")}
						</ToggleButton>
						<ToggleButton
							value="platform"
							aria-label={t("pages.userSettings.searchSection.platform")}
						>
							{t("pages.userSettings.searchSection.platform")}
						</ToggleButton>
						<ToggleButton
							value="searchData"
							aria-label={t("pages.userSettings.searchSection.searchData")}
						>
							{t("pages.userSettings.searchSection.searchData")}
						</ToggleButton>
					</ToggleButtonGroup>
				</Box>

				<Box>
					<Typography variant="h5" gutterBottom>
						{t("pages.userSettings.generalSection.title")}
					</Typography>
					<Typography variant="body1" gutterBottom>
						{t("pages.userSettings.generalSection.descriptionLanguage")}
					</Typography>
					<ToggleButtonGroup
						value={toggleState.defaultLanguage}
						exclusive
						onChange={handleToggleChange("defaultLanguage")}
						aria-label={t(
							"pages.userSettings.generalSection.descriptionLanguage",
						)}
						color="primary"
					>
						<ToggleButton
							value="auto"
							aria-label={t("pages.userSettings.generalSection.auto")}
						>
							{t("pages.userSettings.generalSection.auto")}
						</ToggleButton>
						<ToggleButton
							value="fr"
							aria-label={t("pages.userSettings.generalSection.fr")}
						>
							{t("pages.userSettings.generalSection.fr")}
						</ToggleButton>
						<ToggleButton
							value="en"
							aria-label={t("pages.userSettings.generalSection.en")}
						>
							{t("pages.userSettings.generalSection.en")}
						</ToggleButton>
					</ToggleButtonGroup>

					<Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
						{t("pages.userSettings.generalSection.descriptionTheme")}
					</Typography>
					<ToggleButtonGroup
						value={toggleState.defaultTheme}
						exclusive
						onChange={handleToggleChange("defaultTheme")}
						aria-label={t("pages.userSettings.generalSection.descriptionTheme")}
						color="primary"
					>
						<ToggleButton
							value="auto"
							aria-label={t("pages.userSettings.generalSection.auto")}
						>
							{t("pages.userSettings.generalSection.auto")}
						</ToggleButton>
						<ToggleButton
							value="light"
							aria-label={t("pages.userSettings.generalSection.light")}
						>
							{t("pages.userSettings.generalSection.light")}
						</ToggleButton>
						<ToggleButton
							value="dark"
							aria-label={t("pages.userSettings.generalSection.dark")}
						>
							{t("pages.userSettings.generalSection.dark")}
						</ToggleButton>
					</ToggleButtonGroup>
				</Box>
			</Stack>
		</Container>
	);
};
export default UserSettings;
