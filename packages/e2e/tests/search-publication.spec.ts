import { expect, test } from "@playwright/test";
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
		"**/api/ebsco/*/publication/retrieve/edp1922892",
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
});
