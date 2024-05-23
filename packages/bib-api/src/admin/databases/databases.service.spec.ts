import { Test, TestingModule } from "@nestjs/testing";
import { DatabasesService } from "packages/bib-api/src/admin/databases/databases.service";
import { PrismaModule } from "packages/bib-api/src/prisma/prisma.module";
import { beforeEach, describe, expect, it } from "vitest";

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
