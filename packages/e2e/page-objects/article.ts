import type { Page } from "@playwright/test";

export async function searchArticle(page: Page, query: string) {
	await page.getByRole("link", { name: "Article" }).click();
	await page.getByPlaceholder(/Rechercher des articles/i).fill(query);
	await page.getByPlaceholder(/Rechercher des articles/i).press("Enter");
}
