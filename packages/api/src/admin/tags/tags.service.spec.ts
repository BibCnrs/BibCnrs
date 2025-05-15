import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { PrismaModule } from "../../prisma/prisma.module";
import { TagsService } from "./tags.service";

describe("TagsService", () => {
	let service: TagsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TagsService],
			imports: [PrismaModule],
			exports: [TagsService],
		}).compile();

		service = module.get<TagsService>(TagsService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
