import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Test, type TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserRetrieveGuard } from "../../common/auth/userRetrieveGuard";
import { PrismaService } from "../../prisma/prisma.service";
import { FrontDatabaseController } from "./database.controller";
import { FrontDatabaseService } from "./database.service";

const mockPrismaService = {
	database: {
		findMany: vi.fn().mockResolvedValue([
			{
				name_fr: "Wiley",
				text_fr: "Plateforme multidisciplinaire",
				text_en: "Multidisciplinary platform",
				url_fr: "https://onlinelibrary.wiley.com/",
				url_en: "https://onlinelibrary.wiley.com/",
				name_en: "Wiley",
				active: true,
				oa: true,
				use_proxy: true,
				communities: [
					{
						community: {
							name: "INSHS INSB IN2P3 INEE INP INSIS INSU INC INS2I INSMI",
						},
					},
				],
			},
			{
				name_fr: "Springer",
				text_fr: "Plateforme multidisciplinaire springer",
				text_en: "Multidisciplinary platform springer",
				url_fr: "https://link.springer.com/",
				url_en: "https://link.springer.com/",
				name_en: "Springer",
				active: true,
				oa: false,
				use_proxy: false,
				communities: [
					{
						community: {
							name: "INSHS INSB IN2P3 INEE INP INSIS INSU INC INS2I INSMI",
						},
					},
				],
			},
			{
				name_fr:
					"Alexander Street - Twentieth Century Religious Trought-Christianity",
				text_fr:
					"ISTEX : 440 ebooks et 173 articles en Théologie ; 3300 documents d'archives ",
				text_en:
					"ISTEX : 440 ebooks and 173 articles in Theology ; 3,300 archive documents ",
				url_fr: "https://inist.fr:8080",
				url_en: "https://inist.fr:8080",
				name_en:
					"Alexander Street - Twentieth Century Religious Trought-Christianity",
				active: true,
				oa: false,
				use_proxy: false,
				communities: [
					{
						community: {
							name: "INSHS",
						},
					},
				],
			},
		]),
	},
};

const mockJwtService = {
	sign: vi.fn().mockReturnValue("mocked-jwt-token"),
	verify: vi.fn().mockReturnValue({ userId: "mocked-user-id" }),
};

const mockConfigService = {
	get: vi.fn().mockReturnValue("mocked-config-value"),
};

const mockUserRetrieveGuard = {
	canActivate: vi.fn().mockResolvedValue(true),
};

describe("FrontDatabaseController", () => {
	let frontDatabaseController: FrontDatabaseController;

	beforeEach(async () => {
		const frontDatabase: TestingModule = await Test.createTestingModule({
			controllers: [FrontDatabaseController],
			providers: [
				FrontDatabaseService,
				{ provide: PrismaService, useValue: mockPrismaService },
				{ provide: JwtService, useValue: mockJwtService },
				{ provide: ConfigService, useValue: mockConfigService },
				{ provide: UserRetrieveGuard, useValue: mockUserRetrieveGuard },
			],
		}).compile();

		frontDatabaseController = frontDatabase.get<FrontDatabaseController>(
			FrontDatabaseController,
		);
	});
	describe("root", () => {
		it("should return active databases", async () => {
			const result = await frontDatabaseController.getDatabases({
				user: { userId: "mocked-user-id" },
			});

			describe("FrontDatabaseController", () => {
				let frontDatabaseController: FrontDatabaseController;

				beforeEach(async () => {
					const frontDatabase: TestingModule = await Test.createTestingModule({
						controllers: [FrontDatabaseController],
						providers: [
							FrontDatabaseService,
							{ provide: PrismaService, useValue: mockPrismaService },
							{ provide: JwtService, useValue: mockJwtService },
							{ provide: ConfigService, useValue: mockConfigService },
							{ provide: UserRetrieveGuard, useValue: mockUserRetrieveGuard },
						],
					}).compile();

					frontDatabaseController = frontDatabase.get<FrontDatabaseController>(
						FrontDatabaseController,
					);
				});

				describe("root", () => {
					it("should return active databases", async () => {
						const result = await frontDatabaseController.getDatabases({
							user: { userId: "mocked-user-id" },
						});

						expect(result).toStrictEqual([
							expect.objectContaining({
								name_fr: "Wiley",
								text_fr: "Plateforme multidisciplinaire",
								text_en: "Multidisciplinary platform",
								url_fr: "https://onlinelibrary.wiley.com/",
								url_en: "https://onlinelibrary.wiley.com/",
								name_en: "Wiley",
								active: true,
								oa: true,
								use_proxy: true,
								communities: [
									expect.objectContaining({
										community: expect.objectContaining({
											name: "INSHS INSB IN2P3 INEE INP INSIS INSU INC INS2I INSMI",
										}),
									}),
								],
							}),
							expect.objectContaining({
								name_fr: "Springer",
								text_fr: "Plateforme multidisciplinaire springer",
								text_en: "Multidisciplinary platform springer",
								url_fr: "https://link.springer.com/",
								url_en: "https://link.springer.com/",
								name_en: "Springer",
								active: true,
								oa: false,
								use_proxy: false,
								communities: [
									expect.objectContaining({
										community: expect.objectContaining({
											name: "INSHS INSB IN2P3 INEE INP INSIS INSU INC INS2I INSMI",
										}),
									}),
								],
							}),
						]);
					});

					it("should return databases with specific domains", async () => {
						const result = await frontDatabaseController.getDatabases({
							user: { userId: "mocked-user-id", domains: ["INSHS"] },
						});

						expect(result).toStrictEqual([
							expect.objectContaining({
								name_fr:
									"Alexander Street - Twentieth Century Religious Trought-Christianity",
								text_fr:
									"ISTEX : 440 ebooks et 173 articles en Théologie ; 3300 documents d'archives ",
								text_en:
									"ISTEX : 440 ebooks and 173 articles in Theology ; 3,300 archive documents ",
								url_fr: "https://inist.fr:8080",
								url_en: "https://inist.fr:8080",
								name_en:
									"Alexander Street - Twentieth Century Religious Trought-Christianity",
								active: true,
								oa: false,
								use_proxy: true,
								communities: [
									expect.objectContaining({
										community: expect.objectContaining({
											name: "INSHS",
										}),
									}),
								],
							}),
						]);
					});
				});
			});
		});
	});
});
