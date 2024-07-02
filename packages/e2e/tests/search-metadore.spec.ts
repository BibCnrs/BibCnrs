import { expect, test } from "@playwright/test";
import { goToFavorites } from "../page-objects/favorites";
import { janusLogin, janusLogout } from "../page-objects/login";
import { SEARCH_METADORE_MOCK } from "./mocks/searchMetadore.mock";

test("Should search metadore", async ({ page }) => {
	await page.route("**/api/ebsco/metadore/search?*", async (route) => {
		await route.fulfill({ json: SEARCH_METADORE_MOCK });
	});

	await page.goto("/");
	await page.getByRole("link", { name: "Données de recherche" }).click();

	await page.getByPlaceholder(/Recherche/i).fill("maths");
	await page.getByPlaceholder(/Recherche/i).press("Enter");

	await expect(
		page.getByRole("link", { name: /A user experience evaluation of/i }),
	).toBeVisible();
	await expect(
		page.getByRole("link", { name: /Ternary Mathematics and 3D/i }),
	).toBeVisible();
});

test("Should open drawer when clicking on see more about", async ({ page }) => {
	await page.route("**/api/ebsco/metadore/search?*", async (route) => {
		await route.fulfill({ json: SEARCH_METADORE_MOCK });
	});

	await janusLogin(page);

	await page.goto("/");
	await page.getByRole("link", { name: "Données de recherche" }).click();

	await page.getByPlaceholder(/Recherche/i).fill("maths");
	await page.getByPlaceholder(/Recherche/i).press("Enter");

	page
		.getByRole("button", {
			name: /En savoir plus sur A user experience/i,
		})
		.click();

	await expect(
		page.getByRole("heading", {
			name: "Année de publication",
		}),
	).toBeVisible();

	await expect(page.getByText("2024")).toBeVisible();

	await expect(
		page.getByRole("heading", {
			name: "Description",
		}),
	).toBeVisible();

	await expect(
		page.getByText("Ethical clearance number: 199108129/2022/25A "),
	).toBeVisible();

	await page
		.locator(".MuiDrawer-root")
		.filter({ hasText: "Publication" })
		.click({
			position: {
				x: 1,
				y: 1,
			},
		});

	await janusLogout(page);
});

test("Add favorite", async ({ page }) => {
	await page.route("**/api/ebsco/metadore/search?*", async (route) => {
		await route.fulfill({ json: SEARCH_METADORE_MOCK });
	});

	await janusLogin(page);

	await page.goto("/");
	await page.getByRole("link", { name: "Données de recherche" }).click();

	await page.getByPlaceholder(/Recherche/i).fill("maths");
	await page.getByPlaceholder(/Recherche/i).press("Enter");

	{
		const response = page.waitForResponse("/api/ebsco/favourite_resources/1");
		await page
			.getByRole("button", {
				name: /Ajouter (.+)A user experience(.+) aux favoris/i,
			})
			.click();
		await response;
	}

	await goToFavorites(page);

	await expect(page.getByText("A user experience")).toBeVisible();

	await page
		.getByRole("button", {
			name: "Supprimer https://esango.cput.ac.za/articles/dataset/",
		})
		.click();
	{
		const response = page.waitForResponse("/api/ebsco/favourite_resources/1");
		await page.getByRole("button", { name: /Confirmer/i }).click();
		await response;
	}
	await expect(page.getByText("A user experience")).not.toBeVisible();

	await janusLogout(page);
});
