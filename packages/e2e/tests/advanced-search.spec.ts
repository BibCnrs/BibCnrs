import { expect, test } from "@playwright/test";
import { janusLogin, janusLogout } from "../page-objects/login";

test("Should build search query", async ({ page }) => {
	await janusLogin(page);
	await page.getByRole("link", { name: "Article" }).click();
	await page.getByLabel("Recherche avancée").click();

	await page.getByRole("textbox").click();
	await page.getByRole("textbox").fill("Yann Le Cun");

	await page.getByLabel("Ajouter un élément").last().click();
	await page.getByRole("textbox").nth(1).click();
	await page.getByText("Auteur").nth(1).click();
	await page.getByRole("option", { name: "Titre", exact: true }).click();
	await page.getByRole("textbox").nth(1).click();
	await page.getByRole("textbox").nth(1).fill("propagation");

	await page.getByLabel("Ajouter un groupe").first().click();

	await page.getByRole("textbox").nth(2).click();
	await page.getByRole("textbox").nth(2).fill("Jeff Dean");

	await page.getByLabel("Ajouter un élément").last().click();

	await page.getByText("Auteur", { exact: true }).nth(2).click();
	await page.getByRole("option", { name: "Titre", exact: true }).click();
	await page.getByRole("textbox").nth(3).click();
	await page.getByRole("textbox").nth(3).fill("neural network");

	await page.getByRole("button", { name: "Rechercher" }).click();
	await expect(
		page.getByPlaceholder("Rechercher des articles, des"),
	).toHaveValue(
		"((AU Yann N0 Le N0 Cun) AND (TI propagation)) AND ((AU Jeff N0 Dean) AND (TI neural network))",
	);
	await janusLogout(page);
});
