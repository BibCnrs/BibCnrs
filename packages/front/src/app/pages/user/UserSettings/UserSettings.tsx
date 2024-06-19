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
import { getUser } from "../../../services/user/Session";
import {
	type UserSettingsType,
	getSettings,
	updateSettings,
} from "../../../services/user/UserSettings";
import { useTranslator } from "../../../shared/locales/I18N";

const UserSettings = () => {
	const user = getUser();

	const t = useTranslator();

	const { data, isLoading } = useQuery<UserSettingsType>({
		queryKey: ["user_settings"],
		queryFn: () => getSettings(user.id),
		placeholderData: keepPreviousData,
	}) as UseQueryResult<UserSettingsType, unknown>;

	const mutation = useMutation({
		mutationFn: updateSettings,
		onSuccess: (data) => {
			console.log(data);
		},
	});

	const [switchState, setSwitchState] = useState({
		displayFavorites: false,
		displayTestNews: false,
	});

	useEffect(() => {
		if (data) {
			setSwitchState({
				displayFavorites: data.displayFavorites,
				displayTestNews: data.displayTestNews,
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
								aria-label={t("pages.userSettings.homeSection.displayTestNews")}
							/>
						}
						label={t("pages.userSettings.homeSection.displayTestNews")}
					/>
				</Stack>
			</Box>
		</Container>
	);
};
export default UserSettings;
