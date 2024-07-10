import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, type TestingModule } from "@nestjs/testing";
import { Request } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthGuard } from "../../common/auth/auth.guard";
import configFunction, { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { FrontHistoriesController } from "./histories.controller";
import { FrontHistoryService } from "./history.service";

describe("FrontHistoriesController", () => {
	let prismaService: PrismaService;
	let frontHistoriesController: FrontHistoriesController;

	beforeEach(async () => {
		const frontHistories: TestingModule = await Test.createTestingModule({
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
			controllers: [FrontHistoriesController],
			providers: [FrontHistoryService, PrismaService, AuthGuard],
		}).compile();

		prismaService = frontHistories.get<PrismaService>(PrismaService);
		frontHistoriesController = frontHistories.get<FrontHistoriesController>(
			FrontHistoriesController,
		);
	});

	describe("root", () => {
		it("should ensure the EbscoAuthGuard is applied to the controller", async () => {
			const JwtServiceMock = vi.mocked(JwtService);

			const configService = new ConfigService<Config, true>();
			vi.spyOn(configService, "get").mockReturnValue({});

			const guards = Reflect.getMetadata(
				"__guards__",
				FrontHistoriesController,
			);
			const guard = new guards[0](new JwtServiceMock(), configService);

			expect(guard).toBeInstanceOf(AuthGuard);
			expect(configService.get).toHaveBeenCalledWith("auth");
		});

		describe("deleteHistories", () => {
			it("should delete histories that do not have alert for user", async () => {
				const request = {
					user: {
						id: 4,
					},
				} as unknown as Request;

				await frontHistoriesController.deleteHistory(request);
				expect(
					await prismaService.history.findMany({
						where: {
							user_id: "4",
						},
					}),
				).toStrictEqual([
					expect.objectContaining({
						user_id: "4",
						event: { test: "test 4" },
						active: true,
						has_alert: true,
						last_results: [],
						nb_results: 0,
					}),
				]);
			});
		});

		describe("countHistory", () => {
			it("should count histories for user", async () => {
				const request = {
					user: {
						id: 1,
					},
				} as unknown as Request;
				expect(
					await frontHistoriesController.countHistory(request, true),
				).toStrictEqual({ count: 1 });

				expect(
					await frontHistoriesController.countHistory(request, false),
				).toStrictEqual({ count: 1 });
			});
		});
	});
});
