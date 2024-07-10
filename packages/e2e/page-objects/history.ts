import type { Page } from "@playwright/test";

export async function goToHistory(page: Page) {
	await page.getByRole("button", { name: "Profil", exact: true }).click();
	await page.getByRole("menuitem", { name: "Mon Historique" }).click();
}
