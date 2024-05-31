import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Test, type TestingModule } from "@nestjs/testing";
import { Request } from "express";
import * as jwt from "jsonwebtoken";
import { beforeEach, describe, expect, it } from "vitest";
import configFunction, { Config } from "../../config";
import { InistAccountService } from "../../inist/inist-account/inist-account.service";
import { PrismaService } from "../../prisma/prisma.service";
import { JWT_ALG, LOGIN_COOKIE_NAME } from "./common-auth.const";
import { AuthGuard } from "./common-auth.guard";
import { CommonAuthService } from "./common-auth.service";
import { TokenPayload } from "./common-auth.type";

describe("EbscoAuthGuard", () => {
	const testTokenData: Omit<TokenPayload<"inist">, "exp"> = {
		origin: "inist",
		id: 1,
		username: "marmelab",
		domains: [],
		groups: [],
	};

	let authConfig: Config["auth"];
	let authGuard: AuthGuard;

	beforeEach(async () => {
		const commonAuth: TestingModule = await Test.createTestingModule({
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
			providers: [CommonAuthService, PrismaService, AuthGuard],
		}).compile();

		authGuard = commonAuth.get<AuthGuard>(AuthGuard);
		authConfig = commonAuth
			.get<ConfigService<Config, true>>(ConfigService)
			.get("auth");
	});

	describe("login", () => {
		it("should authenticate user if JWT in cookie is valid", async () => {
			const cookieValue = jwt.sign(
				{
					...testTokenData,
					exp: Math.ceil(Date.now() / 1000) + authConfig.expiresIn,
				},
				authConfig.cookieSecret,
				{
					algorithm: JWT_ALG,
				},
			);

			const request = {
				cookies: {
					[LOGIN_COOKIE_NAME]: cookieValue,
				},
			} as unknown as Request;

			const context: Pick<ExecutionContext, "switchToHttp"> = {
				switchToHttp: () =>
					({
						getRequest: () => request,
					}) as unknown as HttpArgumentsHost,
			};

			expect(authGuard.canActivate(context)).resolves.toEqual(true);
		});

		it("should throw an error user if JWT in cookie alg is not HS256", async () => {
			const cookieValue = jwt.sign(
				{
					...testTokenData,
					exp: Math.ceil(Date.now() / 1000) + authConfig.expiresIn,
				},
				authConfig.cookieSecret,
				{
					algorithm: "HS384",
				},
			);

			const request = {
				cookies: {
					[LOGIN_COOKIE_NAME]: cookieValue,
				},
			} as unknown as Request;

			const context: Pick<ExecutionContext, "switchToHttp"> = {
				switchToHttp: () =>
					({
						getRequest: () => request,
					}) as unknown as HttpArgumentsHost,
			};

			expect(() => authGuard.canActivate(context)).rejects.toThrow(
				UnauthorizedException,
			);
		});

		it("should throw an error user if JWT in cookie signature is not valid", async () => {
			const cookieValue = jwt.sign(
				{
					...testTokenData,
					exp: Math.ceil(Date.now() / 1000) + authConfig.expiresIn,
				},
				"Not the secret you expected",
				{
					algorithm: JWT_ALG,
				},
			);

			const request = {
				cookies: {
					[LOGIN_COOKIE_NAME]: cookieValue,
				},
			} as unknown as Request;

			const context: Pick<ExecutionContext, "switchToHttp"> = {
				switchToHttp: () =>
					({
						getRequest: () => request,
					}) as unknown as HttpArgumentsHost,
			};

			expect(() => authGuard.canActivate(context)).rejects.toThrow(
				UnauthorizedException,
			);
		});

		it("should throw an error user if JWT in cookie origin is not inist", async () => {
			const cookieValue = jwt.sign(
				{
					...testTokenData,
					origin: "not-inist",
					exp: Math.ceil(Date.now() / 1000) + authConfig.expiresIn,
				},
				authConfig.cookieSecret,
				{
					algorithm: JWT_ALG,
				},
			);

			const request = {
				cookies: {
					[LOGIN_COOKIE_NAME]: cookieValue,
				},
			} as unknown as Request;

			const context: Pick<ExecutionContext, "switchToHttp"> = {
				switchToHttp: () =>
					({
						getRequest: () => request,
					}) as unknown as HttpArgumentsHost,
			};

			expect(() => authGuard.canActivate(context)).rejects.toThrow(
				UnauthorizedException,
			);
		});

		it("should throw an error user if JWT in cookie is expired", async () => {
			const cookieValue = jwt.sign(
				{
					...testTokenData,
					exp: Math.ceil(Date.now() / 1000) - 100,
				},
				authConfig.cookieSecret,
				{
					algorithm: JWT_ALG,
				},
			);

			const request = {
				cookies: {
					[LOGIN_COOKIE_NAME]: cookieValue,
				},
			} as unknown as Request;

			const context: Pick<ExecutionContext, "switchToHttp"> = {
				switchToHttp: () =>
					({
						getRequest: () => request,
					}) as unknown as HttpArgumentsHost,
			};

			expect(() => authGuard.canActivate(context)).rejects.toThrow(
				UnauthorizedException,
			);
		});

		it("should throw an error user if no cookie is set", async () => {
			const cookieValue = jwt.sign(
				{
					...testTokenData,
					origin: "not-inist",
					exp: Math.ceil(Date.now() / 1000) + authConfig.expiresIn,
				},
				authConfig.cookieSecret,
				{
					algorithm: JWT_ALG,
				},
			);

			const request = {
				cookies: {},
			} as unknown as Request;

			const context: Pick<ExecutionContext, "switchToHttp"> = {
				switchToHttp: () =>
					({
						getRequest: () => request,
					}) as unknown as HttpArgumentsHost,
			};

			expect(() => authGuard.canActivate(context)).rejects.toThrow(
				UnauthorizedException,
			);
		});
	});
});
