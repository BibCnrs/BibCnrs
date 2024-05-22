import { Test, type TestingModule } from "@nestjs/testing";
import { EbscoCmsController } from "packages/bib-api/src/ebsco/ebsco-cms/ebsco-cms.controller";
import { EbscoCmsService } from "packages/bib-api/src/ebsco/ebsco-cms/ebsco-cms.service";

describe("EbscoCmsController", () => {
	let ebscoCmsController: EbscoCmsController;

	beforeEach(async () => {
		const ebscoCms: TestingModule = await Test.createTestingModule({
			controllers: [EbscoCmsController],
			providers: [EbscoCmsService],
		}).compile();

		ebscoCmsController = ebscoCms.get<EbscoCmsController>(EbscoCmsController);
	});

	describe("root", () => {
		it('should return "Hello World!"', () => {
			expect(ebscoCmsController.getContent()).toStrictEqual([{ a: 1 }]);
		});
	});
});
