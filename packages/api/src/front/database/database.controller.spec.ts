import { Test, type TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { PrismaService } from "../../prisma/prisma.service";
import { FrontDatabaseController } from "./database.controller";
import { FrontDatabaseService } from "./database.service";

describe("FrontDatabaseController", () => {
	let frontDatabaseController: FrontDatabaseController;

	beforeEach(async () => {
		const frontDatabase: TestingModule = await Test.createTestingModule({
			controllers: [FrontDatabaseController],
			providers: [FrontDatabaseService, PrismaService],
		}).compile();

		frontDatabaseController = frontDatabase.get<FrontDatabaseController>(
			FrontDatabaseController,
		);
	});

	describe("root", () => {
		it("should return active databases", async () => {
			expect(await frontDatabaseController.getDatabases()).toStrictEqual([
				expect.objectContaining({
					name_fr: "Wiley",
					text_fr: "Plateforme multidisciplinaire",
					text_en: "Multidisciplinary platform",
					url_fr: "https://onlinelibrary.wiley.com/",
					url_en: "https://onlinelibrary.wiley.com/",
					name_en: "Wiley",
					active: true,
					oa: true,
					use_proxy: true,
				}),
				expect.objectContaining({
					name_fr: "Springer",
					text_fr: "Plateforme multidisciplinaire springer",
					text_en: "Multidisciplinary platform springer",
					url_fr: "https://link.springer.com/",
					url_en: "https://link.springer.com/",
					name_en: "Springer",
					active: true,
					oa: false,
					use_proxy: false,
				}),
			]);
		});
	});
});
