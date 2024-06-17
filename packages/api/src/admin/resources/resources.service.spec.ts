import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, test } from "vitest";
import { PrismaModule } from "../../prisma/prisma.module";
import { ResourcesService } from "./resources.service";

describe("ResourcesService", () => {
	let service: ResourcesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ResourcesService],
			imports: [PrismaModule],
			exports: [ResourcesService],
		}).compile();

		service = module.get<ResourcesService>(ResourcesService);
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});
});
