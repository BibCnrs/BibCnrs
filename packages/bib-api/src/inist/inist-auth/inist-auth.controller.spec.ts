import { ConfigModule } from "@nestjs/config";
import { Test, type TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CommonAuthService } from "../../common/common-auth/common-auth.service";
import configFunction from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { InistAccountService } from "../inist-account/inist-account.service";
import { InistAuthController } from "./inist-auth.controller";

describe("InistAuthController", () => {
	let inistAuthController: InistAuthController;

	beforeEach(async () => {
		const inistAuth: TestingModule = await Test.createTestingModule({
			imports: [
				ConfigModule.forRoot({
					ignoreEnvFile: true,
					load: [configFunction],
					isGlobal: true,
				}),
			],
			controllers: [InistAuthController],
			providers: [PrismaService, CommonAuthService, InistAccountService],
		}).compile();

		inistAuthController =
			inistAuth.get<InistAuthController>(InistAuthController);
	});

	describe("login", () => {
		it("should set cookie if authenticated successfully", async () => {
			const res = {
				cookie: vi.fn(),
			} as unknown as Response;
			expect(
				await inistAuthController.login(res, {
					username: "INIST",
					password: "INIST",
				}),
			).toStrictEqual({
				username: "INIST",
				domains: ["INSHS"],
				token: expect.any(String),
			});

			expect(res.cookie).toHaveBeenCalledWith(
				"bibapi_token",
				expect.any(String),
				{
					httpOnly: true,
				},
			);
		});

		it("should not set cookie if authentication fails", async () => {
			const res = {
				cookie: vi.fn(),
			} as unknown as Response;
			expect(
				inistAuthController.login(res, {
					username: "INIST",
					password: "wrong",
				}),
			).rejects.toEqual(expect.objectContaining({ status: 401 }));

			expect(res.cookie).not.toHaveBeenCalled();
		});
	});

	describe("logout", () => {
		it("should set cookie if authenticated successfully", async () => {
			const res = {
				clearCookie: vi.fn(),
			} as unknown as Response;
			expect(await inistAuthController.logout(res)).toStrictEqual({
				done: true,
			});

			expect(res.clearCookie).toHaveBeenCalledWith("bibapi_token");
		});
	});
});
