import { expect, test } from "@playwright/test";
import { goToFavorites } from "../page-objects/favorites";
import { janusLogin, janusLogout } from "../page-objects/login";
import { RETRIEVE_PUBLICATION_MOCK } from "./mocks/retrievePublication.mock";
import { SEARCH_PUBLICATION_MOCK } from "./mocks/searchPublication.mock";

test("Should search publication", async ({ page }) => {
	await page.route(
		"**/api/ebsco/*/publication/search?queries=*",
		async (route) => {
			await route.fulfill({ json: SEARCH_PUBLICATION_MOCK });
		},
	);

	await page.route(
		"**/api/ebsco/*/publication/retrieve/edp27201607",
		async (route) => {
			await route.fulfill({ json: RETRIEVE_PUBLICATION_MOCK });
		},
	);

	await page.goto("/");
	await page.getByRole("link", { name: "Revue, ouvrage" }).click();

	await page.getByPlaceholder(/Rechercher des titres de revues/i).fill("maths");
	await page
		.getByPlaceholder(/Rechercher des titres de revues/i)
		.press("Enter");

	await expect(page.getByText(/Math!/i)).toBeVisible();
	await expect(page.getByText(/Math Horizons/i)).toBeVisible();
	await expect(page.getByText(/Why Math/i)).toBeVisible();
	await expect(
		page.getByRole("link", { name: /Journal of Math/i }),
	).toBeVisible();
});

test("Should open drawer when clicking on see more about", async ({ page }) => {
	await page.route(
		"**/api/ebsco/*/publication/search?queries=*",
		async (route) => {
			await route.fulfill({ json: SEARCH_PUBLICATION_MOCK });
		},
	);

	await page.route(
		"**/api/ebsco/*/publication/retrieve/edp27201607",
		async (route) => {
			await route.fulfill({ json: RETRIEVE_PUBLICATION_MOCK });
		},
	);

	await janusLogin(page);

	await page.goto("/");
	await page.getByRole("link", { name: "Revue, ouvrage" }).click();

	await page.getByPlaceholder(/Rechercher des titres de revues/i).fill("maths");
	await page
		.getByPlaceholder(/Rechercher des titres de revues/i)
		.press("Enter");

	page
		.getByRole("button", {
			name: /En savoir plus sur Journal of Math/i,
		})
		.click();

	{
		const response = page.waitForResponse(
			"/api/ebsco/INS2I/publication/retrieve/edp27201607",
		);

		await expect(page.getByText("Journal of Math Circles")).toBeVisible();

		await expect(
			page.getByRole("heading", {
				name: "Auteur",
			}),
		).toBeVisible();

		await expect(page.getByText("Lang, Serge")).toBeVisible();

		await response;
	}

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
	await page.route(
		"**/api/ebsco/*/publication/search?queries=*",
		async (route) => {
			await route.fulfill({ json: SEARCH_PUBLICATION_MOCK });
		},
	);

	await page.route(
		"**/api/ebsco/*/publication/retrieve/edp27201607",
		async (route) => {
			await route.fulfill({ json: RETRIEVE_PUBLICATION_MOCK });
		},
	);

	await janusLogin(page);

	await page.goto("/");
	await page.getByRole("link", { name: "Revue, ouvrage" }).click();
	await page.getByPlaceholder(/Rechercher des titres de revues/i).fill("maths");
	await page
		.getByPlaceholder(/Rechercher des titres de revues/i)
		.press("Enter");

	{
		const response = page.waitForResponse("/api/front/favourite_resources/1");
		await page
			.getByRole("button", {
				name: /Ajouter Journal of Math(.+) aux favoris/i,
			})
			.click();
		await response;
	}

	await goToFavorites(page);

	await expect(page.getByText(" Journal of Math")).toBeVisible();

	await page
		.getByRole("button", {
			name: "Supprimer https://digitalcommons.cwu.edu/mathcirclesjournal/",
		})
		.click();
	{
		const response = page.waitForResponse("/api/front/favourite_resources/1");
		await page.getByRole("button", { name: /Confirmer/i }).click();
		await response;
	}
	await expect(page.getByText("Journal of Math")).not.toBeVisible();

	await janusLogout(page);
});
