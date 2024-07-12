import { janus_account } from "@prisma/client";
export type UpdateUserSettingsDto = Partial<
	Pick<
		janus_account,
		| "displayFavorites"
		| "displayTestNews"
		| "defaultSearchMode"
		| "defaultLanguage"
		| "defaultTheme"
		| "hasSeenPopup"
	>
>;
