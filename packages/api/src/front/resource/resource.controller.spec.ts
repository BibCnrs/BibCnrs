import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { PrismaService } from "../../prisma/prisma.service";
import { FrontResourceController } from "./resource.controller";
import { FrontResourceService } from "./resource.service";

describe("FrontResourcesController", () => {
	let frontResourcesController: FrontResourceController;

	beforeEach(async () => {
		const ebscoResources: TestingModule = await Test.createTestingModule({
			controllers: [FrontResourceController],
			providers: [FrontResourceService, PrismaService, ConfigService],
		}).compile();

		frontResourcesController = ebscoResources.get<FrontResourceController>(
			FrontResourceController,
		);
	});

	describe("root", () => {
		it("should return resources", async () => {
			expect(await frontResourcesController.getResources()).toStrictEqual([
				expect.objectContaining({
					name_en: "Bib Preprod",
					name_fr: "Bib Preprod",
					media: null,
					media_id: null,
					enable: true,
				}),
				expect.objectContaining({
					name_en: "Bib",
					name_fr: "Bib",
					media: null,
					media_id: null,
					enable: true,
				}),
			]);
		});
	});
});
