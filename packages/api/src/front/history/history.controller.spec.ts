import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, type TestingModule } from "@nestjs/testing";
import { Request } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthGuard } from "../../common/auth/auth.guard";
import configFunction, { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { FrontHistoryController } from "./history.controller";
import { FrontHistoryService } from "./history.service";

describe("FrontHistoryController", () => {
	let ebscoHistoryController: FrontHistoryController;

	beforeEach(async () => {
		const ebscoHistory: TestingModule = await Test.createTestingModule({
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
			controllers: [FrontHistoryController],
			providers: [FrontHistoryService, PrismaService, AuthGuard],
		}).compile();

		ebscoHistoryController = ebscoHistory.get<FrontHistoryController>(
			FrontHistoryController,
		);
	});

	describe("root", () => {
		describe("getHistory", () => {
			it("should ensure the EbscoAuthGuard is applied to the controller", async () => {
				const JwtServiceMock = vi.mocked(JwtService);

				const configService = new ConfigService<Config, true>();
				vi.spyOn(configService, "get").mockReturnValue({});

				const guards = Reflect.getMetadata(
					"__guards__",
					FrontHistoryController,
				);
				const guard = new guards[0](new JwtServiceMock(), configService);

				expect(guard).toBeInstanceOf(AuthGuard);
				expect(configService.get).toHaveBeenCalledWith("auth");
			});

			it("should return the history for user", async () => {
				const request = {
					user: {
						id: 1,
					},
				} as unknown as Request;
				expect(
					await ebscoHistoryController.getHistory(request, 5, 0),
				).toStrictEqual({
					histories: [
						expect.objectContaining({
							user_id: "1",
							event: { test: "test 1" },
							active: true,
							hasAlert: true,
							last_results: [],
							nb_results: 0,
						}),
						expect.objectContaining({
							user_id: "1",
							event: { test: "test 2" },
							active: true,
							hasAlert: false,
							last_results: [],
							nb_results: 0,
						}),
					],
					totalCount: 2,
				});
			});

			it("should return apply limit", async () => {
				const request = {
					user: {
						id: 1,
					},
				} as unknown as Request;
				expect(
					await ebscoHistoryController.getHistory(request, 1, 0),
				).toStrictEqual({
					histories: [
						expect.objectContaining({
							user_id: "1",
							event: { test: "test 1" },
							active: true,
							hasAlert: true,
							last_results: [],
							nb_results: 0,
						}),
					],
					totalCount: 2,
				});
			});

			it("should return apply offset", async () => {
				const request = {
					user: {
						id: 1,
					},
				} as unknown as Request;
				expect(
					await ebscoHistoryController.getHistory(request, 1, 1),
				).toStrictEqual({
					histories: [
						expect.objectContaining({
							user_id: "1",
							event: { test: "test 2" },
							active: true,
							hasAlert: false,
							last_results: [],
							nb_results: 0,
						}),
					],
					totalCount: 2,
				});
			});

			it("should return the history with alert for user", async () => {
				const request = {
					user: {
						id: 1,
					},
				} as unknown as Request;
				expect(
					await ebscoHistoryController.getHistory(request, 5, 0, "true"),
				).toStrictEqual({
					histories: [
						expect.objectContaining({
							user_id: "1",
							event: { test: "test 1" },
							active: true,
							hasAlert: true,
							last_results: [],
							nb_results: 0,
						}),
					],
					totalCount: 1,
				});
			});
		});

		describe("postHistory", () => {
			it("should return the created history", async () => {
				const request = {
					user: {
						id: 3,
					},
				} as unknown as Request;

				expect(
					await ebscoHistoryController.postHistory(request, {
						test: "test 1",
						totalHits: 20,
						frequence: "01:00:00",
					}),
				).toStrictEqual(
					expect.objectContaining({
						user_id: "3",
						active: true,
						event: { test: "test 1", totalHits: 20 },
						frequence: "01:00:00",
						has_alert: false,
						nb_results: 20,
					}),
				);
			});
		});

		describe("deleteHistory", () => {
			it("should delete history", async () => {
				const request = {
					user: {
						id: 2,
					},
				} as unknown as Request;

				await ebscoHistoryController.deleteHistory(request, 3);
				expect(
					await ebscoHistoryController.getHistory(request, 5, 0),
				).toStrictEqual({
					histories: [],
					totalCount: 0,
				});
			});
		});
	});
});
