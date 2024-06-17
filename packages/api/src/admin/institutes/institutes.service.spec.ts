import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, test } from "vitest";
import { PrismaModule } from "../../prisma/prisma.module";
import { InstitutesService } from "./institutes.service";

describe("InstitutesService", () => {
	let service: InstitutesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [InstitutesService],
			imports: [PrismaModule],
			exports: [InstitutesService],
		}).compile();

		service = module.get<InstitutesService>(InstitutesService);
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});
});
