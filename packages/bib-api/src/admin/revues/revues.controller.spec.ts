import { HttpException } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Test, type TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { beforeEach, describe, expect, test, vi } from "vitest";
import configFunction from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { AdminAuthenticationGuard } from "../admin-authentication/admin-authentication.guard";
import { RevuesController } from "./revues.controller";
import { RevuesService } from "./revues.service";

describe("RevuesController", () => {
	let revuesController: RevuesController;

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
			controllers: [RevuesController],
			providers: [RevuesService, PrismaService, AdminAuthenticationGuard],
		}).compile();

		revuesController = testingModule.get<RevuesController>(RevuesController);
	});

	describe("root", () => {
		test("should return list of revues", async () => {
			const res = {
				header: vi.fn(),
				send: vi.fn(),
			};

			await revuesController.findAll({}, res as unknown as Response);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						id: 1,
						title: "ACM",
						url: "https://dl.acm.org",
					}),
					expect.objectContaining({
						id: 2,
						title: "IEEE",
						url: "https://ieeexplore.ieee.org",
					}),
				]),
			);
		});

		test("should return a single revue", async () => {
			const data = await revuesController.findOne(2);
			expect(data).toStrictEqual({
				id: 2,
				title: "IEEE",
				url: "https://ieeexplore.ieee.org",
				communities: [1, 2],
				domains: ["INSHS", "INSB"],
			});
		});

		test("should create a new admin user, update it and delete it", async () => {
			const randomTitle = `revue-${Math.floor(Math.random() * 1000)}`;

			const createdRevue = await revuesController.create({
				title: randomTitle,
				url: "https://example.com",
				communities: [1, 2],
			});

			expect(createdRevue).toEqual(
				expect.objectContaining({
					title: randomTitle,
					url: "https://example.com",
					communities: [1, 2],
				}),
			);

			const updatedRevue = await revuesController.update(createdRevue.id, {
				...createdRevue,
				title: "updatedTitle",
				url: "https://example.com/updated",
				communities: [1],
			});

			expect(updatedRevue).toEqual(
				expect.objectContaining({
					title: "updatedTitle",
					url: "https://example.com/updated",
					communities: [1],
				}),
			);

			await revuesController.remove(updatedRevue.id);

			await expect(revuesController.findOne(updatedRevue.id)).rejects.toThrow(
				HttpException,
			);
		});
	});
});
