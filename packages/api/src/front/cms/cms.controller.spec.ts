import { Test, type TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { PrismaService } from "../../prisma/prisma.service";
import { FrontCmsController } from "./cms.controller";
import { FrontCmsService } from "./cms.service";

describe("FrontCmsController", () => {
	let ebscoCmsController: FrontCmsController;

	beforeEach(async () => {
		const ebscoCms: TestingModule = await Test.createTestingModule({
			controllers: [FrontCmsController],
			providers: [FrontCmsService, PrismaService],
		}).compile();

		ebscoCmsController = ebscoCms.get<FrontCmsController>(FrontCmsController);
	});

	describe("root", () => {
		it("should return content for the home page", async () => {
			expect(await ebscoCmsController.getContent("home")).toStrictEqual([
				expect.objectContaining({
					page: "home",
					enable: true,
					from: new Date("2021-01-01"),
					to: null,
					name_en: "Hello 1",
					name_fr: "Bonjour 1",
					content_en: "Hello! 1",
					content_fr: "Bonjour! 1",
				}),
				expect.objectContaining({
					page: "home",
					enable: true,
					from: new Date("2022-01-01"),
					to: null,
					name_en: "Hello 2",
					name_fr: "Bonjour 2",
					content_en: "Hello! 2",
					content_fr: "Bonjour! 2",
				}),
			]);
		});

		it("should return the last item for home page", async () => {
			expect(await ebscoCmsController.getContent("home", "")).toStrictEqual([
				expect.objectContaining({
					page: "home",
					enable: true,
					from: new Date("2021-01-01"),
					to: null,
					name_en: "Hello 1",
					name_fr: "Bonjour 1",
					content_en: "Hello! 1",
					content_fr: "Bonjour! 1",
				}),
			]);
		});

		it("should return no content for the help page", async () => {
			expect(await ebscoCmsController.getContent("help")).toStrictEqual([]);
		});
	});
});
