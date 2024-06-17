import { ExecutionContext } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Test, type TestingModule } from "@nestjs/testing";
import { Request } from "express";
import * as jwt from "jsonwebtoken";
import { beforeEach, describe, expect, it } from "vitest";
import configFunction, { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { AdminAuthenticationGuard } from "./authentication.guard";

describe("AdminAuthenticationGuard", () => {
	const testTokenData = {
		username: "marmelab",
	};

	let authConfig: Config["auth"];
	let adminAuthenticationGuard: AdminAuthenticationGuard;

	beforeEach(async () => {
		const testingModule: TestingModule = await Test.createTestingModule({
			imports: [
				ConfigModule.forRoot({
					ignoreEnvFile: true,
					load: [configFunction],
					isGlobal: true,
				}),
				JwtModule.register({
					global: true,
				}),
			],
			providers: [PrismaService, AdminAuthenticationGuard],
		}).compile();

		adminAuthenticationGuard = testingModule.get<AdminAuthenticationGuard>(
			AdminAuthenticationGuard,
		);
		authConfig = testingModule
			.get<ConfigService<Config, true>>(ConfigService)
			.get("auth");
	});

	describe("login", () => {
		it("should authenticate user if JWT is valid", async () => {
			const tokenValue = jwt.sign(
				{
					...testTokenData,
					exp: Math.ceil(Date.now() / 1000) + authConfig.expiresIn,
				},
				authConfig.adminSecret,
			);

			const request = {
				headers: {
					authorization: `Bearer ${tokenValue}`,
				},
			} as unknown as Request;

			const context: Pick<ExecutionContext, "switchToHttp"> = {
				switchToHttp: () =>
					({
						getRequest: () => request,
					}) as unknown as HttpArgumentsHost,
			};

			expect(adminAuthenticationGuard.canActivate(context)).resolves.toEqual(
				true,
			);
		});
	});
});
