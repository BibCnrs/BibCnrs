import { ConfigModule, ConfigService } from "@nestjs/config";
import { ContextIdFactory } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CommonRedisService } from "../../common/common-redis/common-redis.service";
import configFunction from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { EbscoSearchArticleService } from "./ebsco-search-article.service";

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

	describe("parseSearchQuery", () => {
		describe("parsePublicationQueries", () => {
			describe("addTruncatureToQuery", () => {
				it("should add truncature to term if field is TI", () => {
					expect(
						service.addTruncatureToQuery({
							boolean: "AND",
							term: "Method of Fluxions",
							field: "TI",
						}),
					).toEqual({
						boolean: "AND",
						term: "Method* of* Fluxions*",
						field: "TI",
					});
				});

				it("should not add truncature if field is not TI", () => {
					expect(
						service.addTruncatureToQuery({
							boolean: "AND",
							term: "newton",
							field: "AU",
						}),
					).toEqual({
						boolean: "AND",
						term: "newton",
						field: "AU",
					});
				});

				it("should not add truncature if already present", () => {
					expect(
						service.addTruncatureToQuery({
							boolean: "AND",
							term: "Method of Fluxions*",
							field: "TI",
						}),
					).toEqual({
						boolean: "AND",
						term: "Method* of* Fluxions*",
						field: "TI",
					});
				});
			});

			describe("addTruncature", () => {
				it("should add truncature after each word", () => {
					expect(service.addTruncature("Method of Fluxions")).toBe(
						"Method* of* Fluxions*",
					);
				});

				it("should not add truncature after word that have one", () => {
					expect(service.addTruncature("Method of* Fluxions")).toBe(
						"Method* of* Fluxions*",
					);
				});

				it("should not add truncature to non word (number, punctuation)", () => {
					const term =
						"The 2nd International Symposium of BRAIN TUMOR PATHOLOGY and the 18th Annual Meeting of the Japan Society of Brain Tumor Pathology May 11–13, 2000 Nagoya Trade and Industry Center Nagoya, Japan";

					expect(service.addTruncature(term)).toBe(
						"The* 2nd International* Symposium* of* BRAIN* TUMOR* PATHOLOGY* and* the* 18th Annual* Meeting* of* the* Japan* Society* of* Brain* Tumor* Pathology* May* 11–13, 2000 Nagoya* Trade* and* Industry* Center* Nagoya, Japan*",
					);
				});
			});
		});
	});

	describe("parseDateRange", () => {
		it("should return default date range of 1000 to current year +1 when called with no parameter", () => {
			expect(service.parseDateRange()).toEqual({
				min: 1000,
				max: new Date().getFullYear() + 1,
			});
		});

		it("should extract date range in year from AvailableCriteria.DateRange", () => {
			expect(
				service.parseDateRange({
					AvailableCriteria: {
						DateRange: {
							MinDate: "1515-01",
							MaxDate: "1945-12",
						},
					},
				}),
			).toEqual({
				min: 1515,
				max: 1945,
			});
		});
	});
	describe("activeFacetParser", () => {
		describe("parse", () => {
			it("should return an empty object if called with no rawActiveFacets", () => {
				expect(service.parseActiveFacets()).toEqual({});
			});

			it("should return an empty object if called with an empty array", () => {
				expect(service.parseActiveFacets([])).toEqual({});
			});

			it("should return a literal with [Id]: [Value]", () => {
				expect(
					service.parseActiveFacets([
						{
							FilterId: 1,
							FacetValues: [
								{
									Id: "Language",
									Value: "french",
								},
							],
						},
						{
							FilterId: 2,
							FacetValues: [
								{
									Id: "SourceType",
									Value: "Non-Print Resources",
								},
							],
						},
					]),
				).toEqual({
					Language: ["french"],
					SourceType: ["Non-Print Resources"],
				});
			});

			it("should concatenate several on the same Id", () => {
				expect(
					service.parseActiveFacets([
						{
							FilterId: 1,
							FacetValues: [
								{
									Id: "Language",
									Value: "french",
								},
							],
						},
						{
							FilterId: 2,
							FacetValues: [
								{
									Id: "Language",
									Value: "english",
								},
							],
						},
					]),
				).toEqual({
					Language: ["french", "english"],
				});
			});
		});

		describe("unparse", () => {
			it("should return rawFacetActiveFacets from parsed one", () => {
				expect(
					service.unparseActiveFacet({
						Language: ["french", "english"],
						SourceType: ["Non-Print Resources"],
					}),
				).toEqual([
					{
						FilterId: 1,
						FacetValues: [
							{
								Id: "Language",
								Value: "french",
							},
							{
								Id: "Language",
								Value: "english",
							},
						],
					},
					{
						FilterId: 2,
						FacetValues: [
							{
								Id: "SourceType",
								Value: "Non-Print Resources",
							},
						],
					},
				]);
			});
		});
	});
});
