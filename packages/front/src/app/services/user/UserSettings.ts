import { createQuery, environment, json, throwIfNotOk } from "../Environment";

export type UserSettingsType = {
	displayFavorites: boolean;
	displayTestNews: boolean;
	defaultSearchMode: "article" | "journal" | "platform" | "searchData";
	defaultLanguage: "auto" | "fr" | "en";
	defaultTheme: "auto" | "light" | "dark";
};

export const getSettings = async (
	userId: number,
): Promise<UserSettingsType> => {
	const response: Response = await fetch(
		createQuery(`${environment.get.account.settings}/${userId}`),
		{
			credentials: "include",
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		},
	);
	throwIfNotOk(response);
	return json(response);
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
