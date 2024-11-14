import { expect, test } from "@playwright/test";

test("Display resource items on the home page", async ({ page }) => {
	await page.goto("/");

	await expect(
		page.getByRole("link", {
			name: "Ressources disponibles pour le domaine Chimie",
		}),
	).toBeVisible();
	// await expect(
	// 	page.getByRole("link", {
	// 		name: "Ressources disponibles pour le domaine Chimie",
	// 	}),
	// ).toHaveAttribute(
	// 	"href",
	// 	"https://localhost:3000/files/2024/6/28/BibCNRS_INC_ListeTitres_20220401(1).xlsx",
	// );

	await expect(
		page.getByRole("link", {
			name: "Ressources disponibles pour le domaine Ecologie & Environnement",
		}),
	).toBeVisible();

	// await expect(
	// 	page.getByRole("link", {
	// 		name: "Ressources disponibles pour le domaine Ecologie & Environnement",
	// 	}),
	// ).toHaveAttribute(
	// 	"href",
	// 	"https://localhost:3000/files/2024/6/28/BibCNRS_INEE_ListeTitres_20220401(2).xlsx",
	// );
});

test("Display resource items on the resources page", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("link", { name: "Listes des ressources" }).click();

	await expect(
		page.getByRole("link", {
			name: "Ressources disponibles pour le domaine Chimie",
		}),
	).toBeVisible();
	// await expect(
	// 	page.getByRole("link", {
	// 		name: "Ressources disponibles pour le domaine Chimie",
	// 	}),
	// ).toHaveAttribute(
	// 	"href",
	// 	"https://localhost:3000/files/2024/6/28/BibCNRS_INC_ListeTitres_20220401(1).xlsx",
	// );

	await expect(
		page.getByRole("link", {
			name: "Ressources disponibles pour le domaine Ecologie & Environnement",
		}),
	).toBeVisible();

	// await expect(
	// 	page.getByRole("link", {
	// 		name: "Ressources disponibles pour le domaine Ecologie & Environnement",
	// 	}),
	// ).toHaveAttribute(
	// 	"href",
	// 	"https://localhost:3000/files/2024/6/28/BibCNRS_INEE_ListeTitres_20220401(2).xlsx",
	// );
});
