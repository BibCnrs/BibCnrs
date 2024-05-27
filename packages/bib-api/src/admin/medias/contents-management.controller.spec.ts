import { HttpException } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { PrismaService } from "../../prisma/prisma.service";
import { MediasController } from "./medias.controller";
import { MediasService } from "./medias.service";

describe("MediaController", () => {
	let mediaController: MediasController;

	beforeEach(async () => {
		const testingModule: TestingModule = await Test.createTestingModule({
			controllers: [MediasController],
			providers: [MediasService, PrismaService],
		}).compile();

		mediaController = testingModule.get<MediasController>(MediasController);
	});

	describe("root", () => {
		test("should return list of contents media", async () => {
			const res = {
				header: vi.fn(),
				send: vi.fn(),
			};

			await mediaController.findAll({}, res as unknown as Response);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						id: 1,
						page: "home",
						enable: true,
						from: new Date("2022-01-01"),
						to: null,
						name_en: "Hello 2",
						name_fr: "Bonjour 2",
						content_en: "Hello! 2",
						content_fr: "Bonjour! 2",
					}),
					expect.objectContaining({
						id: 2,
						page: "home",
						enable: true,
						from: new Date("2021-01-01"),
						to: null,
						name_en: "Hello 1",
						name_fr: "Bonjour 1",
						content_en: "Hello! 1",
						content_fr: "Bonjour! 1",
					}),
				]),
			);
		});

		test("should return a single content media", async () => {
			const data = await mediaController.findOne(2);
			expect(data).toStrictEqual({
				id: 2,
				page: "home",
				enable: true,
				from: new Date("2021-01-01"),
				to: null,
				name_en: "Hello 1",
				name_fr: "Bonjour 1",
				content_en: "Hello! 1",
				content_fr: "Bonjour! 1",
			});
		});
	});
});
