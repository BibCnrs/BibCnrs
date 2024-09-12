import { expect, test } from "@playwright/test";
import { goToFavorites } from "../page-objects/favorites";
import { janusLogin, janusLogout } from "../page-objects/login";

test.describe.configure({
	mode: "serial",
});

test("Open pinned favorite from home page", async ({ page }) => {
	await janusLogin(page);

	const bibCnrsOpen = page.waitForEvent("popup");
	await page.getByRole("link", { name: "BIB CNRS" }).click();
	const bibCnrsPage = await bibCnrsOpen;
	expect(bibCnrsPage.url()).toBe("https://bib.cnrs.fr/");

	await janusLogout(page);
});

test("Open pinned favorite from favorite page", async ({ page }) => {
	await janusLogin(page);

	await goToFavorites(page);

	const bibCnrsOpen = page.waitForEvent("popup");
	await page.getByRole("link", { name: "BIB CNRS" }).click();
	const bibCnrsPage = await bibCnrsOpen;
	expect(bibCnrsPage.url()).toBe("https://bib.cnrs.fr/");

	await janusLogout(page);
});

test("Reorder favorites", async ({ page }) => {
	const bib = () => page.getByRole("listitem", { name: /bib.cnrs.fr/i });
	const bibIndex = () =>
		bib().evaluate((el) => [...el.parentElement.children].indexOf(el));
	const bibHandler = () => page.getByLabel("Déplacer BIB CNRS");

	const ins2i = () =>
		page.getByRole("listitem", { name: /www.ins2i.cnrs.fr/i });
	const ins2iIndex = () =>
		ins2i().evaluate((el) => [...el.parentElement.children].indexOf(el));

	await janusLogin(page);
	await goToFavorites(page);

	await expect(bib()).toBeVisible();
	await expect(ins2i()).toBeVisible();

	await expect(bibIndex()).resolves.toBe(0);
	await expect(ins2iIndex()).resolves.toBe(1);

	{
		const response = page.waitForResponse("/api/front/favourite_resources/1");
		await bibHandler().dragTo(ins2i());
		await response;
	}

	await expect(bib()).toBeVisible();
	await expect(ins2i()).toBeVisible();

	await expect(bibIndex()).resolves.toBe(1);
	await expect(ins2iIndex()).resolves.toBe(0);

	{
		const response = page.waitForResponse("/api/front/favourite_resources/1");
		await bibHandler().dragTo(ins2i());
		await response;
	}

	await expect(bibIndex()).resolves.toBe(0);
	await expect(ins2iIndex()).resolves.toBe(1);

	await janusLogout(page);
});

test("Pin / Unpin item", async ({ page }) => {
	const cnrs = () => page.getByRole("listitem", { name: /www.cnrs.fr/i });
	const cnrsIndex = () =>
		cnrs().evaluate((el) => [...el.parentElement.children].indexOf(el));

	await janusLogin(page);
	await goToFavorites(page);
	await expect(cnrs()).toBeVisible();

	await expect(cnrsIndex()).resolves.toBe(0);

	{
		const response = page.waitForResponse("/api/front/favourite_resources/1");
		await page
			.getByRole("button", { name: /Épingler https:\/\/www.cnrs.fr/i })
			.click();

		await response;
	}

	await expect(cnrs()).toBeVisible();
	await expect(cnrsIndex()).resolves.toBe(2);

	{
		const response = page.waitForResponse("/api/front/favourite_resources/1");
		await page
			.getByRole("button", { name: /Désépingler https:\/\/www.cnrs.fr/i })
			.click();

		await response;
	}

	await expect(cnrs()).toBeVisible();
	await expect(cnrsIndex()).resolves.toBe(0);

	await janusLogout(page);
});

