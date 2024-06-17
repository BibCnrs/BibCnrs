import { HttpException } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Test, type TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { beforeEach, describe, expect, test, vi } from "vitest";
import configFunction from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { AdminAuthenticationGuard } from "../authentication/authentication.guard";
import { JanusAccountsController } from "./janus-accounts.controller";
import { JanusAccountsService } from "./janus-accounts.service";

describe("JanusAccountsController", () => {
	let janusAccountsController: JanusAccountsController;

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
			controllers: [JanusAccountsController],
			providers: [
				JanusAccountsService,
				PrismaService,
				AdminAuthenticationGuard,
			],
		}).compile();

		janusAccountsController = testingModule.get<JanusAccountsController>(
			JanusAccountsController,
		);
	});

	describe("root", () => {
		test("should return list of janus account", async () => {
			const res = {
				header: vi.fn(),
				send: vi.fn(),
			};
			const date = new Date();
			date.setUTCHours(0, 0, 0, 0);

			await janusAccountsController.findAll({}, res as unknown as Response);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						id: 1,
						primary_institute: null,
						primary_unit: 1,
						uid: "test.test",
						mail: "test@inist.fr",
						name: "TEST",
						firstname: "test",
						cnrs: true,
						comment: "",
						last_connexion: date,
						favorite_domain: "INSHS",
						first_connexion: date,
						active: true,
						favourite_resources: null,
						additional_institutes: [],
						all_communities: [],
					}),
					expect.objectContaining({
						id: 2,
						primary_institute: null,
						primary_unit: 2,
						uid: "test2.test2",
						mail: "test@inist.fr",
						name: "OTHERTEST",
						firstname: "OTHERTEST",
						cnrs: true,
						comment: "",
						last_connexion: date,
						favorite_domain: "INSB",
						first_connexion: date,
						active: true,
						favourite_resources: null,
						additional_institutes: [],
						all_communities: [],
					}),
				]),
			);
		});

		test("should return a single janus account", async () => {
			const data = await janusAccountsController.findOne(2);
			const date = new Date();
			date.setUTCHours(0, 0, 0, 0);

			expect(data).toStrictEqual({
				id: 2,
				primary_institute: null,
				primary_unit: 2,
				uid: "test2.test2",
				mail: "test@inist.fr",
				name: "OTHERTEST",
				firstname: "OTHERTEST",
				cnrs: true,
				comment: "",
				last_connexion: date,
				favorite_domain: "INSB",
				first_connexion: date,
				active: true,
				favourite_resources: null,
				additional_institutes: [],
				additional_units: [],
				all_communities: [],
				communities: [],
				primary_institute_communities: [],
				primary_unit_communities: [],
			});
		});

		test("should create a new janus account, update it and delete it", async () => {
			const randomUserNameJanusAccount = `newJanusAccount${Math.floor(
				Math.random() * 1000,
			)}`;

			const createdJanusAccount = await janusAccountsController.create({
				primary_institute: null,
				primary_unit: 1,
				uid: "created.created",
				mail: "created@inist.fr",
				name: randomUserNameJanusAccount,
				firstname: "created",
				cnrs: true,
				comment: "",
				last_connexion: new Date(),
				favorite_domain: "INSHS",
				first_connexion: new Date(),
				active: true,
				favourite_resources: null,
			});

			expect(createdJanusAccount).toEqual(
				expect.objectContaining({
					name: randomUserNameJanusAccount,
					firstname: "created",
				}),
			);

			const updatedJanusAccount = await janusAccountsController.update(
				createdJanusAccount.id,
				{
					...createdJanusAccount,
					name: "updated",
					firstname: "updated",
				},
			);

			expect(updatedJanusAccount).toEqual(
				expect.objectContaining({
					name: "updated",
					firstname: "updated",
				}),
			);

			await janusAccountsController.remove(updatedJanusAccount.id);

			await expect(
				janusAccountsController.findOne(updatedJanusAccount.id),
			).rejects.toThrow(HttpException);
		});
	});
});
