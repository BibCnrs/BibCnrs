import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, type TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthGuard } from "../../common/auth/auth.guard";
import { HttpService } from "../../common/http/http.service";
import { RedisService } from "../../common/redis/redis.service";
import configFunction, { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { EbscoDomainService } from "../domain/domain.service";
import { EbscoSearchArticleService } from "../search/searchArticle.service";
import { EbscoSearchAlertController } from "./searchAlert.controller";
import { EbscoSearchAlertService } from "./searchAlert.service";

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
			providers: [
				EbscoSearchAlertService,
				EbscoSearchArticleService,
				EbscoDomainService,
				PrismaService,
				AuthGuard,
				HttpService,
				RedisService,
			],
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
