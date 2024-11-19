import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PrismaService } from "../../prisma/prisma.service";
import { FrontResourceController } from "./resource.controller";
import { FrontResourceService } from "./resource.service";

describe("FrontResourcesController", () => {
	let frontResourcesController: FrontResourceController;

	beforeEach(async () => {
		const mockConfigService = {
			get: vi.fn().mockImplementation((key: string) => {
				if (key === "services") {
					return {
						contentDelivery: "http://example.com/content/",
					};
				}
				return null;
			}),
		};

		const ebscoResources: TestingModule = await Test.createTestingModule({
			controllers: [FrontResourceController],
			providers: [
				FrontResourceService,
				PrismaService,
				{
					provide: ConfigService,
					useValue: mockConfigService,
				},
			],
		}).compile();

		frontResourcesController = ebscoResources.get<FrontResourceController>(
			FrontResourceController,
		);
	});

	describe("root", () => {
		it("should return resources", async () => {
			expect(await frontResourcesController.getResources()).toStrictEqual([
				expect.objectContaining({
					id: 1,
					name_en: "Bib Preprod",
					name_fr: "Bib Preprod",
					media_id: 101,
					enable: true,
				}),
				expect.objectContaining({
					id: 2,
					name_en: "Bib",
					name_fr: "Bib",
					media_id: 100,
					enable: true,
				}),
			]);
		});
	});
});
