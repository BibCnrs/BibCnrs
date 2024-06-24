import type { Page } from "@playwright/test";

export async function goToFavorites(page: Page) {
	await page.getByRole("button", { name: "d" }).click();
	await page.getByRole("menuitem", { name: "Mes Favoris" }).click();
	await page.locator(".MuiBackdrop-root").click();
}
