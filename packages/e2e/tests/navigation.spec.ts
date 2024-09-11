import { expect, test } from "@playwright/test";
import { janusLogin } from "../page-objects/login";

test("search bar navigation", async ({ page }) => {
	await janusLogin(page);
	await page.goto("/");

	await expect(page.getByRole("link", { name: "Articles" })).toBeVisible();
	await expect(
		page.getByRole("link", { name: "Revues, ouvrages" }),
	).toBeVisible();
	await expect(page.getByRole("link", { name: "Plateformes" })).toBeVisible();
	await expect(
		page.getByRole("link", { name: "Données de recherche" }),
	).toBeVisible();

	await page.getByRole("link", { name: "Articles" }).click();
	await page.waitForURL("/article?*");
	await expect(page.getByRole("link", { name: "Articles" })).toBeVisible();
	await expect(page.getByRole("link", { name: "Articles" })).toHaveAttribute(
		"aria-current",
		"page",
	);
	await expect(
		page.getByRole("link", { name: "Revues, ouvrages" }),
	).toBeVisible();
	await expect(page.getByRole("link", { name: "Plateformes" })).toBeVisible();
	await expect(
		page.getByRole("link", { name: "Données de recherche" }),
	).toBeVisible();

	await page.getByRole("link", { name: "Revues, ouvrages" }).click();
	await page.waitForURL("/publication?*");
	await expect(page.getByRole("link", { name: "Articles" })).toBeVisible();
	await expect(
		page.getByRole("link", { name: "Revues, ouvrages" }),
	).toBeVisible();
	await expect(
		page.getByRole("link", { name: "Revues, ouvrages" }),
	).toHaveAttribute("aria-current", "page");
	await expect(page.getByRole("link", { name: "Plateforme" })).toBeVisible();
	await expect(
		page.getByRole("link", { name: "Données de recherche" }),
	).toBeVisible();

	await page.getByRole("link", { name: "Plateforme" }).click();
	await page.waitForURL("/database");
	await expect(page.getByRole("link", { name: "Articles" })).toBeVisible();
	await expect(
		page.getByRole("link", { name: "Revues, ouvrages" }),
	).toBeVisible();
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
	await expect(
		page.getByRole("link", { name: "Données de recherche" }),
	).toBeVisible();

	await page.getByRole("link", { name: "Données de recherche" }).click();
	await page.waitForURL("/research-data?*");
	await expect(page.getByRole("link", { name: "Articles" })).toBeVisible();
	await expect(
		page.getByRole("link", { name: "Revues, ouvrages" }),
	).toBeVisible();
	await expect(page.getByRole("link", { name: "Plateformes" })).toBeVisible();
	await expect(
		page.getByRole("link", { name: "Données de recherche" }),
	).toBeVisible();
	await expect(
		page.getByRole("link", { name: "Données de recherche" }),
	).toHaveAttribute("aria-current", "page");
});
