import { expect, test } from "@playwright/test";

test("Display resource items on the home page", async ({ page }) => {
	await page.goto("/");

	await expect(
		page.getByRole("listitem", {
			name: "Ressources disponibles pour le domaine Chimie",
		}),
	).toBeVisible();
	await expect(
		page.getByRole("link", {
			name: "Ressources disponibles pour le domaine Chimie",
		}),
	).toHaveAttribute(
		"href",
		"http://localhost:3000/files/2024/6/14/BibCNRS_INC2_ListeTitres.xlsx",
	);

	await expect(
		page.getByRole("listitem", {
			name: "Ressources disponibles pour le domaine Ecologie & Environnement",
		}),
	).toBeVisible();
	await expect(
		page.getByRole("link", {
			name: "Ressources disponibles pour le domaine Ecologie & Environnement",
		}),
	).toHaveAttribute(
		"href",
		"http://localhost:3000/files/2024/6/14/BibCNRS_INEE_ListeTitres.xlsx",
	);
});

test("Display resource items on the resources page", async ({ page }) => {
	await page.goto("/resources");
	await page.getByRole("link", { name: "Listes des ressources" }).click();

	await expect(
		page.getByRole("listitem", {
			name: "Ressources disponibles pour le domaine Chimie",
		}),
	).toBeVisible();
	await expect(
		page.getByRole("link", {
			name: "Ressources disponibles pour le domaine Chimie",
		}),
	).toHaveAttribute(
		"href",
		"http://localhost:3000/files/2024/6/14/BibCNRS_INC2_ListeTitres.xlsx",
	);

	await expect(
		page.getByRole("listitem", {
			name: "Ressources disponibles pour le domaine Ecologie & Environnement",
		}),
	).toBeVisible();
	await expect(
		page.getByRole("link", {
			name: "Ressources disponibles pour le domaine Ecologie & Environnement",
		}),
	).toHaveAttribute(
		"href",
		"http://localhost:3000/files/2024/6/14/BibCNRS_INEE_ListeTitres.xlsx",
	);
});
