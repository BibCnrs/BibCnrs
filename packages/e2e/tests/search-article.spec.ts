import { expect, test } from "@playwright/test";
import { goToFavorites } from "../page-objects/favorites";
import { goToHistory } from "../page-objects/history";
import { janusLogout } from "../page-objects/login";
import { RETRIEVE_ARTICLE_MOCK } from "./mocks/retrieveArticle.mock";
import { SEARCH_ARTICLE_MOCK } from "./mocks/searchArticle.mock";

test("Should search article", async ({ page }) => {
	await page.route("**/api/ebsco/*/article/search?queries=*", async (route) => {
		await route.fulfill({ json: SEARCH_ARTICLE_MOCK });
	});

	await page.route("**/api/ebsco/*/article/retrieve?*", async (route) => {
		await route.fulfill({ json: RETRIEVE_ARTICLE_MOCK });
	});

	await page.goto("/");
	await page.getByRole("link", { name: "Article" }).click();
	await page.getByRole("button", { name: /Connectez-vous /i }).click();
	await page.getByPlaceholder(/Rechercher des articles/i).fill("AIDS");
	await page.getByPlaceholder(/Rechercher des articles/i).press("Enter");

	await expect(
		page.getByRole("link", {
			name: "Over my dead body",
		}),
	).toBeVisible();

	await expect(page.getByText("Over my dead body")).toBeVisible();

	await expect(
		page.getByRole("link", {
			name: "The influence of hearing aid",
		}),
	).toBeVisible();

	await janusLogout(page);
});

test("Should open drawer when clicking on see more about", async ({ page }) => {
	await page.route("**/api/ebsco/*/article/search?queries=*", async (route) => {
		await route.fulfill({ json: SEARCH_ARTICLE_MOCK });
	});

	await page.route("**/api/ebsco/*/article/retrieve?*", async (route) => {
		await route.fulfill({ json: RETRIEVE_ARTICLE_MOCK });
	});

	await page.goto("/");
	await page.getByRole("link", { name: "Article" }).click();
	await page.getByRole("button", { name: /Connectez-vous /i }).click();
	await page.getByPlaceholder(/Rechercher des articles/i).fill("AIDS");
	await page.getByPlaceholder(/Rechercher des articles/i).press("Enter");

	await expect(
		page.getByRole("link", {
			name: "Over my dead body",
		}),
	).toBeVisible();

	page
		.getByRole("button", {
			name: /En savoir plus sur "Over my dead body"/i,
		})
		.click();

	await expect(
		page.getByRole("link", {
			name: "Estimation of the current global burden of cryptococcal",
		}),
	).toBeVisible();

	await expect(
		page.getByRole("heading", {
			name: "Résumé",
		}),
	).toBeVisible();

	await expect(
		page.getByText("Objective: Cryptococcal meningitis"),
	).toBeVisible();

	await expect(
		page.getByRole("heading", {
			name: "Auteurs",
		}),
	).toBeVisible();

	await expect(page.getByText("Govender")).toBeVisible();

	await expect(
		page.getByRole("heading", {
			name: "Source",
		}),
	).toBeVisible();

	await page
		.locator(".MuiDrawer-root")
		.filter({ hasText: "Article" })
		.click({
			position: {
				x: 1,
				y: 1,
			},
		});

	await expect(
		page.getByRole("link", {
			name: "The influence of hearing aid",
		}),
	).toBeVisible();
	await janusLogout(page);
});

test("Add favorite", async ({ page }) => {
	await page.route("**/api/ebsco/*/article/search?queries=*", async (route) => {
		await route.fulfill({ json: SEARCH_ARTICLE_MOCK });
	});

	await page.route("**/api/ebsco/*/article/retrieve?*", async (route) => {
		await route.fulfill({ json: RETRIEVE_ARTICLE_MOCK });
	});

	await page.goto("/");
	await page.getByRole("link", { name: "Article" }).click();
	await page.getByRole("button", { name: /Connectez-vous /i }).click();
	await page.getByPlaceholder(/Rechercher des articles/i).fill("AIDS");
	await page.getByPlaceholder(/Rechercher des articles/i).press("Enter");

	{
		const response = page.waitForResponse("/api/front/favourite_resources/1");
		await page
			.getByRole("button", {
				name: /Ajouter "Over my dead body"(.+) aux favoris/i,
			})
			.click();
		await response;
	}

	await goToFavorites(page);

	await expect(page.getByText("Over my dead body")).toBeVisible();

	await page
		.getByRole("button", {
			name: "Supprimer http://hdl.handle.net/10520/EJC168622",
		})
		.click();
	{
		const response = page.waitForResponse("/api/front/favourite_resources/1");
		await page.getByRole("button", { name: /Confirmer/i }).click();
		await response;
	}
	await expect(page.getByText("Over my dead body")).not.toBeVisible();

	await janusLogout(page);
});

test("Should add history entry", async ({ page }) => {
	await page.route("**/api/ebsco/*/article/search?queries=*", async (route) => {
		await route.fulfill({ json: SEARCH_ARTICLE_MOCK });
	});

	await page.route("**/api/ebsco/*/article/retrieve?*", async (route) => {
		await route.fulfill({ json: RETRIEVE_ARTICLE_MOCK });
	});

	await page.goto("/");
	await page.getByRole("link", { name: "Article" }).click();
	await page.getByRole("button", { name: /Connectez-vous /i }).click();
	await page.getByPlaceholder(/Rechercher des articles/i).fill("turing");
	await page.getByPlaceholder(/Rechercher des articles/i).press("Enter");

	await goToHistory(page);

	expect(page.getByText("turing").first()).toBeVisible();
	expect(page.getByText("46,405").first()).toBeVisible();

	await janusLogout(page);
});
