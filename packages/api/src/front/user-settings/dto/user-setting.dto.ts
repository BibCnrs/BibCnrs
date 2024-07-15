import { janus_account } from "@prisma/client";
export type UpdateUserSettingsDto = Partial<
	Pick<
		janus_account,
		| "displayFavorites"
		| "displayTestNews"
		| "articleLinkType"
		| "defaultSearchMode"
		| "defaultLanguage"
		| "defaultTheme"
		| "hasSeenPopup"
	>
>;
