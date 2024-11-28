import { ConfigModule, ConfigService } from "@nestjs/config";
import { Test, type TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { beforeEach, describe, expect, test, vi } from "vitest";
import configFunction from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { MediasController } from "./medias.controller";
import { MediasService } from "./medias.service";

describe("MediaController", () => {
	let mediasController: MediasController;

	beforeEach(async () => {
		const testingModule: TestingModule = await Test.createTestingModule({
			imports: [
				ConfigModule.forRoot({
					ignoreEnvFile: true,
					load: [configFunction],
					isGlobal: true,
				}),
			],
			controllers: [MediasController],
			providers: [MediasService, PrismaService, ConfigService],
		}).compile();

		mediasController = testingModule.get<MediasController>(MediasController);
	});

	describe("root", () => {
		test("should return list of contents media", async () => {
			const res = {
				header: vi.fn(),
				send: vi.fn(),
			};

			await mediasController.findAll({}, res as unknown as Response);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						id: 1,
						name: "media1",
						created_at: expect.any(Date),
						file_name: "media1.png",
						url: "http://localhost:3000/files/2024/1/1/media1.png",
					}),
					expect.objectContaining({
						id: 2,
						name: "media2",
						created_at: expect.any(Date),
						file_name: "media2.png",
						url: "http://localhost:3000/files/2024/1/1/media2.png",
					}),
					expect.objectContaining({
						id: 100,
						name: "bib",
						url: "http://localhost:3000/files/2024/1/1/bibcnrs.pdf",
						created_at: expect.any(Date),
						file_name: "bib.pdf",
					}),
					expect.objectContaining({
						id: 101,
						name: "preprod",
						url: "http://localhost:3000/files/2024/1/1/preprod.pdf",
						created_at: expect.any(Date),
						file_name: "preprod.pdf",
					}),
				]),
			);
		});

		test("should return a single content media", async () => {
			const data = await mediasController.findOne(2);
			expect(data).toEqual(
				expect.objectContaining({
					id: 2,
					name: "media2",
					file_name: "media2.png",
					file: "/app/packages/api/uploads/2024/1/1/media2.png",
					url: "http://localhost:3000/files/2024/1/1/media2.png",
				}),
			);
		});
	});
});
