import { Test, type TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { PrismaService } from "../../prisma/prisma.service";
import { EbscoTestNewsController } from "./ebsco-test-news.controller";
import { EbscoTestNewsService } from "./ebsco-test-news.service";

describe("EbscoTestNewsController", () => {
	let ebscoTestNewsController: EbscoTestNewsController;

	beforeEach(async () => {
		const ebscoTestNews: TestingModule = await Test.createTestingModule({
			controllers: [EbscoTestNewsController],
			providers: [EbscoTestNewsService, PrismaService],
		}).compile();

		ebscoTestNewsController = ebscoTestNews.get<EbscoTestNewsController>(
			EbscoTestNewsController,
		);
	});

	describe("getTestNews", () => {
		it("should return content for the news page", async () => {
			expect(await ebscoTestNewsController.getTestNews()).toStrictEqual([
				expect.objectContaining({
					page: "tests",
					enable: true,
					from: new Date("2021-01-01"),
					to: null,
					name_en: "News 1",
					name_fr: "News 1",
					content_en: "Test News 1",
					content_fr: "Test News 1",
					media_id: null,
					media: null,
					domains: null,
					id: 2,
				}),
				expect.objectContaining({
					page: "news",
					enable: true,
					from: new Date("2022-01-01"),
					to: null,
					name_en: "News 2",
					name_fr: "News 2",
					content_en: "Test News 2",
					content_fr: "Test News 2",
					media_id: null,
					media: null,
					domains: null,
					id: 1,
				}),
			]);
		});
	});

	describe("findTestNewsById", () => {
		it("should return the last item for news individual page", async () => {
			expect(await ebscoTestNewsController.findTestNewsById(2)).toStrictEqual(
				expect.objectContaining({
					page: "tests",
					enable: true,
					from: new Date("2021-01-01"),
					to: null,
					name_en: "News 1",
					name_fr: "News 1",
					content_en: "Test News 1",
					content_fr: "Test News 1",
				}),
			);
		});

		it("should return no content for the help page", async () => {
			expect(await ebscoTestNewsController.findTestNewsById(9999)).toBeNull();
		});
	});
});
