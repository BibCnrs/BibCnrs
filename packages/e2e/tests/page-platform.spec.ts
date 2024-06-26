import { expect, test } from "@playwright/test";

test("list platforms", async ({ page }) => {
	const ITEMS = [
		{ label: "ADS / NASA (Harvard)", isComplete: false },
		{ label: "HAL", isComplete: true },
		{ label: "Open Dissertations", isComplete: false },
	];

	await page.goto("/database");

	const databases = page.getByLabel("Plateformes", { exact: true });
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

		if (!item.isComplete) {
			await expect(
				itemNode.getByLabel("Accès à la platforme partiel"),
			).toBeVisible();
		}
	}
});

test("filter platforms ", async ({ page }) => {
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

		if (!item.isComplete) {
			await expect(
				itemNode.getByLabel("Accès à la platforme partiel"),
			).toBeVisible();
		}
	}
});
