import { createQuery, environment, json, throwIfNotOk } from "../Environment";

export type UserSettingsType = {
	displayFavorites: boolean;
	displayTestNews: boolean;
	defaultSearchMode: "article" | "journal" | "platform" | "searchData";
	defaultLanguage: "auto" | "fr" | "en";
	defaultTheme: "auto" | "light" | "dark";
};

export const updateSettings = async ({ userId, ...setting }) => {
	const response: Response = await fetch(
		createQuery(`${environment.put.account.settings}/${userId}`),
		{
			credentials: "include",
			method: "PATCH",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(setting),
		},
	);
	throwIfNotOk(response);
	return json(response);
};
