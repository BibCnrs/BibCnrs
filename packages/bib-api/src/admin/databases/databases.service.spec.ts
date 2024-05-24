import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { PrismaModule } from "../../prisma/prisma.module";
import { DatabasesService } from "./databases.service";

describe("DatabasesService", () => {
	let service: DatabasesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [DatabasesService],
			imports: [PrismaModule],
			exports: [DatabasesService],
		}).compile();

		service = module.get<DatabasesService>(DatabasesService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
