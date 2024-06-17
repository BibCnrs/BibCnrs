import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, test } from "vitest";
import { PrismaModule } from "../../prisma/prisma.module";
import { ContentsManagementService } from "./contents-management.service";

describe("ContentsManagementService", () => {
	let service: ContentsManagementService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ContentsManagementService],
			imports: [PrismaModule],
			exports: [ContentsManagementService],
		}).compile();

		service = module.get<ContentsManagementService>(ContentsManagementService);
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});
});
