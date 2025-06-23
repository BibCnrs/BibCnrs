import { expect, test } from "@playwright/test";

test("Display FAQ items", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("link", { name: "FAQ" }).click();

	await expect(
		page.getByRole("heading", { name: "En savoir plus sur Unpaywall ?" }),
	).toBeVisible();
	await expect(
		page.getByRole("heading", { name: "Comment rechercher une publication ?" }),
	).toBeVisible();
	await expect(
		page.getByRole("heading", { name: "Test passé" }),
	).not.toBeVisible();
});

const FULL_TEXT =
	"Une base de données ouverte de plus de 46 millions d’articles scientifiques gratuits issue du projet de Our Research, organisme à but non lucratif qui crée des outils pour rendre la recherche universitaire plus ouverte.";

test("Open FAQ item when clicking on title", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("link", { name: "FAQ" }).click();

	await expect(
		page.getByRole("heading", { name: "En savoir plus sur Unpaywall ?" }),
	).toBeVisible();

	await page
		.getByRole("heading", { name: "En savoir plus sur Unpaywall ?" })
		.click();

	await expect(page.getByText(FULL_TEXT)).toBeVisible();

	await page
		.getByRole("heading", { name: "En savoir plus sur Unpaywall ?" })
		.click();

	await expect(page.getByText(FULL_TEXT)).toBeVisible();
});
