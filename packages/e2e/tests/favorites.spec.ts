import { expect, test } from "@playwright/test";
import { goToFavorites } from "../page-objects/favorites";
import { janusLogin, janusLogout } from "../page-objects/login";

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

	await bib().dragTo(ins2i());

	await expect(bib()).toBeVisible();
	await expect(ins2i()).toBeVisible();

	await expect(bibIndex()).resolves.toBe(1);
	await expect(ins2iIndex()).resolves.toBe(0);

	await bib().dragTo(ins2i());

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

	await page
		.getByRole("button", { name: /Épingler https:\/\/www.cnrs.fr/i })
		.click();

	await page.waitForResponse("/api/ebsco/favourite_resources/1");

	await expect(cnrs()).toBeVisible();
	await expect(cnrsIndex()).resolves.toBe(2);

	await page
		.getByRole("button", { name: /Désépingler https:\/\/www.cnrs.fr/i })
		.click();

	await page.waitForResponse("/api/ebsco/favourite_resources/1");
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
	await page.waitForResponse("/api/ebsco/favourite_resources/1");
	await expect(marmelab()).not.toBeVisible();
	await expect(cnrsIndex()).resolves.toBe(0);
});