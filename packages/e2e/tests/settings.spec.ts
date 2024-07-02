import { expect, test } from "@playwright/test";
import { janusLogin, janusLogout } from "../page-objects/login";

test("Go To seetings page", async ({ page }) => {
	await janusLogin(page);

	await page.getByRole("button", { name: "d" }).click();
	await page.getByLabel("Paramètres").click();
	await page.locator(".MuiBackdrop-root").click();

	await expect(
		page.getByRole("heading", {
			name: "Mes paramètres",
		}),
	).toBeVisible();

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

test("Show / Hide test news on home page", async ({ page }) => {
	await janusLogin(page);

	await expect(
		page.getByRole("link", {
			name: "Deuxième actualité",
		}),
	).toBeVisible();

	await page.getByRole("button", { name: "d" }).click();
	await page.getByLabel("Paramètres").click();
	await page.locator(".MuiBackdrop-root").click();

	await page.getByLabel("Actualités").first().click();
	await page.getByRole("link", { name: "BibCNRS Logo" }).click();

	await expect(
		page.getByRole("link", {
			name: "Deuxième actualité",
		}),
	).not.toBeVisible();

	await page.getByRole("button", { name: "d" }).click();
	await page.getByLabel("Paramètres").click();
	await page.locator(".MuiBackdrop-root").click();

	await page.getByLabel("Actualités").first().click();
	await page.getByRole("link", { name: "BibCNRS Logo" }).click();

	await expect(
		page.getByRole("link", {
			name: "Deuxième actualité",
		}),
	).toBeVisible();

	await janusLogout(page);
});

test("Show / Hide favorites on home page", async ({ page }) => {
	await janusLogin(page);

	await expect(page.getByRole("link", { name: "BIB CNRS" })).toBeVisible();

	await page.getByRole("button", { name: "d" }).click();
	await page.getByLabel("Paramètres").click();
	await page.locator(".MuiBackdrop-root").click();

	await page.getByLabel("Favoris").first().click();
	await page.getByRole("link", { name: "BibCNRS Logo" }).click();

	await expect(page.getByRole("link", { name: "BIB CNRS" })).not.toBeVisible();

	await page.getByRole("button", { name: "d" }).click();
	await page.getByLabel("Paramètres").click();
	await page.locator(".MuiBackdrop-root").click();

	await page.getByLabel("Favoris").first().click();
	await page.getByRole("link", { name: "BibCNRS Logo" }).click();

	await expect(page.getByRole("link", { name: "BIB CNRS" })).toBeVisible();

	await janusLogout(page);
});

test("Change language", async ({ page }) => {
	await janusLogin(page);

	await page.getByRole("button", { name: "d" }).click();
	await page.getByLabel("Paramètres").click();
	await page.locator(".MuiBackdrop-root").click();

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
