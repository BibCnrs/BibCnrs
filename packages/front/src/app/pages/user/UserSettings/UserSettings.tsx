import {
	FormControlLabel,
	Switch,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useMutation } from "@tanstack/react-query";
import PageTitle from "../../../components/internal/PageTitle";
import { FakeSearchBar } from "../../../components/page/searchbar/FakeSearchBar";
import { useBibContext } from "../../../context/BibContext";
import { updateSettings } from "../../../services/user/UserSettings";
import { useTranslator } from "../../../shared/locales/I18N";
import { useMatomo } from "../../../shared/matomo";
import type { UserSettingsDataType } from "../../../shared/types/data.types";

const UserSettings = () => {
	const {
		session: { user },
		updateUserSettings,
	} = useBibContext();
	const t = useTranslator();
	const { trackEvent } = useMatomo();

	const mutation = useMutation({
		mutationFn: updateSettings,
		onSuccess: (data: UserSettingsDataType) => {
			updateUserSettings(data);
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const handleSwitchChange = (event) => {
		mutation.mutate({
			userId: user.id,
			[event.target.name]: event.target.checked,
		});
		trackEvent(
			"UserSettings",
			event.target.name,
			event.target.checked ? "on" : "off",
		);
	};

	const handleToggleChange =
		(property: keyof typeof user.settings) => (_, newToggleValue) => {
			if (newToggleValue === null) return;

			mutation.mutate({
				userId: user.id,
				[property]: newToggleValue,
			});

			trackEvent("UserSettings", property, newToggleValue);
		};

	return (
		<>
			<PageTitle page="userSettings" />
			<FakeSearchBar title={t("pages.userSettings.title")} />
			<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
				<Stack gap={4}>
					<Box>
						<Typography variant="h5" gutterBottom color="primary">
							{t("pages.userSettings.homeSection.title")}
						</Typography>
						<Typography variant="body1" gutterBottom>
							{t("pages.userSettings.homeSection.description")}
						</Typography>
						<Stack gap={2}>
							<FormControlLabel
								control={
									<Switch
										checked={user.settings.displayFavorites}
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
										checked={user.settings.displayTestNews}
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
						<Typography variant="h5" gutterBottom color="primary">
							{t("pages.userSettings.searchSection.title")}
						</Typography>
						<Typography variant="body1" gutterBottom>
							{t("pages.userSettings.searchSection.description")}
						</Typography>
						<ToggleButtonGroup
							value={user.settings.defaultSearchMode}
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
						<Typography variant="h5" gutterBottom color="primary">
							{t("pages.userSettings.generalSection.title")}
						</Typography>
						<Typography variant="body1" gutterBottom>
							{t("pages.userSettings.generalSection.descriptionLanguage")}
						</Typography>
						<ToggleButtonGroup
							value={user.settings.defaultLanguage}
							exclusive
							onChange={handleToggleChange("defaultLanguage")}
							aria-label={t(
								"pages.userSettings.generalSection.descriptionLanguage",
							)}
							color="primary"
						>
							<ToggleButton
								value="auto"
								aria-label={t("pages.userSettings.generalSection.systemLang")}
							>
								{t("pages.userSettings.generalSection.systemLang")}
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
							value={user.settings.defaultTheme}
							exclusive
							onChange={handleToggleChange("defaultTheme")}
							aria-label={t(
								"pages.userSettings.generalSection.descriptionTheme",
							)}
							color="primary"
						>
							<ToggleButton
								value="auto"
								aria-label={t("pages.userSettings.generalSection.systemTheme")}
							>
								{t("pages.userSettings.generalSection.systemTheme")}
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
		</>
	);
};
export default UserSettings;
