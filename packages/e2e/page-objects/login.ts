import { type Page, expect } from "@playwright/test";

export async function janusLogin(page: Page) {
	await page.goto("/");
	await page.getByRole("button", { name: "Connexion", exact: true }).click();
	await page.getByRole("button", { name: /Connectez-vous /i }).click();

	await page.getByRole("button", { name: "d", exact: true }).click();
	await expect(
		page.getByRole("menuitem", { name: /developer marmelab/i }),
	).toBeVisible();

	// Close modal
	await page.locator(".MuiBackdrop-root").click();
}

export async function janusLogout(page: Page) {
	await page.getByRole("button", { name: "d", exact: true }).click();
	await page
		.getByRole("menuitem", { name: "Déconnexion", exact: true })
		.click();
	await expect(
		page.getByRole("button", { name: "Connexion", exact: true }),
	).toBeVisible();
}

export async function inistLogin(page: Page) {
	await page.goto("/");
	await page.getByRole("button", { name: "Connexion" }).click();
	await page
		.getByRole("button", { name: "Code d'accès de votre unité" })
		.click();
	await page.getByLabel("Identifiant").click();
	await page.getByLabel("Identifiant").fill("Marmelab");
	await page.getByLabel("Mot de passe").fill("M4rm3l4b");
	await page.getByRole("button", { name: "Connexion" }).click();

	await page.getByRole("button", { name: "M", exact: true }).click();
	await expect(page.getByRole("menuitem", { name: /Marmelab/i })).toBeVisible();

	await page.locator(".MuiBackdrop-root").click();
}

export async function inistLogout(page: Page) {
	await page.getByRole("button", { name: "M" }).click();
	await page.getByRole("menuitem", { name: "Déconnexion" }).click();
	await expect(
		page.getByRole("button", { name: "Connexion", exact: true }),
	).toBeVisible();
}
