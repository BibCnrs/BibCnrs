import { test } from "@playwright/test";
import { janusLogin, janusLogout } from "../page-objects/login";

test("Janus login and logout", async ({ page }) => {
	await janusLogin(page);
	await janusLogout(page);
});
