import { HttpException } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Test, type TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { beforeEach, describe, expect, test, vi } from "vitest";
import configFunction from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { AdminAuthenticationGuard } from "../authentication/authentication.guard";
import { InistAccountsController } from "./inist-accounts.controller";
import { InistAccountsService } from "./inist-accounts.service";

describe("InistAccountsController", () => {
	let inistAccountsController: InistAccountsController;

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
			controllers: [InistAccountsController],
			providers: [
				InistAccountsService,
				PrismaService,
				AdminAuthenticationGuard,
			],
		}).compile();

		inistAccountsController = testingModule.get<InistAccountsController>(
			InistAccountsController,
		);
	});

	describe("root", () => {
		test("should return list of inist account", async () => {
			const res = {
				header: vi.fn(),
				send: vi.fn(),
			};

			await inistAccountsController.findAll({}, res as unknown as Response);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						id: 1,
						username: "INIST",
						password: "INIST",
						active: true,
						mail: "inist@cnrs.fr",
					}),
				]),
			);
		});

		test("should return a single inist account", async () => {
			const data = await inistAccountsController.findOne(1);
			const date = new Date();
			date.setUTCHours(0, 0, 0, 0);

			expect(data).toStrictEqual({
				active: true,
				all_communities: [1],
				comment: null,
				communities: [1],
				dr: null,
				expiration_date: null,
				firstname: null,
				id: 1,
				institutes: [],
				last_connexion: date,
				mail: "inist@cnrs.fr",
				main_institute: null,
				main_institute_communities: [],
				main_unit: null,
				main_unit_communities: [],
				name: null,
				password: "INIST",
				phone: null,
				subscription_date: date,
				units: [1],
				username: "INIST",
			});
		});

		test("should create a new institute, update it and delete it", async () => {
			const randomUserNameInistAccount = `newInistAccount${Math.floor(
				Math.random() * 1000,
			)}`;

			const createdInistAccount = await inistAccountsController.create({
				username: randomUserNameInistAccount,
				password: "password",
				active: true,
				mail: "test@test.fr",
				name: "Inist Account",
				firstname: "Inist",
				phone: "0123456789",
				dr: null,
				comment: null,
				subscription_date: new Date(),
				expiration_date: null,
				main_institute: 1,
				main_unit: 1,
				last_connexion: null,
			});

			expect(createdInistAccount).toEqual(
				expect.objectContaining({
					username: randomUserNameInistAccount,
					password: "password",
				}),
			);

			const updatedInistAccount = await inistAccountsController.update(
				createdInistAccount.id,
				{
					...createdInistAccount,
					username: "TESTUNITUPDATE",
				},
			);

			expect(updatedInistAccount).toEqual(
				expect.objectContaining({
					username: "TESTUNITUPDATE",
				}),
			);

			await inistAccountsController.remove(updatedInistAccount.id);

			await expect(
				inistAccountsController.findOne(updatedInistAccount.id),
			).rejects.toThrow(HttpException);
		});
	});
});
