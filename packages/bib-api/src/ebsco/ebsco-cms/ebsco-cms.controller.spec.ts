import { Test, type TestingModule } from "@nestjs/testing";
import { Prisma } from "@prisma/client";
import { EbscoCmsController } from "packages/bib-api/src/ebsco/ebsco-cms/ebsco-cms.controller";
import { EbscoCmsService } from "packages/bib-api/src/ebsco/ebsco-cms/ebsco-cms.service";
import { PrismaService } from "packages/bib-api/src/prisma/prisma.service";

describe("EbscoCmsController", () => {
	const TEST_FAQ_CONTENT: Prisma.content_managementCreateArgs["data"] = {
		page: "faq",
		enable: true,
		from: new Date("2021-01-01"),
		to: null,
		name_en: "Hello",
		name_fr: "Bonjour",
		content_en: "Hello!",
		content_fr: "Bonjour!",
	};

	let ebscoCmsController: EbscoCmsController;

	beforeEach(async () => {
		const ebscoCms: TestingModule = await Test.createTestingModule({
			controllers: [EbscoCmsController],
			providers: [EbscoCmsService, PrismaService],
		}).compile();

		ebscoCmsController = ebscoCms.get<EbscoCmsController>(EbscoCmsController);

		const prismaService = ebscoCms.get<PrismaService>(PrismaService);

		await prismaService.$transaction([
			prismaService.content_management.deleteMany(),
			prismaService.content_management.create({
				data: TEST_FAQ_CONTENT,
			}),
		]);
	});

	describe("root", () => {
		it('should return "Hello World!"', async () => {
			expect(await ebscoCmsController.getContent("faq")).toStrictEqual([
				expect.objectContaining(TEST_FAQ_CONTENT),
			]);
		});
	});
});
