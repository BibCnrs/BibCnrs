import type { Page } from "@playwright/test";

export async function goToAlerts(page: Page) {
	await page.getByRole("button", { name: "Profil", exact: true }).click();
	await page.getByRole("menuitem", { name: "Mes Alertes" }).click();
}
