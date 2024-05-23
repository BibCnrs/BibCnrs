import { Test, TestingModule } from "@nestjs/testing";
import { CommunitiesService } from "packages/bib-api/src/admin/communities/communities.service";
import { PrismaModule } from "packages/bib-api/src/prisma/prisma.module";
import { beforeEach, describe, expect, it } from "vitest";

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
