import { ConfigModule, ConfigService } from "@nestjs/config";
import { ContextIdFactory } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CommonRedisService } from "../../common/common-redis/common-redis.service";
import configFunction from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { EbscoSearchArticleService } from "./ebsco-search-article.service";

import { AIDS_RESULTS_EXPECTED } from "./mock/aidsResult.expected";
import { AIDS_RESULTS_INPUT } from "./mock/aidsResult.input";

describe("EbscoSearchArticleService", () => {
	let service: EbscoSearchArticleService;

	beforeEach(async () => {
		const contextId = ContextIdFactory.create();
		vi.spyOn(ContextIdFactory, "getByRequest").mockReturnValue(contextId);
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				ConfigModule.forRoot({
					ignoreEnvFile: true,
					load: [configFunction],
					isGlobal: false,
				}),
			],
			providers: [EbscoSearchArticleService, PrismaService, CommonRedisService],
		}).compile();

		service = await module.resolve<EbscoSearchArticleService>(
			EbscoSearchArticleService,
			contextId,
		);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should extract relevant information from ebsco raw result", async () => {
		expect(
			service.parsePublicationResults(
				service.searchArticleParser.bind(service),
				AIDS_RESULTS_INPUT,
				"INSH",
			),
		).resolves.toMatchObject({
			...AIDS_RESULTS_EXPECTED,
		});
	});
});
