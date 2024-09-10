import { expect, test } from "@playwright/test";
import { janusLogin } from "../page-objects/login";

test("search bar navigation", async ({ page }) => {
	await janusLogin(page);
	await page.goto("/");

	await expect(page.getByText("Articles")).toBeVisible();
	await expect(page.getByText("Revues, ouvrages")).toBeVisible();
	await expect(page.getByText("Plateformes")).toBeVisible();
	await expect(page.getByText("Données de recherche")).toBeVisible();

	await page.getByText("Articles").click();
	await page.waitForURL("/article?*");
	await expect(page.getByText("Articles")).toBeVisible();
	await expect(page.getByText("Articles")).toHaveAttribute(
		"aria-current",
		"page",
	);
	await expect(page.getByText("Revues, ouvrages")).toBeVisible();
	await expect(page.getByText("Plateformes")).toBeVisible();
	await expect(page.getByText("Données de recherche")).toBeVisible();

	await page.getByText("Revues, ouvrages").click();
	await page.waitForURL("/publication?*");
	await expect(page.getByText("Articles")).toBeVisible();
	await expect(page.getByText("Revues, ouvrages")).toBeVisible();
	await expect(page.getByText("Revues, ouvrages")).toHaveAttribute(
		"aria-current",
		"page",
	);
	await expect(page.getByText("Plateforme")).toBeVisible();
	await expect(page.getByText("Données de recherche")).toBeVisible();

	await page.getByText("Plateforme").click();
	await page.waitForURL("/database");
	await expect(page.getByText("Articles")).toBeVisible();
	await expect(page.getByText("Revues, ouvrages")).toBeVisible();
	await expect(
		page.getByText("Plateformes", {
			exact: true,
		}),
	).toBeVisible();
	await expect(
		page.getByText("Plateformes", {
			exact: true,
		}),
	).toHaveAttribute("aria-current", "page");
	await expect(page.getByText("Données de recherche")).toBeVisible();

	await page.getByText("Données de recherche").click();
	await page.waitForURL("/research-data?*");
	await expect(page.getByText("Articles")).toBeVisible();
	await expect(page.getByText("Revues, ouvrages")).toBeVisible();
	await expect(page.getByText("Plateformes")).toBeVisible();
	await expect(page.getByText("Données de recherche")).toBeVisible();
	await expect(page.getByText("Données de recherche")).toHaveAttribute(
		"aria-current",
		"page",
	);
});
