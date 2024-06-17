import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { PrismaModule } from "../../prisma/prisma.module";
import { SectionsCNService } from "./sectionsCN.service";

describe("SectionsCNService", () => {
	let service: SectionsCNService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SectionsCNService],
			imports: [PrismaModule],
			exports: [SectionsCNService],
		}).compile();

		service = module.get<SectionsCNService>(SectionsCNService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
