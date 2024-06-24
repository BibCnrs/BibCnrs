import { ConfigModule } from "@nestjs/config";
import { ContextIdFactory } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HttpService } from "../../common/http/http.service";
import { AppLogger } from "../../common/logger/AppLogger";
import { logContextFactory } from "../../common/logger/logger.module";
import { RedisService } from "../../common/redis/redis.service";
import configFunction from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { EbscoMetadoreService } from "./metadore.service";
import { COVID_RESULTS_EXPECTED } from "./mock/covidResult.expected";
import { COVID_RESULTS_INPUT } from "./mock/covidResult.input";

describe("EbscoMetadoreService", () => {
	let service: EbscoMetadoreService;

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
				logContextFactory,
				AppLogger,
				EbscoMetadoreService,
				PrismaService,
				RedisService,
				HttpService,
			],
		}).compile();

		service = await module.resolve<EbscoMetadoreService>(
			EbscoMetadoreService,
			contextId,
		);
	});

	describe("service.parseMetadoreSearch", () => {
		it("should return expected query string when no currentPage is sent", () => {
			const rawQuery = {
				queries: '[{"term":"search term","suggestedTerms":[]}]',
				resultsPerPage: 10,
			};
			const expectedQueryString =
				"query=%28*%3A%22search+term%22%29AND%28%28attributes.types.resourceType%3ADataset%29OR%28attributes.types.resourceTypeGeneral%3ADataset%29%29%26sort%3Dattributes.publicationYear%3Adesc&size=10&page=1";
			expect(service.parseMetadoreSearch(rawQuery).toString()).toBe(
				expectedQueryString,
			);
		});

		it("should return expected query string when a currentPage is sent", () => {
			const rawQuery = {
				queries: '[{"term":"search term","suggestedTerms":[]}]',
				resultsPerPage: 10,
				currentPage: 3,
			};
			const expectedQueryString =
				"query=%28*%3A%22search+term%22%29AND%28%28attributes.types.resourceType%3ADataset%29OR%28attributes.types.resourceTypeGeneral%3ADataset%29%29%26sort%3Dattributes.publicationYear%3Adesc&size=10&page=3";
			expect(service.parseMetadoreSearch(rawQuery).toString()).toBe(
				expectedQueryString,
			);
		});
		it("should return expected query string when a field is set", () => {
			const rawQuery = {
				queries:
					'[{"term":"search term","suggestedTerms":[],"field":"attributes.descriptions.description"}]',
				resultsPerPage: 10,
			};
			const expectedQueryString =
				"query=%28attributes.descriptions.description%3A%22search+term%22%29AND%28%28attributes.types.resourceType%3ADataset%29OR%28attributes.types.resourceTypeGeneral%3ADataset%29%29%26sort%3Dattributes.publicationYear%3Adesc&size=10&page=1";
			expect(service.parseMetadoreSearch(rawQuery).toString()).toBe(
				expectedQueryString,
			);
		});
		it("should return expected query string when the field is title and term contains one word", () => {
			const rawQuery = {
				queries:
					'[{"term":"covid","suggestedTerms":[],"field":"attributes.titles.title"}]',
				resultsPerPage: 10,
			};
			const expectedQueryString =
				"query=%28attributes.titles.title%3A*covid*%29AND%28%28attributes.types.resourceType%3ADataset%29OR%28attributes.types.resourceTypeGeneral%3ADataset%29%29%26sort%3Dattributes.publicationYear%3Adesc&size=10&page=1";
			expect(service.parseMetadoreSearch(rawQuery).toString()).toBe(
				expectedQueryString,
			);
		});
		it("should return expected query string when the field is title and term contains a group of words", () => {
			const rawQuery = {
				queries:
					'[{"term":"covid pandemic","suggestedTerms":[],"field":"attributes.titles.title"}]',
				resultsPerPage: 10,
			};
			const expectedQueryString =
				"query=%28attributes.titles.title%3A*covid*%29AND%28attributes.titles.title%3A*pandemic*%29AND%28%28attributes.types.resourceType%3ADataset%29OR%28attributes.types.resourceTypeGeneral%3ADataset%29%29%26sort%3Dattributes.publicationYear%3Adesc&size=10&page=1";
			expect(service.parseMetadoreSearch(rawQuery).toString()).toBe(
				expectedQueryString,
			);
		});
	});

	describe("metadoreResultsParser", () => {
		it("should extract relevant information from metadore raw result", async () => {
			expect(service.metadoreResultsParser(COVID_RESULTS_INPUT)).toMatchObject(
				COVID_RESULTS_EXPECTED,
			);
		});
	});
});
