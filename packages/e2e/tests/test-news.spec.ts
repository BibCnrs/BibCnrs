import { expect, test } from "@playwright/test";
import { janusLogin, janusLogout } from "../page-objects/login";

test.describe.configure({
	mode: "serial",
});

test("Display the last news on the home page", async ({ page }) => {
	await page.goto("/");
	await janusLogin(page);
	await expect(
		page.getByRole("link", {
			name: "Deuxième actualité",
		}),
	).toBeVisible();
	await janusLogout(page);
});

test("Display news content from the home page", async ({ page }) => {
	await page.goto("/");
	await janusLogin(page);

	await page
		.getByRole("link", {
			name: "Deuxième actualité",
		})
		.click();

	await expect(
		page.getByRole("heading", {
			name: "Deuxième actualité",
		}),
	).toBeVisible();

	await expect(page.getByText("18/05/2023")).toBeVisible();
	await expect(
		page.getByText(
			"Nam hendrerit, ipsum sit amet luctus sagittis, nisi dui semper tortor, id sodales nisi turpis vel odio. Nam ut efficitur sapien. Suspendisse justo libero, dapibus in erat vel, ultrices condimentum nisl. Vivamus semper porttitor gravida.",
		),
	).toBeVisible();

	await janusLogout(page);
});

test("List all news when clicking on see all news links", async ({ page }) => {
	await page.goto("/");
	await janusLogin(page);

	await page
		.getByRole("link", {
			name: "Voir plus d'actualités",
		})
		.click();

	await expect(
		page.getByRole("link", {
			name: "Deuxième actualité",
		}),
	).toBeVisible();

	await expect(
		page.getByRole("link", {
			name: "Première actualité",
		}),
	).toBeVisible();
	await janusLogout(page);
});

test("Show / Hide test news on home page", async ({ page }) => {
	await janusLogin(page);

	await expect(
		page.getByRole("link", {
			name: "Deuxième actualité",
		}),
	).toBeVisible();

	await page.getByRole("button", { name: "Profil" }).click();
	await page.getByLabel("Mes Paramètres").click();
	await page.locator(".MuiBackdrop-root").click();

	await page.getByLabel("Actualités").first().click();
	await page.getByRole("link", { name: "BibCNRS Logo" }).click();

	await expect(
		page.getByRole("link", {
			name: "Deuxième actualité",
		}),
	).not.toBeVisible();

	await page.getByRole("button", { name: "Profil" }).click();
	await page.getByLabel("Mes Paramètres").click();
	await page.locator(".MuiBackdrop-root").click();

	await page.getByLabel("Actualités").first().click();
	await page.getByRole("link", { name: "BibCNRS Logo" }).click();

	await expect(
		page.getByRole("link", {
			name: "Deuxième actualité",
		}),
	).toBeVisible();

	await janusLogout(page);
});
