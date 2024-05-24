import { ConfigModule } from "@nestjs/config";
import { Test, type TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";
import configFunction from "../../config";
import { InistAccountService } from "../../inist/inist-account/inist-account.service";
import { PrismaService } from "../../prisma/prisma.service";
import { EbscoAuthController } from "./ebsco-auth.controller";
import { EbscoAuthService } from "./ebsco-auth.service";

describe("EbscoAuthController", () => {
	let ebscoAuthController: EbscoAuthController;

	beforeEach(async () => {
		const ebscoAuth: TestingModule = await Test.createTestingModule({
			imports: [
				ConfigModule.forRoot({
					ignoreEnvFile: true,
					load: [configFunction],
					isGlobal: true,
				}),
			],
			controllers: [EbscoAuthController],
			providers: [EbscoAuthService, InistAccountService, PrismaService],
		}).compile();

		ebscoAuthController =
			ebscoAuth.get<EbscoAuthController>(EbscoAuthController);
	});

	describe("login", () => {
		it("should set cookie if authenticated successfully", async () => {
			const res = {
				cookie: vi.fn(),
			} as unknown as Response;
			expect(
				await ebscoAuthController.login(res, {
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
				ebscoAuthController.login(res, {
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
			expect(await ebscoAuthController.logout(res)).toStrictEqual({
				done: true,
			});

			expect(res.clearCookie).toHaveBeenCalledWith("bibapi_token");
		});
	});
});
