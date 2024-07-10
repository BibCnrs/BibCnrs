import { Test, type TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { PrismaService } from "../../prisma/prisma.service";
import { UserSettingsController } from "./user-settings.controller";
import { UserSettingsService } from "./user-settings.service";

describe("UserSettingsController", () => {
	let userSettingsController: UserSettingsController;

	beforeEach(async () => {
		const userSettings: TestingModule = await Test.createTestingModule({
			controllers: [UserSettingsController],
			providers: [UserSettingsService, PrismaService],
		}).compile();

		userSettingsController = userSettings.get<UserSettingsController>(
			UserSettingsController,
		);
	});

	describe("root", () => {
		it("should return content for the news page", async () => {
			expect(await userSettingsController.getUserSettings(1)).toStrictEqual({
				displayFavorites: true,
				displayTestNews: true,
				defaultSearchMode: "article",
				defaultLanguage: "auto",
				defaultTheme: "auto",
				hasSeenPopup: false,
			});
		});

		it("should update user settings", async () => {
			expect(
				await userSettingsController.updateUserSettings(1, {
					displayFavorites: false,
					displayTestNews: false,
					defaultSearchMode: "article",
					defaultLanguage: "fr",
					defaultTheme: "light",
				}),
			).toStrictEqual({
				displayFavorites: false,
				displayTestNews: false,
				defaultSearchMode: "article",
				defaultLanguage: "fr",
				defaultTheme: "light",
				hasSeenPopup: false,
			});
		});
	});
});
