import { HttpException } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Test, type TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { beforeEach, describe, expect, test, vi } from "vitest";
import configFunction from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { AdminAuthenticationGuard } from "../authentication/authentication.guard";
import { ContentsManagementController } from "./contents-management.controller";
import { ContentsManagementService } from "./contents-management.service";

describe("ContentManagementController", () => {
	let contentsManagementController: ContentsManagementController;

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
			controllers: [ContentsManagementController],
			providers: [
				ContentsManagementService,
				PrismaService,
				AdminAuthenticationGuard,
			],
		}).compile();

		contentsManagementController =
			testingModule.get<ContentsManagementController>(
				ContentsManagementController,
			);
	});

	describe("root", () => {
		test("should return list of contents management", async () => {
			const res = {
				header: vi.fn(),
				send: vi.fn(),
			};

			await contentsManagementController.findAll(
				{},
				res as unknown as Response,
			);
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

		test("should return a single content management", async () => {
			const data = await contentsManagementController.findOne(2);
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
				order: null,
				media_id: null,
			});
		});

		test("should create a new content management, update it and delete it", async () => {
			const randomPage = `newAdmin${Math.floor(Math.random() * 1000)}`;

			const createdAdmin = await contentsManagementController.create({
				page: randomPage,
				enable: true,
				from: new Date("2024-01-01"),
				to: null,
				name_en: "Hello Created",
				name_fr: "Bonjour Created",
				content_en: "Hello! Created",
				content_fr: "Bonjour! Created",
				order: null,
				media_id: null,
			});

			expect(createdAdmin).toEqual(
				expect.objectContaining({
					page: randomPage,
					enable: true,
					from: new Date("2024-01-01"),
					to: null,
					name_en: "Hello Created",
					name_fr: "Bonjour Created",
					content_en: "Hello! Created",
					content_fr: "Bonjour! Created",
				}),
			);

			const updatedAdmin = await contentsManagementController.update(
				createdAdmin.id,
				{
					...createdAdmin,
					page: "updatedPage",
					name_fr: "Bonjour Updated",
				},
			);

			expect(updatedAdmin).toEqual(
				expect.objectContaining({
					page: "updatedPage",
					name_fr: "Bonjour Updated",
				}),
			);

			await contentsManagementController.remove(updatedAdmin.id);

			await expect(
				contentsManagementController.findOne(updatedAdmin.id),
			).rejects.toThrow(HttpException);
		});
	});
});
