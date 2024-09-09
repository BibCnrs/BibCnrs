import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useBibContext } from "../../../context/BibContext";
import { updateSettings } from "../../../services/user/UserSettings";
import {
	supportedLanguages,
	useFullTranslator,
} from "../../../shared/locales/I18N";
import { useMatomo } from "../../../shared/matomo";
import type { UserSettingsDataType } from "../../../shared/types/data.types";
import type { ThemeType } from "../../../shared/types/types";

export const useSettingsUpdate = () => {
	const {
		session: { user },
		setTheme,
		updateUserSettings,
	} = useBibContext();
	const { trackEvent } = useMatomo();
	const { i18n } = useFullTranslator();

	const mutation = useMutation({
		mutationFn: updateSettings,
		onSuccess: (data: UserSettingsDataType) => {
			updateUserSettings(data);
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const handleSwitchChange = useCallback<
		(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
	>(
		(event) => {
			if (user?.origin !== "janus") {
				return;
			}

			mutation.mutate({
				userId: user.id,
				[event.target.name]: event.target.checked,
			});
			trackEvent(
				"UserSettings",
				event.target.name,
				event.target.checked ? "on" : "off",
			);
		},
		[user?.id, user?.origin, mutation.mutate, trackEvent],
	);

	const handleToggleChange = useCallback<
		(
			property: keyof typeof user.settings,
		) => (event: React.MouseEvent<HTMLElement>, value: string | null) => void
	>(
		(property: keyof typeof user.settings) => async (_, newToggleValue) => {
			if (newToggleValue === null) return;

			// Change language for anonymous and inist users
			if (
				property === "defaultLanguage" &&
				supportedLanguages.find((value) => value.key === newToggleValue)
			) {
				i18n.changeLanguage(newToggleValue);

				// Change theme for anonymous and inist users
			} else if (property === "defaultTheme") {
				setTheme(newToggleValue as ThemeType);
			}

			if (user?.origin !== "janus") {
				return;
			}

			mutation.mutate({
				userId: user.id,
				[property]: newToggleValue,
			});

			trackEvent("UserSettings", property, newToggleValue);
		},
		[
			user?.id,
			user?.origin,
			mutation.mutate,
			i18n.changeLanguage,
			setTheme,
			trackEvent,
		],
	);

	return useMemo(
		() => ({
			handleSwitchChange,
			handleToggleChange,
		}),
		[handleSwitchChange, handleToggleChange],
	);
};
