import { expect, test } from "@playwright/test";
import { adminLogin, janusLogin, janusLogout } from "../page-objects/login";

test("Display CMS content on the home page", async ({ page }) => {
	await page.goto("/");
	await expect(
		page.getByText(
			"Proin lacinia felis eu lacus lacinia, vel pretium ipsum tincidunt.",
		),
	).toBeVisible();

	await expect(
		page.getByText(
			"Mauris nec quam faucibus, dignissim ex non, posuere lectus. Etiam in mauris accumsan, aliquet justo sit amet, convallis felis. Vivamus diam dui, pulvinar sed consequat ut, iaculis eu lectus.",
		),
	).toBeVisible();
});

test("Display CMS content on the about page", async ({ page }) => {
	await page.goto("/");

	page.getByRole("link", { name: "A propos" }).click();

	await expect(page.getByRole("heading", { name: "A propos" })).toBeVisible();

	await expect(
		page.getByText(
			"Aliquam ullamcorper varius dui in rhoncus. Etiam et est eget quam ultricies maximus iaculis eget est. Integer at augue volutpat, condimentum ex ut, cursus nisl.",
		),
	).toBeVisible();
});

test("Display CMS content on the legal notice page", async ({ page }) => {
	await page.goto("/");

	page.getByRole("link", { name: "Mentions légales" }).click();

	await expect(
		page.getByRole("heading", { name: "Mentions légales" }),
	).toBeVisible();

	await expect(
		page.getByText(
			"Etiam vitae pretium turpis. Maecenas tempor velit eget lorem molestie consectetur. Proin elementum consectetur sem, vel hendrerit dui iaculis eu. Sed id odio vitae neque aliquam rutrum sed quis leo.",
		),
	).toBeVisible();
});

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
