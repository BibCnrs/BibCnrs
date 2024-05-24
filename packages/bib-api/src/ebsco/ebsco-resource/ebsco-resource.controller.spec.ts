import { Test, type TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { PrismaService } from "../../prisma/prisma.service";
import { EbscoResourceController } from "./ebsco-resource.controller";
import { EbscoResourceService } from "./ebsco-resource.service";

describe("EbscoResourcesController", () => {
	let ebscoResourcesController: EbscoResourceController;

	beforeEach(async () => {
		const ebscoResources: TestingModule = await Test.createTestingModule({
			controllers: [EbscoResourceController],
			providers: [EbscoResourceService, PrismaService],
		}).compile();

		ebscoResourcesController = ebscoResources.get<EbscoResourceController>(
			EbscoResourceController,
		);
	});

	describe("root", () => {
		it("should return resources", async () => {
			expect(await ebscoResourcesController.getResources()).toStrictEqual([
				expect.objectContaining({
					community: "INSHS",
					name_en: "Bib Preprod",
					name_fr: "Bib Preprod",
					href: "https://bib-preprod.inist.fr/",
					enable: true,
				}),
				expect.objectContaining({
					community: "INSHS",
					name_en: "Bib",
					name_fr: "Bib",
					href: "https://bib.cnrs.fr/",
					enable: true,
				}),
			]);
		});
	});
});
