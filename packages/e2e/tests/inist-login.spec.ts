import { expect, test } from "@playwright/test";
import { inistLogin, inistLogout } from "../page-objects/login";

test("Inist login", async ({ page }) => {
	await inistLogin(page);

	await inistLogout(page);
});

test("Inist user menu", async ({ page }) => {
	await inistLogin(page);

	await page.getByRole("button", { name: "Profil", exact: true }).click();

	await expect(
		page.getByRole("menuitem", { name: "Mon Historique" }),
	).not.toBeVisible();

	await expect(
		page.getByRole("menuitem", { name: "Mes Favoris" }),
	).not.toBeVisible();

	await expect(
		page.getByRole("menuitem", { name: "Mes Alertes" }),
	).not.toBeVisible();

	await expect(
		page.getByRole("menuitem", { name: "Paramètres" }),
	).not.toBeVisible();

	await expect(
		page.getByRole("menuitem", {
			name: "Vous n'êtes pas connecté au niveau individuel",
		}),
	).toBeVisible();

	await page.locator(".MuiBackdrop-root").click();

	await inistLogout(page);
});

test("Inist login failure", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("button", { name: "Connexion" }).click();
	await page
		.getByRole("button", { name: "Code d'accès de votre unité" })
		.click();
	await page.getByLabel("Identifiant").click();
	await page.getByLabel("Identifiant").fill("Marmelab");
	await page.getByLabel("Mot de passe").fill("Invalid");
	await page.getByRole("button", { name: "Connexion" }).click();

	await expect(
		page.getByText(
			"L'identifiant/mot de passe saisi n'a pas permis de vous connecter au portail.",
		),
	).toBeVisible();
});
