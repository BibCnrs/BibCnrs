import { expect, test } from "@playwright/test";
import {
	inistLogin,
	inistLogout,
	janusLogin,
	janusLogout,
} from "../page-objects/login";

test("Should not display domais for anonymous users", async ({ page }) => {
	await page.goto("/");
	await expect(
		page.getByRole("button", { name: "Sciences Informatiques" }),
	).not.toBeVisible();
});

test("Should display domains on home for janus users", async ({ page }) => {
	await janusLogin(page);
	await expect(
		page.getByRole("button", { name: "Sciences Informatiques" }),
	).toBeVisible();
	await janusLogout(page);
});

test("Should display domains on home for inist users", async ({ page }) => {
	await inistLogin(page);
	await expect(
		page.getByRole("button", { name: "Sciences Informatiques" }),
	).toBeVisible();
	await inistLogout(page);
});
