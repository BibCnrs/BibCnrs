import { ConfigModule } from "@nestjs/config";
import { ContextIdFactory } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RedisService } from "../../common/redis/redis.service";
import configFunction from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { EbscoSearchArticleService } from "./searchArticle.service";

import { AIDS_RESULTS_EXPECTED } from "./mock/aidsResult.expected";
import { AIDS_RESULTS_INPUT } from "./mock/aidsResult.input";
import { RETRIEVE_ARTICLE_PARSER_EXPECTED } from "./mock/retrieveArticleParser.expected";
import { RETRIEVE_ARTICLE_PARSER_INPUT } from "./mock/retrieveArticleParser.input";

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
			providers: [EbscoSearchArticleService, PrismaService, RedisService],
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
		await expect(
			service.parsePublicationResults(
				service.searchArticleParser.bind(service),
				AIDS_RESULTS_INPUT,
				"INSH",
			),
		).resolves.toMatchObject({
			...AIDS_RESULTS_EXPECTED,
		});
	});
	describe("service.getDOIFromQuery", () => {
		it("should extract DOI from query", () => {
			expect(
				service.getDOIFromQuery({
					queries: [
						{
							term: "10.1088/1748-0221/13/01/C01029",
							field: null,
						},
					],
				}),
			).toBe("10.1088/1748-0221/13/01/C01029");
		});

		it("should return null if no DOI", () => {
			expect(
				service.getDOIFromQuery({
					queries: [{ term: "not a DOI", field: null }],
				}),
			).toBeNull();
		});

		it("should return null if complex query", () => {
			expect(
				service.getDOIFromQuery({
					queries: [
						{
							term: "10.1088/1748-0221/13/01/C01029",
							field: null,
						},
						{ term: "Isaac Newton", field: "AU" },
					],
				}),
			).toBeNull();
		});

		it("should return null if field is not null", () => {
			expect(
				service.getDOIFromQuery({
					queries: [
						{
							term: "10.1088/1748-0221/13/01/C01029",
							field: "TI",
						},
						null,
					],
				}),
			).toBeNull();
		});

		describe("service.isDOI", () => {
			it("should return true if string is a valid doi", () => {
				expect(
					service.isDOI("10.1016.12.31/nature.S0735-1097(98)2000/12/31/34:7-7"),
				).toBe(true);
				expect(service.isDOI("10.1088/1748-0221/13/01/C01029")).toBe(true);
			});

			it("should return false if string is not a valid doi", () => {
				expect(service.isDOI("not a DOI")).toBe(false);
			});

			it("should return false if given no string", () => {
				expect(service.isDOI()).toBe(false);
			});
		});
	});

	describe("articleLinkParser", () => {
		it("should return directLinks, fullTextLinks, hasPdfLink and PLink", async () => {
			const result = {
				RecordInfo: {
					BibRecord: {
						BibEntity: {
							Titles: [
								{
									TitleFull: "title",
									Type: "main",
								},
							],
						},
					},
				},
				FullText: {
					Text: {
						Availability: "1",
						Value: `&lt;anid&gt;anid&lt;/anid&gt;
&lt;title&gt;title&lt;/title&gt;
&lt;hd&gt;subtitle&lt;/hd&gt;
&lt;p&gt;text&lt;/p&gt;
&lt;ulist&gt;
    &lt;item&gt;list item&lt;/item&gt;
&lt;/ulist&gt;`,
					},
					Links: [
						{
							Type: "pdflink",
							Url: "https://en.wikipedia.org/wiki/Fermi_paradox",
						},
					],
					CustomLinks: [
						{
							Url: "http://resolver.ebscohost.com/openurl",
							Category: "fullText",
							Text: "Full Text Finder",
						},
					],
				},
				Items: [
					{
						Name: "URL",
						Label: "Access url",
						Data: "&lt;link linkTarget=&quot;URL&quot; linkTerm=&quot;https://clinicaltrials.gov/show/NCT01482923&quot; linkWindow=&quot;_blank&quot;&gt;https://clinicaltrials.gov/show/NCT01482923&lt;/link&gt;",
					},
					{
						Name: "URL",
						Label: "Availability",
						Data: "http://hdl.handle.net/10520/EJC189235",
					},
					{
						Name: "not URL",
						Label: "A label",
						Data: "Some other data",
					},
				],
			};

			await expect(
				service.articleLinkParser(result, "INSB"),
			).resolves.toMatchObject({
				fullTextLinks: [
					{
						name: "Full Text Finder",
						url: "http://resolver.ebscohost.com/openurl",
					},
				],
				pdfLinks: [
					{
						url: "https://en.wikipedia.org/wiki/Fermi_paradox",
					},
				],
				html: `<html>
    <head>
        <title>title</title>
    </head>
    <body>
        <anid>anid</anid>
<h1>title</h1>
<h2>subtitle</h2>
<p>text</p>
<ul>
    <li>list item</li>
</ul>
    </body>
</html>`,
				urls: [
					{
						name: "Access url",
						url: "https://clinicaltrials.gov/show/NCT01482923",
					},
					{
						name: "Availability",
						url: "http://hdl.handle.net/10520/EJC189235",
					},
				],
			});
		});
	});

	describe("extractAccessUrls", () => {
		it("should extract URL", async () => {
			await expect(
				service.extractUrls({
					Items: [
						{
							Name: "URL",
							Label: "Availability",
							Data: "http://hdl.handle.net/10520/EJC189235",
						},
					],
				}),
			).resolves.toMatchObject([
				{
					name: "Availability",
					url: "http://hdl.handle.net/10520/EJC189235",
				},
			]);
		});

		it("should extract Avail", async () => {
			await expect(
				service.extractUrls({
					Items: [
						{
							Name: "Avail",
							Label: "Availability",
							Data: "http://hdl.handle.net/10520/EJC189235",
						},
					],
				}),
			).resolves.toMatchObject([
				{
					name: "Availability",
					url: "http://hdl.handle.net/10520/EJC189235",
				},
			]);
		});

		it("should ignore Items with Name other than URL or Avail", async () => {
			await expect(
				service.extractUrls({
					Items: [
						{
							Name: "not URL",
							Label: "A label",
							Data: "Some other data",
						},
					],
				}),
			).resolves.toMatchObject([]);
		});

		it("should parse extracted url if necessary", async () => {
			await expect(
				service.extractUrls({
					Items: [
						{
							Name: "URL",
							Label: "Access url",
							Data: "&lt;link linkTarget=&quot;URL&quot; linkTerm=&quot;https://clinicaltrials.gov/show/NCT01482923&quot; linkWindow=&quot;_blank&quot;&gt;https://clinicaltrials.gov/show/NCT01482923&lt;/link&gt;",
						},
					],
				}),
			).resolves.toMatchObject([
				{
					name: "Access url",
					url: "https://clinicaltrials.gov/show/NCT01482923",
				},
			]);
		});

		it("should extract url from text if necessary", async () => {
			await expect(
				service.extractUrls({
					Items: [
						{
							Name: "URL",
							Label: "Access url",
							Data: "Full Text from ERIC Available online : &lt;link linkTarget=&quot;URL&quot; linkTerm=&quot;https://clinicaltrials.gov/show/NCT01482923&quot; linkWindow=&quot;_blank&quot;&gt;https://clinicaltrials.gov/show/NCT01482923&lt;/link&gt; Bla bla bla",
						},
					],
				}),
			).resolves.toMatchObject([
				{
					name: "Access url",
					url: "https://clinicaltrials.gov/show/NCT01482923",
				},
			]);
		});

		it("should return emptyArray if no Items", async () => {
			await expect(service.extractUrls({})).resolves.toMatchObject([]);
		});

		describe("retrieveArticleParser", () => {
			it("should extract DbId from ebsco record", async () => {
				const data = {
					Header: {
						DbId: "databaseId",
						DbLabel: "database name",
					},
				};
				expect(await service.retrieveArticleParser(data)).toEqual({
					dbId: "databaseId",
					dbLabel: "database name",
					articleLinks: {
						fullTextLinks: [],
						pdfLinks: [],
						html: null,
						urls: [],
					},
					items: [],
				});
			});

			it("should default db to undefined", async () => {
				expect(await service.retrieveArticleParser({}, "SHS")).toEqual({
					dbId: undefined,
					dbLabel: undefined,
					articleLinks: {
						fullTextLinks: [],
						pdfLinks: [],
						html: null,
						urls: [],
					},
					items: [],
				});
			});

			it("should parse raw result", async () => {
				expect(
					await service.retrieveArticleParser(
						RETRIEVE_ARTICLE_PARSER_INPUT.Record,
					),
				).toEqual(RETRIEVE_ARTICLE_PARSER_EXPECTED);
			});
		});
	});
});
