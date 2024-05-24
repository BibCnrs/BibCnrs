import { Test, type TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { PrismaService } from "../../prisma/prisma.service";
import { EbscoLicenseController } from "./ebsco-license.controller";
import { EbscoLicenseService } from "./ebsco-license.service";

describe("EbscoLicenseController", () => {
	let ebscoLicenseController: EbscoLicenseController;

	beforeEach(async () => {
		const ebscoLicense: TestingModule = await Test.createTestingModule({
			controllers: [EbscoLicenseController],
			providers: [EbscoLicenseService, PrismaService],
		}).compile();

		ebscoLicenseController = ebscoLicense.get<EbscoLicenseController>(
			EbscoLicenseController,
		);
	});

	describe("root", () => {
		it("should return content for a single domain", async () => {
			expect(
				await ebscoLicenseController.getLicenses({
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
				await ebscoLicenseController.getLicenses({
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
				await ebscoLicenseController.getLicenses({
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
				await ebscoLicenseController.getLicenses({
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
