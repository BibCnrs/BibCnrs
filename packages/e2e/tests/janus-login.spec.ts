import { expect, test } from "@playwright/test";
import { janusLogin, janusLogout } from "../page-objects/login";

test("Janus login and logout", async ({ page }) => {
	await janusLogin(page);
	await janusLogout(page);
});

test("Janus user menu", async ({ page }) => {
	await janusLogin(page);

	await page.getByRole("button", { name: "Profil", exact: true }).click();

	await expect(
		page.getByRole("menuitem", { name: "Mon Historique" }),
	).toBeVisible();

	await expect(
		page.getByRole("menuitem", { name: "Mes Favoris" }),
	).toBeVisible();

	await expect(
		page.getByRole("menuitem", { name: "Mes Alertes" }),
	).toBeVisible();

	await expect(
		page.getByRole("menuitem", { name: "Paramètres" }),
	).toBeVisible();

	await expect(
		page.getByRole("menuitem", {
			name: "Vous n'êtes pas connecté au niveau individuel",
		}),
	).not.toBeVisible();

	await page.locator(".MuiBackdrop-root").click();

	await janusLogout(page);
});
