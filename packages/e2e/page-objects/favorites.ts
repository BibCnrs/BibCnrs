import { type Page, expect } from "@playwright/test";

export async function goToFavorites(page: Page) {
	await page.getByRole("button", { name: "Profil", exact: true }).click();
	await page.getByRole("menuitem", { name: "Mes Favoris" }).click();
	await page.locator(".MuiBackdrop-root").click();
	await expect(page.locator(".MuiBackdrop-root")).not.toBeVisible();
}
