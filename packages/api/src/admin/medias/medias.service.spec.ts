import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, test } from "vitest";
import { PrismaModule } from "../../prisma/prisma.module";
import { MediasService } from "./medias.service";

describe("MediasService", () => {
	let service: MediasService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [MediasService],
			imports: [PrismaModule],
			exports: [MediasService],
		}).compile();

		service = module.get<MediasService>(MediasService);
	});

	test("should be defined", () => {
		expect(service).toBeDefined();
	});
});
