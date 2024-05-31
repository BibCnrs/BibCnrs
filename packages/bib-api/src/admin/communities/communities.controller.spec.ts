import { HttpException } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { CommunitiesController } from "./communities.controller";
import { CommunitiesService } from "./communities.service";

import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { beforeEach, describe, expect, test, vi } from "vitest";
import configFunction from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { AdminAuthenticationGuard } from "../admin-authentication/admin-authentication.guard";

describe("CommunitiesController", () => {
	let communitiesController: CommunitiesController;

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
			controllers: [CommunitiesController],
			providers: [CommunitiesService, PrismaService, AdminAuthenticationGuard],
		}).compile();

		communitiesController = testingModule.get<CommunitiesController>(
			CommunitiesController,
		);
	});

	describe("root", () => {
		test("should return list of communities", async () => {
			const res = {
				header: vi.fn(),
				send: vi.fn(),
			};

			await communitiesController.findAll({}, res as unknown as Response);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						id: 1,
						name: "INSHS",
						gate: "inshs",
						ebsco: true,
					}),
					expect.objectContaining({
						id: 2,
						name: "INSB",
						gate: "insb",
						ebsco: true,
					}),
				]),
			);
		});

		test("should return a single community", async () => {
			const data = await communitiesController.findOne(2);
			expect(data).toStrictEqual({
				id: 2,
				name: "INSB",
				gate: "insb",
				user_id: "insb_user_id",
				password: "insb_password",
				profile: "wsapi",
				ebsco: true,
			});
		});

		test("should create a new admin user, update it and delete it", async () => {
			const randomName = `community-${Math.floor(Math.random() * 1000)}`;

			const createdCommunity = await communitiesController.create({
				name: randomName,
				gate: "gateCreated",
				user_id: "user_idCreated",
				password: "passwordCreated",
				profile: "profileCreated",
				ebsco: false,
			});

			expect(createdCommunity).toEqual(
				expect.objectContaining({
					name: randomName,
					gate: "gateCreated",
					profile: "profileCreated",
				}),
			);

			const updatedCommunity = await communitiesController.update(
				createdCommunity.id,
				{
					...createdCommunity,
					name: "updatedName",
					gate: "gateUpdated",
					profile: "profileUpdated",
				},
			);

			expect(updatedCommunity).toEqual(
				expect.objectContaining({
					name: "updatedName",
					gate: "gateUpdated",
					profile: "profileUpdated",
				}),
			);

			await communitiesController.remove(updatedCommunity.id);

			await expect(
				communitiesController.findOne(updatedCommunity.id),
			).rejects.toThrow(HttpException);
		});
	});
});
