import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, type TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import configFunction, { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { EbscoAuthGuard } from "../ebsco-auth/ebsco-auth.guard";
import { EbscoHistoriesController } from "./ebsco-histories.controller";
import { EbscoHistoryService } from "./ebsco-history.service";

describe("EbscoHistoriesController", () => {
	let ebscoHistoriesController: EbscoHistoriesController;

	beforeEach(async () => {
		const ebscoHistories: TestingModule = await Test.createTestingModule({
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
			controllers: [EbscoHistoriesController],
			providers: [EbscoHistoryService, PrismaService, EbscoAuthGuard],
		}).compile();

		ebscoHistoriesController = ebscoHistories.get<EbscoHistoriesController>(
			EbscoHistoriesController,
		);
	});

	describe("root", () => {
		it("should ensure the EbscoAuthGuard is applied to the controller", async () => {
			const JwtServiceMock = vi.mocked(JwtService);

			const configService = new ConfigService<Config, true>();
			vi.spyOn(configService, "get").mockReturnValue({});

			const guards = Reflect.getMetadata(
				"__guards__",
				EbscoHistoriesController,
			);
			const guard = new guards[0](new JwtServiceMock(), configService);

			expect(guard).toBeInstanceOf(EbscoAuthGuard);
			expect(configService.get).toHaveBeenCalledWith("auth");
		});
	});
});
