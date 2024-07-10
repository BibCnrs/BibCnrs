import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, type TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthGuard } from "../../common/auth/auth.guard";
import configFunction, { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { FrontLicenseController } from "./license.controller";
import { FrontLicenseService } from "./license.service";

describe("FrontLicenseController", () => {
	let frontLicenseController: FrontLicenseController;

	beforeEach(async () => {
		const frontLicense: TestingModule = await Test.createTestingModule({
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
			controllers: [FrontLicenseController],
			providers: [FrontLicenseService, PrismaService, AuthGuard],
		}).compile();

		frontLicenseController = frontLicense.get<FrontLicenseController>(
			FrontLicenseController,
		);
	});

	describe("root", () => {
		it("should ensure the EbscoAuthGuard is applied to the controller", async () => {
			const JwtServiceMock = vi.mocked(JwtService);

			const configService = new ConfigService<Config, true>();
			vi.spyOn(configService, "get").mockReturnValue({});

			const guards = Reflect.getMetadata("__guards__", FrontLicenseController);
			const guard = new guards[0](new JwtServiceMock(), configService);

			expect(guard).toBeInstanceOf(AuthGuard);
			expect(configService.get).toHaveBeenCalledWith("auth");
		});

		it("should return content for a single domain", async () => {
			expect(
				await frontLicenseController.getLicenses({
					domains: "INSB",
				}),
			).toStrictEqual([
				expect.objectContaining({
					name_fr: "Cadre d’utilisation",
					name_en: "Framework of Use",
					content_fr: "<p>Cadre d’utilisation</p>",
					content_en: "<p>Framework of use</p>",
					enable: true,
				}),
			]);
		});

		it("should return content for a multiple domains", async () => {
			expect(
				await frontLicenseController.getLicenses({
					domains: "INSHS,INSB",
				}),
			).toStrictEqual([
				expect.objectContaining({
					name_fr: "Cadre d’utilisation",
					name_en: "Framework of Use",
					content_fr: "<p>Cadre d’utilisation</p>",
					content_en: "<p>Framework of use</p>",
					enable: true,
				}),
				expect.objectContaining({
					name_fr: "Test de licence",
					name_en: "License Test",
					content_fr: "<p>Test de licence</p>",
					content_en: "<p>License Test</p>",
					enable: true,
				}),
			]);
		});

		it("should apply _perPage parameter", async () => {
			expect(
				await frontLicenseController.getLicenses({
					domains: "INSHS,INSB",
					_perPage: "1",
				}),
			).toStrictEqual([
				expect.objectContaining({
					name_fr: "Cadre d’utilisation",
					name_en: "Framework of Use",
					content_fr: "<p>Cadre d’utilisation</p>",
					content_en: "<p>Framework of use</p>",
					enable: true,
				}),
			]);
		});
		it("should apply _page parameter", async () => {
			expect(
				await frontLicenseController.getLicenses({
					domains: "INSHS,INSB",
					_perPage: "1",
					_page: "2",
				}),
			).toStrictEqual([
				expect.objectContaining({
					name_fr: "Test de licence",
					name_en: "License Test",
					content_fr: "<p>Test de licence</p>",
					content_en: "<p>License Test</p>",
					enable: true,
				}),
			]);
		});
	});
});
