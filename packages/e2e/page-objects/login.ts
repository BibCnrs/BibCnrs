import { type Page, expect } from "@playwright/test";

export async function janusLogin(page: Page) {
	await page.goto("http://localhost:3000/");
	await page.getByRole("button", { name: "Connexion", exact: true }).click();
	await page.getByRole("button", { name: /Compte personnel/i }).click();

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
