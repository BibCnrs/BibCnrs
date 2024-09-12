import { expect, test } from "@playwright/test";
import { adminLogin, janusLogin, janusLogout } from "../page-objects/login";

test("Content management accessibility", async ({ page }) => {
	await adminLogin(page);
	await page.getByText("Gestion de contenu").click();
	await page.getByText("CRÉER").click();
	await page.getByText("Accessibilité").click();
	await page.getByLabel("Ordre").fill("1");

	await page.getByLabel("Nom *").fill("Accessibilité");
	await page
		.locator(".tiptap.ProseMirror")
		.fill("Contenu d'accessibilité, rédigé avec soin depuis l'admin");
	await page.getByText("ANGLAIS").click();
	await page.getByLabel("Nom *").fill("Accessibility page from admin");
	await page.locator(".tiptap.ProseMirror").fill("english accessibility");
	await page.getByText("ENREGISTRER").click();
	await expect(page.getByText("Élément créé")).toBeVisible();
	await janusLogin(page);

	await page.getByText("Accessibilité").click();
	await page.waitForURL("/accessibility");
	await expect(
		page.getByText("Contenu d'accessibilité, rédigé avec soin depuis l'admin"),
	).toBeVisible();
	await janusLogout(page);
});
