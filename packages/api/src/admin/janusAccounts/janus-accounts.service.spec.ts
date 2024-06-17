import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, test } from "vitest";
import { PrismaModule } from "../../prisma/prisma.module";
import { JanusAccountsService } from "./janus-accounts.service";

describe("JanusAccountsService", () => {
	let service: JanusAccountsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [JanusAccountsService],
			imports: [PrismaModule],
			exports: [JanusAccountsService],
		}).compile();

		service = module.get<JanusAccountsService>(JanusAccountsService);
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});
});
