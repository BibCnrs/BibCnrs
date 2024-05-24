import { Test, TestingModule } from "@nestjs/testing";
import { RevuesService } from "packages/bib-api/src/admin/revues/revues.service";
import { PrismaModule } from "packages/bib-api/src/prisma/prisma.module";
import { beforeEach, describe, expect, it } from "vitest";

describe("RevuesService", () => {
	let service: RevuesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [RevuesService],
			imports: [PrismaModule],
			exports: [RevuesService],
		}).compile();

		service = module.get<RevuesService>(RevuesService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
