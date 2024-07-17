import { expect, test } from "@playwright/test";
import { goToHistory } from "../page-objects/history";
import { janusLogout } from "../page-objects/login";
import { RETRIEVE_ARTICLE_MOCK } from "./mocks/retrieveArticle.mock";
import { SEARCH_ARTICLE_MOCK } from "./mocks/searchArticle.mock";

test("Should delete history entry", async ({ page }) => {
	await page.route("**/api/ebsco/*/article/search?queries=*", async (route) => {
		await route.fulfill({ json: SEARCH_ARTICLE_MOCK });
	});

	await page.route("**/api/ebsco/*/article/retrieve?*", async (route) => {
		await route.fulfill({ json: RETRIEVE_ARTICLE_MOCK });
	});

	await page.goto("/");
	await page.getByRole("link", { name: "Article" }).click();
	await page.getByRole("button", { name: /Connectez-vous /i }).click();
	await page.getByPlaceholder(/Rechercher des articles/i).fill("Le Cun");
	await page.getByPlaceholder(/Rechercher des articles/i).press("Enter");

	await goToHistory(page);

	expect(page.getByText("Le Cun").first()).toBeVisible();
	expect(page.getByText("46 405").first()).toBeVisible();

	await page.getByRole("button", { name: "Supprimer l'entrée Le Cun" }).click();
	await page.getByRole("button", { name: "Confirmer" }).click();

	expect(page.getByText("Le Cun").first()).not.toBeVisible();

	await janusLogout(page);
});

test("Should perform search", async ({ page }) => {
	await page.route("**/api/ebsco/*/article/search?queries=*", async (route) => {
		await route.fulfill({ json: SEARCH_ARTICLE_MOCK });
	});

	await page.route("**/api/ebsco/*/article/retrieve?*", async (route) => {
		await route.fulfill({ json: RETRIEVE_ARTICLE_MOCK });
	});

	await page.goto("/");
	await page.getByRole("link", { name: "Article" }).click();
	await page.getByRole("button", { name: /Connectez-vous /i }).click();
	await page.getByPlaceholder(/Rechercher des articles/i).fill("Jeff Dean");
	await page.getByPlaceholder(/Rechercher des articles/i).press("Enter");

	await goToHistory(page);

	expect(page.getByText("Jeff Dean").first()).toBeVisible();
	expect(page.getByText("46 405").first()).toBeVisible();

	await page
		.getByRole("button", { name: "Lancer la recherche Jeff Dean" })
		.click();

	expect(page.getByPlaceholder(/Rechercher des articles/i)).toHaveValue(
		"Jeff Dean",
	);

	await janusLogout(page);
});