test("Add / Remove item", async ({ page }) => {
	const cnrs = () => page.getByRole("listitem", { name: /www.cnrs.fr/i });
	const cnrsIndex = () =>
		cnrs().evaluate((el) => [...el.parentElement.children].indexOf(el));

	const marmelab = () => page.getByRole("listitem", { name: /marmelab.com/i });
	const marmelabIndex = () =>
		marmelab().evaluate((el) => [...el.parentElement.children].indexOf(el));

	await janusLogin(page);
	await goToFavorites(page);
	await expect(marmelab()).not.toBeVisible();

	await page.getByRole("button", { name: "Ajouter une ressource" }).click();
	await page.getByLabel("Titre").click();
	await page.getByLabel("Titre").fill("Marmelab");
	await page.getByLabel("URL").fill("https://marmelab.com/fr/");

	await page.getByRole("button", { name: "Enregistrer" }).click();

	await expect(marmelab()).toBeVisible();
	await expect(marmelabIndex()).resolves.toBe(0);
	await expect(cnrsIndex()).resolves.toBe(1);

	await page
		.getByRole("button", { name: /Supprimer https:\/\/marmelab.com/i })
		.click();

	await page.getByRole("button", { name: /Confirmer/i }).click();

	await expect(marmelab()).not.toBeVisible();
	await expect(cnrsIndex()).resolves.toBe(0);
});

test("Show / Hide favorites on home page", async ({ page }) => {
	await janusLogin(page);

	await expect(page.getByRole("link", { name: "BIB CNRS" })).toBeVisible();

	await page.getByRole("button", { name: "Profil" }).click();
	await page.getByLabel("Paramètres").click();
	await page.locator(".MuiBackdrop-root").click();

	await page.getByLabel("Favoris").first().click();
	await page.getByRole("link", { name: "BibCNRS Logo" }).click();

	await expect(page.getByRole("link", { name: "BIB CNRS" })).not.toBeVisible();

	await page.getByRole("button", { name: "Profil" }).click();
	await page.getByLabel("Paramètres").click();
	await page.locator(".MuiBackdrop-root").click();

	await page.getByLabel("Favoris").first().click();
	await page.getByRole("link", { name: "BibCNRS Logo" }).click();

	await expect(page.getByRole("link", { name: "BIB CNRS" })).toBeVisible();

	await janusLogout(page);
});

test("Filter items", async ({ page }) => {
	const cnrs = () => page.getByRole("listitem", { name: /www.cnrs.fr/i });
	const bibcnrs = () => page.getByRole("listitem", { name: /bib.cnrs.fr/i });
	const ins2i = () =>
		page.getByRole("listitem", { name: /www.ins2i.cnrs.fr/i });
	const wikipedia = () => page.getByRole("listitem", { name: /wikipedia.fr/i });

	await janusLogin(page);
	await goToFavorites(page);
	await expect(cnrs()).toBeVisible();
	await expect(bibcnrs()).toBeVisible();
	await expect(ins2i()).toBeVisible();
	await expect(wikipedia()).toBeVisible();

	await page.getByPlaceholder("Rechercher dans mes favoris").fill("CNRS");
	await page.getByPlaceholder("Rechercher dans mes favoris").press("Enter");
	await expect(cnrs()).toBeVisible();
	await expect(bibcnrs()).toBeVisible();
	await expect(wikipedia()).not.toBeVisible();
	await expect(ins2i()).not.toBeVisible();
	await expect(page.getByText("Resources favorites (0)")).toBeDisabled();

	await page.getByText("Revues, ouvrages (1)").click();
	await expect(cnrs()).toBeVisible();
	await expect(wikipedia()).not.toBeVisible();
	await expect(bibcnrs()).not.toBeVisible();
	await expect(ins2i()).not.toBeVisible();

	await page.getByText("Revues, ouvrages (1)").click();
	await page.getByPlaceholder("Rechercher dans mes favoris").fill("");
	await page.getByPlaceholder("Rechercher dans mes favoris").press("Enter");
	await expect(cnrs()).toBeVisible();
	await expect(ins2i()).toBeVisible();
	await expect(bibcnrs()).toBeVisible();
	await expect(ins2i()).toBeVisible();

	await page.getByText("Resources favorites (1)").click();
	await expect(cnrs()).not.toBeVisible();
	await expect(bibcnrs()).not.toBeVisible();
	await expect(ins2i()).not.toBeVisible();
	await expect(wikipedia()).toBeVisible();

	await page.getByText("Articles (1)").click();
	await expect(cnrs()).not.toBeVisible();
	await expect(bibcnrs()).not.toBeVisible();
	await expect(ins2i()).toBeVisible();
	await expect(wikipedia()).toBeVisible();

	await janusLogout(page);
});
