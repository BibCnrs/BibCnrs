import { HttpException } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Test, type TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { beforeEach, describe, expect, test, vi } from "vitest";
import configFunction from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { AdminAuthenticationGuard } from "../admin-authentication/admin-authentication.guard";
import { InstitutesController } from "./institutes.controller";
import { InstitutesService } from "./institutes.service";

describe("InstitutesController", () => {
	let institutesController: InstitutesController;

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
			controllers: [InstitutesController],
			providers: [InstitutesService, PrismaService, AdminAuthenticationGuard],
		}).compile();

		institutesController =
			testingModule.get<InstitutesController>(InstitutesController);
	});

	describe("root", () => {
		test("should return list of institutes", async () => {
			const res = {
				header: vi.fn(),
				send: vi.fn(),
			};

			await institutesController.findAll({}, res as unknown as Response);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						id: 1,
						code: "CNRS",
						name: "CNRS",
					}),
					expect.objectContaining({
						id: 2,
						code: "INSB",
						name: "INSB",
					}),
				]),
			);
		});

		test("should return a single institute", async () => {
			const data = await institutesController.findOne(2);
			expect(data).toStrictEqual({
				id: 2,
				code: "INSB",
				name: "INSB",
				communities: [1],
			});
		});

		test("should create a new institute, update it and delete it", async () => {
			const randomName = `newInstitute${Math.floor(Math.random() * 1000)}`;

			const createdInstitute = await institutesController.create({
				code: "TEST",
				name: randomName,
			});

			expect(createdInstitute).toEqual(
				expect.objectContaining({
					code: "TEST",
					name: randomName,
				}),
			);

			const updatedInstitute = await institutesController.update(
				createdInstitute.id,
				{
					id: createdInstitute.id,
					code: "TEST2",
					name: "Institute Updated",
				},
			);

			expect(updatedInstitute).toEqual(
				expect.objectContaining({
					code: "TEST2",
					name: "Institute Updated",
				}),
			);

			await institutesController.remove(updatedInstitute.id);

			await expect(
				institutesController.findOne(updatedInstitute.id),
			).rejects.toThrow(HttpException);
		});
	});
});
