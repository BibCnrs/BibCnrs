import { expect, test } from "@playwright/test";
import { janusLogin } from "../page-objects/login";

test("search bar navigation", async ({ page }) => {
	await janusLogin(page);
	await page.goto("/");

	await expect(page.getByText("Article")).toBeVisible();
	await expect(page.getByText("Revue, ouvrage")).toBeVisible();
	await expect(page.getByText("Plateforme")).toBeVisible();
	await expect(page.getByText("Données de recherche")).toBeVisible();

	await page.getByText("Article").click();
	await page.waitForURL("/article?*");
	await expect(page.getByText("Article")).toBeVisible();
	await expect(page.getByText("Article")).toHaveAttribute(
		"aria-current",
		"page",
	);
	await expect(page.getByText("Revue, ouvrage")).toBeVisible();
	await expect(page.getByText("Plateforme")).toBeVisible();
	await expect(page.getByText("Données de recherche")).toBeVisible();

	await page.getByText("Revue, ouvrage").click();
	await page.waitForURL("/publication?*");
	await expect(page.getByText("Article")).toBeVisible();
	await expect(page.getByText("Revue, ouvrage")).toBeVisible();
	await expect(page.getByText("Revue, ouvrage")).toHaveAttribute(
		"aria-current",
		"page",
	);
	await expect(page.getByText("Plateforme")).toBeVisible();
	await expect(page.getByText("Données de recherche")).toBeVisible();

	await page.getByText("Plateforme").click();
	await page.waitForURL("/database");
	await expect(page.getByText("Article")).toBeVisible();
	await expect(page.getByText("Revue, ouvrage")).toBeVisible();
	await expect(
		page.getByText("Plateforme", {
			exact: true,
		}),
	).toBeVisible();
	await expect(
		page.getByText("Plateforme", {
			exact: true,
		}),
	).toHaveAttribute("aria-current", "page");
	await expect(page.getByText("Données de recherche")).toBeVisible();

	await page.getByText("Données de recherche").click();
	await page.waitForURL("/research-data?*");
	await expect(page.getByText("Article")).toBeVisible();
	await expect(page.getByText("Revue, ouvrage")).toBeVisible();
	await expect(page.getByText("Plateforme")).toBeVisible();
	await expect(page.getByText("Données de recherche")).toBeVisible();
	await expect(page.getByText("Données de recherche")).toHaveAttribute(
		"aria-current",
		"page",
	);
});
