import { HttpException } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { PrismaService } from "../../prisma/prisma.service";
import { TestsNewsController } from "./tests-news.controller";
import { TestsNewsService } from "./tests-news.service";

describe("TestsNewsController", () => {
	let testsNewsController: TestsNewsController;

	beforeEach(async () => {
		const testingModule: TestingModule = await Test.createTestingModule({
			controllers: [TestsNewsController],
			providers: [TestsNewsService, PrismaService],
		}).compile();

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
						page: "home",
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
						page: "home",
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
				page: "home",
				enable: true,
				from: new Date("2021-01-01"),
				to: null,
				name_en: "News 1",
				name_fr: "News 1",
				content_en: "Test News 1",
				content_fr: "Test News 1",
				domains: null,
				urls: null,
			});
		});

		test("should create a new test news, update it and delete it", async () => {
			const randomName = `newAdmin${Math.floor(Math.random() * 1000)}`;

			const createdTestNew = await testsNewsController.create({
				page: "home",
				enable: true,
				from: new Date("2021-01-01"),
				to: null,
				name_en: randomName,
				name_fr: randomName,
				content_en: "Test News random",
				content_fr: "Test News random",
				domains: null,
				urls: null,
			});

			expect(createdTestNew).toEqual(
				expect.objectContaining({
					page: "home",
					enable: true,
					from: new Date("2021-01-01"),
					to: null,
					name_en: randomName,
					name_fr: randomName,
					content_en: "Test News random",
					content_fr: "Test News random",
					domains: null,
					urls: null,
				}),
			);

			const updatedTestNew = await testsNewsController.update(
				createdTestNew.id,
				{
					...createdTestNew,
					name_fr: "Bonjour Updated",
					name_en: "Hello Updated",
				},
			);

			expect(updatedTestNew).toEqual(
				expect.objectContaining({
					name_fr: "Bonjour Updated",
					name_en: "Hello Updated",
				}),
			);

			await testsNewsController.remove(updatedTestNew.id);

			await expect(
				testsNewsController.findOne(updatedTestNew.id),
			).rejects.toThrow(HttpException);
		});
	});
});