import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, test } from "vitest";
import { PrismaModule } from "../../prisma/prisma.module";
import { TestsNewsService } from "./tests-news.service";

describe("TestsNewsService", () => {
	let service: TestsNewsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TestsNewsService],
			imports: [PrismaModule],
			exports: [TestsNewsService],
		}).compile();

		service = module.get<TestsNewsService>(TestsNewsService);
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});
});
