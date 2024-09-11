import { type Page, expect } from "@playwright/test";

export async function goToSettings(page: Page) {
	await page.getByRole("button", { name: "Profil" }).click();
	await page.getByLabel("Mes Paramètres").click();
	await page.locator(".MuiBackdrop-root").click();

	await expect(
		page.getByRole("heading", {
			name: "Mes paramètres",
		}),
	).toBeVisible();
}
