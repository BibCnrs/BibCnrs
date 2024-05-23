import { Test, TestingModule } from "@nestjs/testing";
import { AdminUsersService } from "packages/bib-api/src/admin/admin-users/admin-users.service";
import { PrismaModule } from "packages/bib-api/src/prisma/prisma.module";
import { beforeEach, describe, expect, test } from "vitest";

describe("AdminUsersService", () => {
	let service: AdminUsersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AdminUsersService],
			imports: [PrismaModule],
			exports: [AdminUsersService],
		}).compile();

		service = module.get<AdminUsersService>(AdminUsersService);
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});
});
