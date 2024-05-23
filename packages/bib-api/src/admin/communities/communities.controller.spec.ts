import { HttpException } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { CommunitiesController } from "packages/bib-api/src/admin/communities/communities.controller";
import { CommunitiesService } from "packages/bib-api/src/admin/communities/communities.service";

import { PrismaService } from "packages/bib-api/src/prisma/prisma.service";
import { beforeEach, describe, expect, test, vi } from "vitest";

describe("AdminUserController", () => {
	let communitiesController: CommunitiesController;

	beforeEach(async () => {
		const testingModule: TestingModule = await Test.createTestingModule({
			controllers: [CommunitiesController],
			providers: [CommunitiesService, PrismaService],
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
						name: "community1",
						gate: "gate1",
						ebsco: true,
					}),
					expect.objectContaining({
						id: 2,
						name: "community2",
						gate: "gate2",
						ebsco: false,
					}),
				]),
			);
		});

		test("should return a single community", async () => {
			const data = await communitiesController.findOne(2);
			expect(data).toStrictEqual({
				id: 2,
				name: "community2",
				gate: "gate2",
				user_id: "user_id2",
				password: "password2",
				profile: "profile2",
				ebsco: false,
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
