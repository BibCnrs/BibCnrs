import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { PrismaModule } from "../../prisma/prisma.module";
import { CommunitiesService } from "./communities.service";

describe("CommunitiesService", () => {
	let service: CommunitiesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [CommunitiesService],
			imports: [PrismaModule],
			exports: [CommunitiesService],
		}).compile();

		service = module.get<CommunitiesService>(CommunitiesService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
