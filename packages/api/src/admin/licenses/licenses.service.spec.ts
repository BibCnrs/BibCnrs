import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { PrismaModule } from "../../prisma/prisma.module";
import { LicensesService } from "./licenses.service";

describe("LicensesService", () => {
	let service: LicensesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [LicensesService],
			imports: [PrismaModule],
			exports: [LicensesService],
		}).compile();

		service = module.get<LicensesService>(LicensesService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
