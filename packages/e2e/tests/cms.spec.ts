import { type Page, expect, test } from "@playwright/test";
import { adminLogin, janusLogin, janusLogout } from "../page-objects/login";

async function handleCookieBanner(page: Page) {
	const cookieBanner = page.locator("#optout-form");
	if (await cookieBanner.isVisible()) {
		await cookieBanner
			.locator('button:has-text("Accepter")')
			.click({ force: true });

		await page
			.waitForSelector("#optout-form", {
				state: "hidden",
				timeout: 10000,
			})
			.catch(async () => {
				await page.evaluate(() => {
					const banner = document.querySelector("#optout-form") as HTMLElement;
					if (banner) {
						banner.style.display = "none";
					}
				});
			});
	}
}

test("Display CMS content on the home page", async ({ page }) => {
	await page.goto("/");
	await handleCookieBanner(page);

	await page
		.getByRole("link", { name: "Mentions légales" })
		.click({ force: true });
	await expect(
		page.getByRole("heading", { name: "Mentions légales" }),
	).toBeVisible();

	await expect(
		page.getByText(
			"Etiam vitae pretium turpis. Maecenas tempor velit eget lorem molestie consectetur. Proin elementum consectetur sem, vel hendrerit dui iaculis eu. Sed id odio vitae neque aliquam rutrum sed quis leo.",
		),
	).toBeVisible();
});

test("Display CMS content on the about page", async ({ page }) => {
	await page.goto("/");
	await handleCookieBanner(page);

	await page.getByRole("link", { name: "A propos" }).click({ force: true });

	await expect(page.getByRole("heading", { name: "A propos" })).toBeVisible();

	await expect(
		page.getByText(
			"Aliquam ullamcorper varius dui in rhoncus. Etiam et est eget quam ultricies maximus iaculis eget est. Integer at augue volutpat, condimentum ex ut, cursus nisl.",
		),
	).toBeVisible();
});

test("Display CMS content on the legal notice page", async ({ page }) => {
	await page.goto("/");
	await handleCookieBanner(page);

	await page
		.getByRole("link", { name: "Mentions légales" })
		.click({ force: true });

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
	await page.getByText("Gestion de contenu").click({ force: true });
	await page.getByText("CRÉER").click({ force: true });
	await page.getByText("Accessibilité").click({ force: true });
	await page.getByLabel("Ordre").fill("1");

	await page.getByLabel("Nom *").fill("Accessibilité");
	await page
		.locator(".tiptap.ProseMirror")
		.fill("Contenu d'accessibilité, rédigé avec soin depuis l'admin");
	await page.getByText("ANGLAIS").click({ force: true });
	await page.getByLabel("Nom *").fill("Accessibility page from admin");
	await page.locator(".tiptap.ProseMirror").fill("english accessibility");
	await page.getByText("ENREGISTRER").click({ force: true });
	await expect(page.getByText("Élément créé")).toBeVisible();
	await janusLogin(page);
	await handleCookieBanner(page);

	await page.getByText("Accessibilité").click({ force: true });
	await page.waitForURL("/accessibility");
	await expect(
		page.getByText("Contenu d'accessibilité, rédigé avec soin depuis l'admin"),
	).toBeVisible();
	await janusLogout(page);
});
