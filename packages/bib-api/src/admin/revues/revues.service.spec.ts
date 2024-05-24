import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { PrismaModule } from "../../prisma/prisma.module";
import { RevuesService } from "./revues.service";

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
