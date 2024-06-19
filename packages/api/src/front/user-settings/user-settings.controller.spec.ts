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

	describe("root", () => {});
});
