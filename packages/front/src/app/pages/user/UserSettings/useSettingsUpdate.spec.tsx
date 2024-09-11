import * as ReactQuery from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { expect, it } from "vitest";
import { mockInistLogin } from "../../../../test/mockInistLogin";
import { mockJanusLogin } from "../../../../test/mockJanusLogin";
import { BibContextProvider, useBibContext } from "../../../context/BibContext";
import I18N from "./../../../shared/locales/I18N";
import { useSettingsUpdate } from "./useSettingsUpdate";

function wrapperFactory({ children }: { children: React.ReactNode }) {
	const queryClient = new ReactQuery.QueryClient();
	return (
		<MemoryRouter>
			<I18nextProvider i18n={I18N}>
				<ReactQuery.QueryClientProvider client={queryClient}>
					<BibContextProvider>{children}</BibContextProvider>
				</ReactQuery.QueryClientProvider>
			</I18nextProvider>
		</MemoryRouter>
	);
}

it("should update default language for anonymous user", () => {
	const { result, rerender } = renderHook(
		() => ({
			bibContext: useBibContext(),
			settingsUpdate: useSettingsUpdate(),
		}),
		{
			wrapper: wrapperFactory,
		},
	);

	expect(result.current.bibContext.session.user).toBeNull();
	expect(result.current.bibContext.language).toBe("en");

	result.current.settingsUpdate.handleToggleChange("defaultLanguage")(
		null,
		"fr",
	);
	rerender();
	expect(result.current.bibContext.language).toBe("fr");

	result.current.settingsUpdate.handleToggleChange("defaultLanguage")(
		null,
		"en",
	);
	rerender();
	expect(result.current.bibContext.language).toBe("en");
});

it("should update default language for inist user", async () => {
	const user = mockInistLogin();

	const { result, rerender } = renderHook(
		() => ({
			bibContext: useBibContext(),
			settingsUpdate: useSettingsUpdate(),
		}),
		{
			wrapper: wrapperFactory,
		},
	);

	expect(result.current.bibContext.session.user).toBeNull();
	expect(result.current.bibContext.language).toBe("en");

	await result.current.bibContext.loginToLegacy({
		username: "Marmelab",
		password: "password",
	});

	rerender();
	expect(result.current.bibContext.session.status).toBe("loggedIn");
	expect(result.current.bibContext.session.user).toStrictEqual({
		...user,
		fetch: false,
	});
	expect(result.current.bibContext.language).toBe("en");

	await result.current.settingsUpdate.handleToggleChange("defaultLanguage")(
		null,
		"fr",
	);
	rerender();
	expect(result.current.bibContext.language).toBe("fr");

	await result.current.settingsUpdate.handleToggleChange("defaultLanguage")(
		null,
		"en",
	);
	rerender();
	expect(result.current.bibContext.language).toBe("en");
});

it("should update default language for janus user", async () => {
	const user = mockJanusLogin({ defaultLanguage: "auto" });

	const { result, rerender } = renderHook(
		() => ({
			bibContext: useBibContext(),
			settingsUpdate: useSettingsUpdate(),
		}),
		{
			wrapper: wrapperFactory,
		},
	);

	await result.current.bibContext._loginStatus;
	rerender();

	expect(result.current.bibContext.session.status).toBe("loggedIn");
	expect(result.current.bibContext.session.user).toStrictEqual({
		...user,
		fetch: false,
	});
	expect(result.current.bibContext.session.user.settings.defaultLanguage).toBe(
		"auto",
	);
	expect(result.current.bibContext.language).toBe("en");

	await result.current.settingsUpdate.handleToggleChange("defaultLanguage")(
		null,
		"fr",
	);
	rerender();
	expect(result.current.bibContext.session.user.settings.defaultLanguage).toBe(
		"fr",
	);
	expect(result.current.bibContext.language).toBe("fr");

	await result.current.settingsUpdate.handleToggleChange("defaultLanguage")(
		null,
		"en",
	);

	rerender();
	expect(result.current.bibContext.session.user.settings.defaultLanguage).toBe(
		"en",
	);
	expect(result.current.bibContext.language).toBe("en");
});
