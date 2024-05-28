import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, type TestingModule } from "@nestjs/testing";
import { Request } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";
import configFunction, { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { EbscoAuthGuard } from "../ebsco-auth/ebsco-auth.guard";
import { EbscoHistoryController } from "./ebsco-history.controller";
import { EbscoHistoryService } from "./ebsco-history.service";

describe("EbscoHistoryController", () => {
	let ebscoHistoryController: EbscoHistoryController;

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
			controllers: [EbscoHistoryController],
			providers: [EbscoHistoryService, PrismaService, EbscoAuthGuard],
		}).compile();

		ebscoHistoryController = ebscoHistory.get<EbscoHistoryController>(
			EbscoHistoryController,
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
					EbscoHistoryController,
				);
				const guard = new guards[0](new JwtServiceMock(), configService);

				expect(guard).toBeInstanceOf(EbscoAuthGuard);
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
				).toStrictEqual([
					expect.objectContaining({
						user_id: "1",
						event: { test: "test 1" },
						active: true,
						has_alert: true,
						last_results: [],
						nb_results: 0,
					}),
					expect.objectContaining({
						user_id: "1",
						event: { test: "test 2" },
						active: true,
						has_alert: false,
						last_results: [],
						nb_results: 0,
					}),
				]);
			});

			it("should return apply limit", async () => {
				const request = {
					user: {
						id: 1,
					},
				} as unknown as Request;
				expect(
					await ebscoHistoryController.getHistory(request, 1, 0),
				).toStrictEqual([
					expect.objectContaining({
						user_id: "1",
						event: { test: "test 1" },
						active: true,
						has_alert: true,
						last_results: [],
						nb_results: 0,
					}),
				]);
			});

			it("should return apply offset", async () => {
				const request = {
					user: {
						id: 1,
					},
				} as unknown as Request;
				expect(
					await ebscoHistoryController.getHistory(request, 1, 1),
				).toStrictEqual([
					expect.objectContaining({
						user_id: "1",
						event: { test: "test 2" },
						active: true,
						has_alert: false,
						last_results: [],
						nb_results: 0,
					}),
				]);
			});

			it("should return the history with alert for user", async () => {
				const request = {
					user: {
						id: 1,
					},
				} as unknown as Request;
				expect(
					await ebscoHistoryController.getHistory(request, 5, 0, "true"),
				).toStrictEqual([
					expect.objectContaining({
						user_id: "1",
						event: { test: "test 1" },
						active: true,
						has_alert: true,
						last_results: [],
						nb_results: 0,
					}),
				]);
			});
		});

		describe("postHistory", () => {
			it("should return the created history", async () => {
				const request = {
					user: {
						id: 2,
					},
				} as unknown as Request;

				const time = new Date(2021, 5, 10);

				expect(
					await ebscoHistoryController.postHistory(request, {
						active: true,
						event: { test: "test 1" },
						frequence: "1 hour",
						has_alert: true,
						last_execution: time,
						last_results: [],
						nb_results: 0,
					}),
				).toStrictEqual(
					expect.objectContaining({
						user_id: "2",
						active: true,
						event: { test: "test 1" },
						frequence: "01:00:00",
						has_alert: true,
						last_execution: time,
						last_results: [],
						nb_results: 0,
					}),
				);
			});
		});
	});
});
