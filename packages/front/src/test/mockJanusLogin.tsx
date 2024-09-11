import { vi } from "vitest";
import {
	JANUS_STORAGE_KEY,
	persistentStorage,
} from "../app/context/useSession";
import type { SessionUserDataType } from "../app/shared/types/data.types";

export function mockJanusLogin(
	defaultSettings: Partial<SessionUserDataType["settings"]> = {},
) {
	persistentStorage?.setItem(JANUS_STORAGE_KEY, "true");

	const user: SessionUserDataType = {
		id: 1,
		domains: ["INSB"],
		legacy: false,
		username: "Marmelab",
		favorite_domain: "INSB",
		favouriteResources: [],
		origin: "janus",
		settings: {
			articleLinkType: "oa",
			defaultLanguage: "auto",
			defaultSearchMode: "article",
			defaultTheme: "auto",
			displayFavorites: true,
			displayTestNews: true,
			platformView: "card",
			hasSeenPopup: false,
			...defaultSettings,
		},
	};

	vi.spyOn(globalThis, "fetch")
		.mockImplementationOnce(() => {
			return Promise.resolve({
				ok: true,
				status: 201,
				json: () => {
					return user;
				},
			} as unknown as Response);
		})
		.mockImplementationOnce(() => {
			return Promise.resolve({
				ok: true,
				status: 200,
				json: () => {
					return {
						...user.settings,
						defaultLanguage: "fr",
					};
				},
			} as unknown as Response);
		})
		.mockImplementationOnce(() => {
			return Promise.resolve({
				ok: true,
				status: 200,
				json: () => {
					return {
						...user.settings,
						defaultLanguage: "en",
					};
				},
			} as unknown as Response);
		});

	return user;
}
