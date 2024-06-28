import { expect, test } from "@playwright/test";
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
			name: /Over my dead body/i,
		}),
	).toBeVisible();

	await expect(
		page.getByText(/Estimation of the current global burden/i),
	).toBeVisible();

	await expect(
		page.getByRole("link", {
			name: /The influence of hearing aid/i,
		}),
	).toBeVisible();

	await janusLogout(page);
});
