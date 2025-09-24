import { expect, test } from "@playwright/test";
import { goToAlerts } from "../page-objects/alerts";
import { searchArticle } from "../page-objects/article";
import { goToHistory } from "../page-objects/history";
import { janusLogin, janusLogout } from "../page-objects/login";
import { RETRIEVE_ARTICLE_MOCK } from "./mocks/retrieveArticle.mock";
import { SEARCH_ARTICLE_MOCK } from "./mocks/searchArticle.mock";

test("Add search alert", async ({ page }) => {
	await page.route("**/api/ebsco/*/article/search?queries=*", async (route) => {
		await route.fulfill({ json: SEARCH_ARTICLE_MOCK });
	});

	await page.route("**/api/ebsco/*/article/retrieve?*", async (route) => {
		await route.fulfill({ json: RETRIEVE_ARTICLE_MOCK });
	});

	await janusLogin(page);

	await searchArticle(page, "Marmelab");

	await goToAlerts(page);
	await expect(
		page.getByRole("heading", { name: "Aucune ressource trouvée." }),
	).toBeVisible();

	await goToHistory(page);

	expect(page.getByText("Marmelab").first()).toBeVisible();

	await page
		.getByRole("button", {
			name: "Ajouter une alerte pour la recherche Marmelab",
		})
		.first()
		.click();
	await page.getByRole("button", { name: "Enregistrer" }).click();

	await goToAlerts(page);
	await expect(
		page.getByRole("heading", { name: "Aucune ressource trouvée." }),
	).not.toBeVisible();

	await page.getByLabel("alerte pour la recherche Marmelab").hover();
	await expect(page.getByText("Quotidienne")).toBeVisible();

	await page
		.getByRole("button", { name: "Supprimer l'entrée Marmelab" })
		.click();

	await page.getByRole("button", { name: "Confirmer" }).click();

	await expect(
		page.getByRole("heading", { name: "Aucune ressource trouvée." }),
	).toBeVisible();

	await janusLogout(page);
});

test("Disable search alert", async ({ page }) => {
	await page.route("**/api/ebsco/*/article/search?queries=*", async (route) => {
		await route.fulfill({ json: SEARCH_ARTICLE_MOCK });
	});

	await page.route("**/api/ebsco/*/article/retrieve?*", async (route) => {
		await route.fulfill({ json: RETRIEVE_ARTICLE_MOCK });
	});

	await janusLogin(page);

	await searchArticle(page, "INIST");

	await goToAlerts(page);
	await expect(
		page.getByRole("heading", { name: "Aucune ressource trouvée." }),
	).toBeVisible();

	await goToHistory(page);

	expect(page.getByText("INIST").first()).toBeVisible();

	await page.getByLabel("alerte pour la recherche INIST").first().click();
	await page.getByRole("button", { name: "Enregistrer" }).click();

	await goToAlerts(page);
	await expect(
		page.getByRole("heading", { name: "Aucune ressource trouvée." }),
	).not.toBeVisible();

	await page.getByLabel("alerte pour la recherche INIST").click();

	await page.getByText("Quotidienne").click();
	await page.getByRole("option", { name: "Désactiver/réactiver" }).click();

	{
		const listResponse = page.waitForResponse("/api/front/history?limit=*");
		const editResponse = page.waitForResponse("/api/front/history/toggle/*");
		await page.getByRole("button", { name: "Enregistrer" }).click();
		await editResponse;
		await listResponse;
	}

	await page.getByLabel("alerte pour la recherche INIST").hover();
	await expect(page.getByText("Quotidienne")).not.toBeVisible();

	await page.getByRole("button", { name: "Supprimer l'entrée INIST" }).click();
	await page.getByRole("button", { name: "Confirmer" }).click();
	await janusLogout(page);
});
