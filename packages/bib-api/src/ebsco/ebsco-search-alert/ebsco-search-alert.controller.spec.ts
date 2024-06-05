import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, type TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthGuard } from "../../common/common-auth/common-auth.guard";
import configFunction, { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { EbscoSearchAlertController } from "./ebsco-search-alert.controller";
import { EbscoSearchAlertService } from "./ebsco-search-alert.service";

describe("EbscoSearchAlertController", () => {
	let ebscoSearchAlertController: EbscoSearchAlertController;

	beforeEach(async () => {
		const ebscoSearchAlert: TestingModule = await Test.createTestingModule({
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
			controllers: [EbscoSearchAlertController],
			providers: [EbscoSearchAlertService, PrismaService, AuthGuard],
		}).compile();

		ebscoSearchAlertController =
			ebscoSearchAlert.get<EbscoSearchAlertController>(
				EbscoSearchAlertController,
			);
	});

	describe("root", () => {
		it("should ensure the EbscoAuthGuard is applied to the controller", async () => {
			const JwtServiceMock = vi.mocked(JwtService);

			const configService = new ConfigService<Config, true>();
			vi.spyOn(configService, "get").mockReturnValue({});

			const guards = Reflect.getMetadata(
				"__guards__",
				EbscoSearchAlertController,
			);
			const guard = new guards[0](new JwtServiceMock(), configService);

			expect(guard).toBeInstanceOf(AuthGuard);
			expect(configService.get).toHaveBeenCalledWith("auth");
		});
	});
});
