import { expect, test } from "@playwright/test";
import { janusLogin, janusLogout } from "../page-objects/login";
import { goToSettings } from "../page-objects/settings";

test("list platforms as cards", async ({ page }) => {
	const ITEMS = [
		{ label: "ADS / NASA (Harvard)", isComplete: false },
		{ label: "HAL", isComplete: true },
		{ label: "Open Dissertations", isComplete: false },
	];

	await page.goto("/database");

	const databases = page.getByLabel("Plateformes");
	await expect(databases).toBeVisible({
		timeout: 10000,
	});
	await expect(databases.locator("[role=listitem]")).toHaveCount(3);

	for (const item of ITEMS) {
		const itemNode = databases.getByLabel(item.label).first();

		await expect(itemNode).toBeVisible();

		await expect(
			itemNode.getByRole("link", { name: item.label }),
		).toBeVisible();

		if (item.isComplete) {
			await expect(
				itemNode.getByLabel("Accès à 100% du contenu de la plateforme"),
			).toBeVisible();
		}
	}
});

test("filter platforms as cards", async ({ page }) => {
	const ITEMS = [
		{ label: "ADS / NASA (Harvard)", isComplete: false },
		{ label: "HAL", isComplete: true },
	];

	await page.goto("/database");

	const filter = page.getByRole("combobox", {
		name: "Recherche",
	});

	await expect(filter).toBeVisible({
		timeout: 10000,
	});

	const databases = page.getByLabel("Plateformes", { exact: true });
	await expect(databases).toBeVisible({
		timeout: 10000,
	});

	const searchButton = page.getByRole("search");
	await expect(searchButton).toBeVisible({
		timeout: 10000,
	});

	await filter.fill("HA");
	await searchButton.click();

	await expect(databases.locator("[role=listitem]")).toHaveCount(2);

	for (const item of ITEMS) {
		const itemNode = databases.getByLabel(item.label).first();

		await expect(itemNode).toBeVisible();

		await expect(
			itemNode.getByRole("link", { name: item.label }),
		).toBeVisible();

		if (item.isComplete) {
			await expect(
				itemNode.getByLabel("Accès à 100% du contenu de la plateforme"),
			).toBeVisible();
		}
	}
});

test("list platforms as datagrid", async ({ page }) => {
	const ITEMS = [
		{ label: "ADS / NASA (Harvard)" },
		{ label: "HAL" },
		{ label: "Open Dissertations" },
	];

	await janusLogin(page);

	await goToSettings(page);
	await page.getByRole("button", { name: "Liste" }).click();

	await page.goto("/database");

	for (const item of ITEMS) {
		await expect(page.getByRole("link", { name: item.label })).toBeVisible();
	}

	await goToSettings(page);
	await page.getByRole("button", { name: "Vignettes" }).click();

	await janusLogout(page);
});

test("filter platforms as datagrid", async ({ page }) => {
	const ITEMS = [{ label: "ADS / NASA (Harvard)" }, { label: "HAL" }];

	await janusLogin(page);
	await goToSettings(page);
	await page.getByRole("button", { name: "Liste" }).click();

	await page.goto("/database");

	const filter = page.getByRole("combobox", {
		name: "Recherche",
	});

	await expect(filter).toBeVisible({
		timeout: 10000,
	});

	const searchButton = page.getByRole("search");
	await expect(searchButton).toBeVisible({
		timeout: 10000,
	});

	await filter.fill("HA");
	await searchButton.click();

	for (const item of ITEMS) {
		await expect(page.getByRole("link", { name: item.label })).toBeVisible();
	}

	await expect(
		page.getByRole("link", { name: "Open Dissertations" }),
	).not.toBeVisible();

	await goToSettings(page);
	await page.getByRole("button", { name: "Vignettes" }).click();

	await janusLogout(page);
});

test("filter platforms updates filters result", async ({ page }) => {
	await page.goto("/database");

	const filter = page.getByRole("combobox", {
		name: "Recherche",
	});

	await expect(filter).toBeVisible({
		timeout: 10000,
	});

	const databases = page.getByLabel("Plateformes", { exact: true });
	await expect(databases).toBeVisible({
		timeout: 10000,
	});

	const searchButton = page.getByRole("search");
	await expect(searchButton).toBeVisible({
		timeout: 10000,
	});

	await filter.fill("ADS");
	await searchButton.click();

	await expect(databases.locator("[role=listitem]")).toHaveCount(1);

	await expect(page.getByLabel("Ouvert (1)")).toBeVisible();
	await expect(page.getByLabel("Ouvert (1)")).not.toBeDisabled();

	await expect(page.getByLabel("Complet (0)")).toBeVisible();
	await expect(page.getByLabel("Complet (0)")).toBeDisabled();
});
