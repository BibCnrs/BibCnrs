import { ConfigModule } from "@nestjs/config";
import { Test, type TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import configFunction from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { FrontTestNewsController } from "./testNews.controller";
import { FrontTestNewsService } from "./testNews.service";

describe.sequential("FrontTestNewsController", () => {
	let ebscoTestNewsController: FrontTestNewsController;

	beforeEach(async () => {
		const ebscoTestNews: TestingModule = await Test.createTestingModule({
			imports: [
				ConfigModule.forRoot({
					ignoreEnvFile: true,
					load: [configFunction],
					isGlobal: true,
				}),
			],
			controllers: [FrontTestNewsController],
			providers: [FrontTestNewsService, PrismaService],
		}).compile();

		ebscoTestNewsController = ebscoTestNews.get<FrontTestNewsController>(
			FrontTestNewsController,
		);
	});

	describe("getTestNews", () => {
		it("should return content for the news page", async () => {
			expect(await ebscoTestNewsController.getTestNews()).toStrictEqual([
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
					id: 1,
					urls: null,
					tests_news_community: [
						{
							community: { name: "INSHS" },
							community_id: 1,
							tests_news_id: 1,
						},
					],
				}),
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
					id: 2,
					urls: null,
					tests_news_community: [
						{
							community: { name: "INSHS" },
							community_id: 1,
							tests_news_id: 2,
						},
						{
							community: { name: "INSB" },
							community_id: 2,
							tests_news_id: 2,
						},
					],
				}),
			]);

			expect(await ebscoTestNewsController.getTestNews("INSHS")).toStrictEqual([
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
					id: 1,
					tests_news_community: [
						{
							community: { name: "INSHS" },
							community_id: 1,
							tests_news_id: 1,
						},
					],
				}),
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
					id: 2,
					tests_news_community: [
						{
							community: { name: "INSHS" },
							community_id: 1,
							tests_news_id: 2,
						},
						{
							community: { name: "INSB" },
							community_id: 2,
							tests_news_id: 2,
						},
					],
				}),
			]);

			expect(await ebscoTestNewsController.getTestNews("INSB")).toStrictEqual([
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
					id: 2,
					tests_news_community: [
						{
							community: { name: "INSHS" },
							community_id: 1,
							tests_news_id: 2,
						},
						{
							community: { name: "INSB" },
							community_id: 2,
							tests_news_id: 2,
						},
					],
				}),
			]);
		});
	});

	describe("getTestNewsHome", () => {
		it("should return the three most recent article of the given domains", async () => {
			expect(
				await ebscoTestNewsController.getTestNewsHome("INSB,INS2I,INSHS"),
			).toStrictEqual([
				expect.objectContaining({
					tests_news_community: [
						expect.objectContaining({ community: { name: "INSHS" } }),
					],
					from: new Date("2022-01-01T00:00:00.000Z"),
				}),
				expect.objectContaining({
					tests_news_community: [
						expect.objectContaining({ community: { name: "INSHS" } }),
						expect.objectContaining({ community: { name: "INSB" } }),
					],
					from: new Date("2021-01-01T00:00:00.000Z"),
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
