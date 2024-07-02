import { type Page, expect } from "@playwright/test";

export async function goToHistory(page: Page) {
	await page.getByRole("button", { name: "Profil", exact: true }).click();
	await page.getByRole("menuitem", { name: "Mon Historique" }).click();
	await expect(page.getByRole("heading", { name: "Historique" })).toBeVisible();
}
