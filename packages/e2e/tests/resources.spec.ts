import { expect, test } from "@playwright/test";

test("Display resource items on the home page", async ({ page }) => {
	await page.goto("/");

	await page.locator('div[aria-label="Chimie"]').click();

	await expect(
		page.getByRole("link", {
			name: "Ressources disponibles pour le domaine Chimie",
		}),
	).toBeVisible({ timeout: 10000 });

	await expect(
		page.getByRole("link", {
			name: "Ressources disponibles pour le domaine Chimie",
		}),
	).toHaveAttribute(
		"href",
		"https://localhost:3000/files/2024/6/14/BibCNRS_INC2_ListeTitres.xlsx",
	);

	await page.locator('div[aria-label="Ecologie & Environnement"]').click();

	await expect(
		page.getByRole("link", {
			name: "Ressources disponibles pour le domaine Ecologie & Environnement",
		}),
	).toBeVisible({ timeout: 10000 });

	await expect(
		page.getByRole("link", {
			name: "Ressources disponibles pour le domaine Ecologie & Environnement",
		}),
	).toHaveAttribute(
		"href",
		"https://localhost:3000/files/2024/6/14/BibCNRS_INEE_ListeTitres.xlsx",
	);
});

test("Display resource items on the resources page", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("link", { name: "Listes des ressources" }).click();

	await page.locator('div[aria-label="Chimie"]').click();

	await expect(
		page.getByRole("link", {
			name: "Ressources disponibles pour le domaine Chimie",
		}),
	).toBeVisible({ timeout: 10000 });

	await expect(
		page.getByRole("link", {
			name: "Ressources disponibles pour le domaine Chimie",
		}),
	).toHaveAttribute(
		"href",
		"https://localhost:3000/files/2024/6/14/BibCNRS_INC2_ListeTitres.xlsx",
	);

	await page.locator('div[aria-label="Ecologie & Environnement"]').click();

	await expect(
		page.getByRole("link", {
			name: "Ressources disponibles pour le domaine Ecologie & Environnement",
		}),
	).toBeVisible({ timeout: 10000 });

	await expect(
		page.getByRole("link", {
			name: "Ressources disponibles pour le domaine Ecologie & Environnement",
		}),
	).toHaveAttribute(
		"href",
		"https://localhost:3000/files/2024/6/14/BibCNRS_INEE_ListeTitres.xlsx",
	);
});
