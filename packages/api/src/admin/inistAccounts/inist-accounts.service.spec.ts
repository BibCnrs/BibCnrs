import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, test } from "vitest";
import { PrismaModule } from "../../prisma/prisma.module";
import { InistAccountsService } from "./inist-accounts.service";

describe("InistAccountsService", () => {
	let service: InistAccountsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [InistAccountsService],
			imports: [PrismaModule],
			exports: [InistAccountsService],
		}).compile();

		service = module.get<InistAccountsService>(InistAccountsService);
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});
});
