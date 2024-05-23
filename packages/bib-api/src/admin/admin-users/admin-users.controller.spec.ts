import { HttpException } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { AdminUsersController } from "packages/bib-api/src/admin/admin-users/admin-users.controller";
import { AdminUsersService } from "packages/bib-api/src/admin/admin-users/admin-users.service";

import { PrismaService } from "packages/bib-api/src/prisma/prisma.service";
import { beforeEach, describe, expect, test, vi } from "vitest";

describe("AdminUserController", () => {
	let adminUsersController: AdminUsersController;

	beforeEach(async () => {
		const testingModule: TestingModule = await Test.createTestingModule({
			controllers: [AdminUsersController],
			providers: [AdminUsersService, PrismaService],
		}).compile();

		adminUsersController =
			testingModule.get<AdminUsersController>(AdminUsersController);
	});

	describe("root", () => {
		test("should return list of admin users", async () => {
			const res = {
				header: vi.fn(),
				send: vi.fn(),
			};

			await adminUsersController.findAll({}, res as unknown as Response);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						id: 1,
						username: "admin1",
						comment: "admin1",
					}),
					expect.objectContaining({
						id: 2,
						username: "admin2",
						comment: "admin2",
					}),
				]),
			);
		});

		test("should return a single admin user", async () => {
			const data = await adminUsersController.findOne(2);
			expect(data).toStrictEqual({
				id: 2,
				username: "admin2",
				comment: "admin2",
			});
		});

		test("should create a new admin user, update it and delete it", async () => {
			const randomUsername = `newAdmin${Math.floor(Math.random() * 1000)}`;

			const createdAdmin = await adminUsersController.create({
				username: randomUsername,
				password: "newAdminPassword",
				comment: "newAdminComment",
			});

			expect(createdAdmin).toEqual(
				expect.objectContaining({
					username: randomUsername,
					comment: "newAdminComment",
				}),
			);

			const updatedAdmin = await adminUsersController.update(createdAdmin.id, {
				...createdAdmin,
				username: "updatedAdmin",
				password: "updatedAdminPassword",
				comment: "updatedAdminComment",
			});

			expect(updatedAdmin).toEqual(
				expect.objectContaining({
					username: "updatedAdmin",
					comment: "updatedAdminComment",
				}),
			);

			await adminUsersController.remove(updatedAdmin.id);

			await expect(
				adminUsersController.findOne(updatedAdmin.id),
			).rejects.toThrow(HttpException);
		});

		test("should fail to create admin with the same username", async () => {
			await expect(
				adminUsersController.create({
					username: "admin1",
					password: "admin1",
					comment: "admin1",
				}),
			).rejects.toThrow();
		});
	});
});
