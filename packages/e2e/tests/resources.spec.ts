import { expect, test } from "@playwright/test";
import { adminLogin } from "../page-objects/login";

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

test("find resources with media = url not file", async ({ page }) => {
	await adminLogin(page);
	await page.goto("/admin#/medias");

	const lodexRow = page.locator('tr:has(td.column-name:has-text("Lodex"))');
	await expect(lodexRow).toBeVisible();

	const urlMedia = lodexRow.locator("td.column-url a");
	await expect(urlMedia).toBeVisible();
	const url = await urlMedia.textContent();
	expect(url).toContain("lodex.inist.fr");

	const fileMedia = lodexRow.locator("td.column-file_name");
	if ((await fileMedia.count()) > 0) {
		const fileName = await fileMedia.textContent();
		expect(fileName?.trim()).toBe("");
	}

	await page.goto("/resources");
	const lodexCard = page.locator('div[role="listitem"][aria-label="lodex"]');
	await expect(lodexCard).toBeVisible();
	const backgroundColor = await lodexCard.evaluate((el) => {
		return window.getComputedStyle(el as HTMLElement).backgroundColor;
	});
	expect(backgroundColor.toLowerCase()).toMatch("rgb(255, 255, 255)");
});
