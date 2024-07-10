import { ForbiddenException } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, type TestingModule } from "@nestjs/testing";
import { Request } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthGuard } from "../../common/auth/auth.guard";
import { TokenPayload } from "../../common/auth/auth.type";
import configFunction, { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { FrontFavoriteResourcesController } from "./favoriteResources.controller";
import { FrontFavoriteResourcesService } from "./favoriteResources.service";

describe("FrontFavoriteResourcesController", () => {
	const testInistToken: Omit<TokenPayload<"inist">, "exp"> = {
		origin: "inist",
		id: 1,
		username: "marmelab",
		domains: [],
		groups: [],
	};

	const testJanusToken: Omit<TokenPayload<"janus">, "exp"> = {
		origin: "janus",
		id: 1,
		username: "marmelab",
		domains: [],
		shib: "shib",
		favorite_domain: "favorite_domain",
	};

	let prismaService: PrismaService;
	let frontFavoriteResourcesController: FrontFavoriteResourcesController;

	beforeEach(async () => {
		const frontFavoriteResources: TestingModule =
			await Test.createTestingModule({
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
				controllers: [FrontFavoriteResourcesController],
				providers: [FrontFavoriteResourcesService, PrismaService, AuthGuard],
			}).compile();

		prismaService = frontFavoriteResources.get<PrismaService>(PrismaService);
		frontFavoriteResourcesController =
			frontFavoriteResources.get<FrontFavoriteResourcesController>(
				FrontFavoriteResourcesController,
			);
	});

	describe("root", () => {
		it("should ensure the AuthGuard is applied to the controller", async () => {
			const JwtServiceMock = vi.mocked(JwtService);

			const configService = new ConfigService<Config, true>();
			vi.spyOn(configService, "get").mockReturnValue({});

			const guards = Reflect.getMetadata(
				"__guards__",
				FrontFavoriteResourcesController,
			);
			const guard = new guards[0](new JwtServiceMock(), configService);

			expect(guard).toBeInstanceOf(AuthGuard);
			expect(configService.get).toHaveBeenCalledWith("auth");
		});

		it("should only not allow inist accounts", async () => {
			const request = {
				user: testInistToken,
			} as unknown as Request;

			expect(() =>
				frontFavoriteResourcesController.putFavoriteResources(request, {}),
			).rejects.toThrow(ForbiddenException);
		});

		it("should update favorite resources for janus account", async () => {
			const request = {
				user: testJanusToken,
			} as unknown as Request;

			await frontFavoriteResourcesController.putFavoriteResources(request, [
				{ a: "b" },
			]);

			await expect(
				prismaService.janus_account.findFirst({ where: { id: 1 } }),
			).resolves.toEqual(
				expect.objectContaining({
					favourite_resources: [{ a: "b" }],
				}),
			);
		});
	});
});
