import { expect, test } from "@playwright/test";
import { adminLogin } from "../page-objects/login";

test("Content management accessibility", async ({ page }) => {
	await adminLogin(page);
});
