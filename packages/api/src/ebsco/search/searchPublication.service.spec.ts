import { ConfigModule } from "@nestjs/config";
import { ContextIdFactory } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HttpService } from "../../common/http/http.service";
import { RedisService } from "../../common/redis/redis.service";
import configFunction from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { EbscoSearchPublicationService } from "./searchPublication.service";

describe("EbscoSearchPublicationService", () => {
	let service: EbscoSearchPublicationService;

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
			providers: [
				EbscoSearchPublicationService,
				PrismaService,
				RedisService,
				HttpService,
			],
		}).compile();

		service = await module.resolve<EbscoSearchPublicationService>(
			EbscoSearchPublicationService,
			contextId,
		);
	});
	describe("parsePublicationQueries", () => {
		it("should return decoded query", () => {
			expect(
				service.parsePublicationQueries(
					'[{ "boolean": "AND", "term": "search term", "field": null }, { "boolean": "AND", "term": "Isaac Newton", "field": "AU" }]',
				),
			).toEqual({
				queries: [
					{
						boolean: "AND",
						term: "search term",
						field: null,
					},
					{
						boolean: "AND",
						term: "Isaac Newton",
						field: "AU",
					},
				],
			});
		});

		it("change change query if it match A-Z A2z search", () => {
			expect(
				service.parsePublicationQueries(
					'[{ "boolean": "AND", "term": "AL*", "field": "TI" }]',
				),
			).toEqual({
				queries: [
					{
						boolean: "AND",
						term: "JN (AL*) OR (TI (AL*) AND (PT book OR PT ebook))",
						field: null,
					},
				],
				sort: "title",
			});
		});

		it("change change query if it match 0-9 A2z search", () => {
			expect(
				service.parsePublicationQueries(
					'[{ "boolean": "AND", "term": "0* OR 1* OR 2* OR 3* OR 4* OR 5* OR 6* OR 7* OR 8* OR 9*", "field": "TI" }]',
				),
			).toEqual({
				queries: [
					{
						boolean: "AND",
						term: "JN (0* OR 1* OR 2* OR 3* OR 4* OR 5* OR 6* OR 7* OR 8* OR 9*) OR (TI (0* OR 1* OR 2* OR 3* OR 4* OR 5* OR 6* OR 7* OR 8* OR 9*) AND (PT book OR PT ebook))",
						field: null,
					},
				],
				sort: "title",
			});
		});
	});
});
