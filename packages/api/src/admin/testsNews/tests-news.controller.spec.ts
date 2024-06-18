import { HttpException } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Test, type TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { beforeEach, describe, expect, test, vi } from "vitest";
import configFunction from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { AdminAuthenticationGuard } from "../authentication/authentication.guard";
import { TestsNewsController } from "./tests-news.controller";
import { TestsNewsService } from "./tests-news.service";

describe("TestsNewsController", () => {
	let prisma: PrismaService;
	let testsNewsController: TestsNewsController;

	beforeEach(async () => {
		const testingModule: TestingModule = await Test.createTestingModule({
			imports: [
				ConfigModule.forRoot({
					ignoreEnvFile: true,
					load: [configFunction],
					isGlobal: false,
				}),
				JwtModule.register({
					global: false,
				}),
			],
			controllers: [TestsNewsController],
			providers: [TestsNewsService, PrismaService, AdminAuthenticationGuard],
		}).compile();

		prisma = testingModule.get<PrismaService>(PrismaService);
		testsNewsController =
			testingModule.get<TestsNewsController>(TestsNewsController);
	});

	describe("root", () => {
		test("should return list of tests and news", async () => {
			const res = {
				header: vi.fn(),
				send: vi.fn(),
			};

			await testsNewsController.findAll({}, res as unknown as Response);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						id: 1,
						page: "news",
						enable: true,
						from: new Date("2022-01-01"),
						to: null,
						name_en: "News 2",
						name_fr: "News 2",
						content_en: "Test News 2",
						content_fr: "Test News 2",
					}),
					expect.objectContaining({
						id: 2,
						page: "tests",
						enable: true,
						from: new Date("2021-01-01"),
						to: null,
						name_en: "News 1",
						name_fr: "News 1",
						content_en: "Test News 1",
						content_fr: "Test News 1",
					}),
				]),
			);
		});

		test("should return a single test news", async () => {
			const data = await testsNewsController.findOne(2);
			expect(data).toStrictEqual({
				id: 2,
				page: "tests",
				enable: true,
				from: new Date("2021-01-01"),
				to: null,
				name_en: "News 1",
				name_fr: "News 1",
				content_en: "Test News 1",
				content_fr: "Test News 1",
				urls: null,
				media: null,
				media_id: null,
				communities: [1, 2],
			});
		});

		test("should create a new test news, update it and delete it", async () => {
			const randomName = `newAdmin${Math.floor(Math.random() * 1000)}`;

			const createdTestNew = await testsNewsController.create({
				page: "tests",
				enable: true,
				from: new Date("2021-01-01"),
				to: null,
				name_en: randomName,
				name_fr: randomName,
				content_en: "Test News random",
				content_fr: "Test News random",
				domains: null,
				urls: null,
				media_id: null,
				media: null,
				communities: [1],
			});

			expect(createdTestNew).toEqual(
				expect.objectContaining({
					page: "tests",
					enable: true,
					from: new Date("2021-01-01"),
					to: null,
					name_en: randomName,
					name_fr: randomName,
					content_en: "Test News random",
					content_fr: "Test News random",
					urls: null,
					communities: [1],
				}),
			);

			await expect(
				prisma.tests_news_community.findMany({
					where: { tests_news_id: createdTestNew.id },
					orderBy: { community_id: "asc" },
				}),
			).resolves.toEqual([
				{ tests_news_id: createdTestNew.id, community_id: 1 },
			]);

			const updatedTestNew = await testsNewsController.update(
				createdTestNew.id,
				{
					...createdTestNew,
					name_fr: "Bonjour Updated",
					name_en: "Hello Updated",
					media: null,
					communities: [2],
				},
			);

			expect(updatedTestNew).toEqual(
				expect.objectContaining({
					name_fr: "Bonjour Updated",
					name_en: "Hello Updated",
				}),
			);

			await expect(
				prisma.tests_news_community.findMany({
					where: { tests_news_id: createdTestNew.id },
					orderBy: { community_id: "asc" },
				}),
			).resolves.toEqual([
				{ tests_news_id: createdTestNew.id, community_id: 2 },
			]);

			await testsNewsController.remove(updatedTestNew.id);

			await expect(
				testsNewsController.findOne(updatedTestNew.id),
			).rejects.toThrow(HttpException);
		});
	});
});
