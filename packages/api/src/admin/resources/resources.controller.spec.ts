import { HttpException } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Test, type TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { beforeEach, describe, expect, test, vi } from "vitest";
import configFunction from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { AdminAuthenticationGuard } from "../authentication/authentication.guard";
import { ResourcesController } from "./resources.controller";
import { ResourcesService } from "./resources.service";

describe("ResourcesController", () => {
	let resourcesController: ResourcesController;

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
			controllers: [ResourcesController],
			providers: [ResourcesService, PrismaService, AdminAuthenticationGuard],
		}).compile();

		resourcesController =
			testingModule.get<ResourcesController>(ResourcesController);
	});

	describe("root", () => {
		test("should return list of admin resources", async () => {
			const res = {
				header: vi.fn(),
				send: vi.fn(),
			};

			await resourcesController.findAll({}, res as unknown as Response);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						id: 1,
						name_en: "Bib Preprod",
						name_fr: "Bib Preprod",
						enable: true,
						media_id: null,
					}),
					expect.objectContaining({
						id: 2,
						name_en: "Bib",
						name_fr: "Bib",
						enable: true,
						media_id: null,
					}),
				]),
			);
		});

		test("should return a single resource", async () => {
			const data = await resourcesController.findOne(2);
			expect(data).toStrictEqual({
				id: 2,
				name_en: "Bib",
				name_fr: "Bib",
				enable: true,
				media_id: null,
				media: null,
			});
		});

		test("should create a new resource, update it and delete it", async () => {
			const randomResource = `newAdmin${Math.floor(Math.random() * 1000)}`;

			const createdResource = await resourcesController.create({
				name_fr: randomResource,
				name_en: randomResource,
				media: { url: "http://random-create" },
				enable: true,
				media_id: null,
			});

			expect(createdResource).toEqual(
				expect.objectContaining({
					name_fr: randomResource,
					name_en: randomResource,
					enable: true,
				}),
			);

			const updatedResource = await resourcesController.update(
				createdResource.id,
				{
					name_fr: "updatedResource",
					name_en: "updatedResource",
					media: { url: "http://random-create" },
					enable: true,
					media_id: null,
					id: 0,
				},
			);

			expect(updatedResource).toEqual(
				expect.objectContaining({
					name_fr: "updatedResource",
					name_en: "updatedResource",
					enable: true,
				}),
			);

			await resourcesController.remove(updatedResource.id);

			await expect(
				resourcesController.findOne(updatedResource.id),
			).rejects.toThrow(HttpException);
		});
	});
});
