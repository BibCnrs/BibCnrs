import { Test, type TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { PrismaService } from "../../prisma/prisma.service";
import { EbscoDomainController } from "./ebsco-domain.controller";
import { EbscoDomainService } from "./ebsco-domain.service";

describe("EbscoDomainController", () => {
	let ebscoDomainController: EbscoDomainController;

	beforeEach(async () => {
		const ebscoDomain: TestingModule = await Test.createTestingModule({
			controllers: [EbscoDomainController],
			providers: [EbscoDomainService, PrismaService],
		}).compile();

		ebscoDomainController = ebscoDomain.get<EbscoDomainController>(
			EbscoDomainController,
		);
	});

	describe("root", () => {
		it("should return content for the home page", async () => {
			expect(await ebscoDomainController.getCommunities()).toStrictEqual([
				expect.objectContaining({
					name: "INSHS",
					gate: "inshs",
				}),
				expect.objectContaining({
					name: "INSB",
					gate: "insb",
				}),
			]);
		});
	});
});
