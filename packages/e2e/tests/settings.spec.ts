import { expect, test } from "@playwright/test";
import { janusLogin, janusLogout } from "../page-objects/login";
import { goToSettings } from "../page-objects/settings";

test("Go To seetings page", async ({ page }) => {
	await janusLogin(page);

	await goToSettings(page);

	await expect(
		page.getByRole("heading", {
			name: "Accueil",
		}),
	).toBeVisible();

	await expect(
		page.getByRole("heading", {
			name: "Recherche",
		}),
	).toBeVisible();

	await expect(
		page.getByRole("heading", {
			name: "Général",
		}),
	).toBeVisible();

	await janusLogout(page);
});

test("Change language", async ({ page }) => {
	await janusLogin(page);

	await goToSettings(page);

	await page.getByRole("button", { name: "Anglais" }).click();

	await expect(
		page.getByRole("heading", {
			name: "My preferences",
		}),
	).toBeVisible();

	await page.getByRole("button", { name: "French" }).click();

	await expect(
		page.getByRole("heading", {
			name: "Mes paramètres",
		}),
	).toBeVisible();

	await page.getByRole("button", { name: "Anglais" }).click();

	await expect(
		page.getByRole("heading", {
			name: "My preferences",
		}),
	).toBeVisible();

	await page.getByRole("button", { name: "System language" }).click();

	await expect(
		page.getByRole("heading", {
			name: "Mes paramètres",
		}),
	).toBeVisible();

	await janusLogout(page);
});
