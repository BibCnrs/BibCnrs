import { Test, type TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { PrismaService } from "../../prisma/prisma.service";
import { InistAccountService } from "./inist-account.service";

describe("EbscoResourcesController", () => {
	let inistAccountService: InistAccountService;

	beforeEach(async () => {
		const ebscoResources: TestingModule = await Test.createTestingModule({
			controllers: [],
			providers: [InistAccountService, PrismaService],
		}).compile();

		inistAccountService =
			ebscoResources.get<InistAccountService>(InistAccountService);
	});

	describe("root", () => {
		it("should return user if found", async () => {
			expect(
				await inistAccountService.authenticate("INIST", "INIST"),
			).toStrictEqual(
				expect.objectContaining({
					username: "INIST",
					password: "INIST",
					active: true,
					mail: "inist@cnrs.fr",
					domains: ["INSHS"],
					groups: ["inshs"],
				}),
			);
		});
		it("should return null if password is not correct", async () => {
			expect(await inistAccountService.authenticate("INIST", "wrong")).toBe(
				false,
			);
		});
		it("should return null if user is not found", async () => {
			expect(await inistAccountService.authenticate("wrong", "wrong")).toBe(
				false,
			);
		});
	});
});
