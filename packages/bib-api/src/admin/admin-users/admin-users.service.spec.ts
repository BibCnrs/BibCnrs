import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, test } from "vitest";
import { PrismaModule } from "../../prisma/prisma.module";
import { SecurityModule } from "../../security/security.module";
import { AdminUsersService } from "./admin-users.service";

describe("AdminUsersService", () => {
	let service: AdminUsersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AdminUsersService],
			imports: [PrismaModule, SecurityModule],
			exports: [AdminUsersService],
		}).compile();

		service = module.get<AdminUsersService>(AdminUsersService);
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});
});
