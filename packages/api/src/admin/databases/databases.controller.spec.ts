import { HttpException } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { DatabasesController } from "./databases.controller";
import { DatabasesService } from "./databases.service";

import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { beforeEach, describe, expect, test, vi } from "vitest";
import configFunction from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { AdminAuthenticationGuard } from "../authentication/authentication.guard";

describe("DatabasesController", () => {
	let databasesController: DatabasesController;

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
			controllers: [DatabasesController],
			providers: [DatabasesService, PrismaService, AdminAuthenticationGuard],
		}).compile();

		databasesController =
			testingModule.get<DatabasesController>(DatabasesController);
	});

	describe("root", () => {
		test("should return list of databases", async () => {
			const res = {
				header: vi.fn(),
				send: vi.fn(),
			};

			await databasesController.findAll({}, res as unknown as Response);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						id: 1,
						name_fr: "Wiley",
						name_en: "Wiley",
						active: true,
						oa: true,
						diamond: false,
						use_proxy: true,
					}),
					expect.objectContaining({
						id: 2,
						name_fr: "Springer",
						name_en: "Springer",
						active: true,
						oa: false,
						diamond: false,
						use_proxy: false,
					}),
				]),
			);
		});

		test("should return a single database with communities", async () => {
			const data = await databasesController.findOne(2);
			expect(data).toStrictEqual({
				id: 2,
				name_fr: "Springer",
				text_fr: "Plateforme multidisciplinaire springer",
				text_en: "Multidisciplinary platform springer",
				url_fr: "https://link.springer.com/",
				url_en: "https://link.springer.com/",
				name_en: "Springer",
				active: true,
				oa: false,
				diamond: false,
				use_proxy: false,
				communities: [1, 2],
				domains: ["INSHS", "INSB"],
				is_text_integral: false,
				is_completed: false,
				is_archived: false,
				type: [],
				without_embargo: false,
			});
		});

		test("should create a new admin user, update it and delete it", async () => {
			const randomName = `database-${Math.floor(Math.random() * 1000)}`;

			const createdDatabase = await databasesController.create({
				name_fr: randomName,
				text_fr: "text_fr",
				text_en: "text_en",
				url_fr: "url_fr",
				url_en: "url_en",
				name_en: "name_en",
				active: true,
				oa: true,
				diamond: true,
				use_proxy: true,
				communities: [1, 2],
				is_text_integral: false,
				without_embargo: true,
				is_completed: true,
				is_archived: false,
				type: ["database"],
			});

			expect(createdDatabase).toEqual(
				expect.objectContaining({
					name_fr: randomName,
					text_fr: "text_fr",
					text_en: "text_en",
					url_fr: "url_fr",
					url_en: "url_en",
					name_en: "name_en",
					active: true,
					oa: true,
					diamond: true,
					use_proxy: true,
					communities: [1, 2],
					is_text_integral: false,
					without_embargo: true,
					is_completed: true,
					is_archived: false,
					type: ["database"],
				}),
			);

			const updatedCommunity = await databasesController.update(
				createdDatabase.id,
				{
					...createdDatabase,
					name_fr: "updatedName",
					communities: [1],
				},
			);

			expect(updatedCommunity).toEqual(
				expect.objectContaining({
					name_fr: "updatedName",
					communities: [1],
				}),
			);

			await databasesController.remove(updatedCommunity.id);

			await expect(
				databasesController.findOne(updatedCommunity.id),
			).rejects.toThrow(HttpException);
		});
	});
});
