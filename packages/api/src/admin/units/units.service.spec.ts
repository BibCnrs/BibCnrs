import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { PrismaModule } from "../../prisma/prisma.module";
import { UnitsService } from "./units.service";

describe("UnitsService", () => {
	let service: UnitsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UnitsService],
			imports: [PrismaModule],
			exports: [UnitsService],
		}).compile();

		service = module.get<UnitsService>(UnitsService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
