import { Test, TestingModule } from "@nestjs/testing";
import { PrismaModule } from "../../prisma/prisma.module";
import { AdminUsersService } from "./admin-users.service";

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

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
