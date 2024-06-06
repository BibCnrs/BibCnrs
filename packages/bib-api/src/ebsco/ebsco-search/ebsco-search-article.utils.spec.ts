import { describe, expect, it, vi } from "vitest";
import {
	cleanUrl,
	extractAbstract,
	extractAuthors,
	extractDOI,
	extractDatabase,
	extractExportLinks,
	extractFullTextLinks,
	extractHtml,
	extractLanguages,
	extractPdfLinks,
	extractPublicationDate,
	extractPublicationType,
	extractSource,
	extractSubjects,
} from "./ebsco-search-article.utils";
import { extractTitle } from "./ebsco-search-publication.utils";
import { AIDS_RESULTS_INPUT } from "./mock/aidsResult.input";

describe("articleParser", () => {
	describe(".extractDOI", () => {
		it("return DOI of given result", () => {
			const result = {
				ResultId: 1,
				RecordInfo: {
					BibRecord: {
						BibEntity: {
							Identifiers: [
								{
									Type: "other",
									Value: "some id",
								},
								{
									Type: "doi",
									Value: "The DOI",
								},
							],
						},
					},
				},
			};
			expect(extractDOI(result)).toBe("The DOI");
		});

		it("return null if no DOI found", () => {
			const result = {
				ResultId: 1,
				RecordInfo: {
					BibRecord: {
						BibEntity: {},
					},
				},
			};
			expect(extractDOI(result)).toBeNull();
		});
	});

	describe(".extractTitle", () => {
		it("return title of given result", () => {
			const result = {
				ResultId: 1,
				RecordInfo: {
					BibRecord: {
						BibEntity: {
							Titles: [
								{
									Type: "other",
									TitleFull: "other title",
								},
								{
									Type: "main",
									TitleFull: "main title",
								},
							],
						},
					},
				},
			};
			expect(extractTitle(result)).toBe("main title");
		});

		it("return null if no title found", () => {
			const result = {
				ResultId: 1,
				RecordInfo: {
					BibRecord: {},
				},
			};
			expect(extractTitle(result)).toBe(null);
		});

		it("return null if no main title found", () => {
			const result = {
				ResultId: 1,
				RecordInfo: {
					BibRecord: {
						BibEntity: {
							Titles: [
								{
									Type: "other",
									TitleFull: "other title",
								},
							],
						},
					},
				},
			};
			expect(extractTitle(result)).toBe(null);
		});
	});

	describe(".extractAuthors", () => {
		it("should return list of authors for result", () => {
			const result = {
				RecordInfo: {
					BibRecord: {
						BibRelationships: {
							HasContributorRelationships: [
								{
									PersonEntity: {
										Name: {
											NameFull: "Mary Curry",
										},
									},
								},
								{
									PersonEntity: {
										Name: {
											NameFull: "Louis Pasteur",
										},
									},
								},
								{
									PersonEntity: {
										Name: {
											NameFull: "Albert Newton",
										},
									},
								},
							],
						},
					},
				},
			};
			expect(extractAuthors(result)).toEqual([
				"Mary Curry",
				"Louis Pasteur",
				"Albert Newton",
			]);
		});

		it("should return null if no author found", () => {
			const result = {
				RecordInfo: {
					BibRelationships: {},
				},
			};
			expect(extractAuthors(result)).toEqual(null);
		});
	});

	describe("extractPublicationDate", () => {
		it("should return publicationDate from result", () => {
			const result = {
				RecordInfo: {
					BibRecord: {
						BibRelationships: {
							IsPartOfRelationships: [
								{
									BibEntity: {
										Dates: [
											{
												M: 12,
												D: 1,
												Y: 2015,
												Type: "published",
											},
										],
									},
								},
							],
						},
					},
				},
			};

			expect(extractPublicationDate(result)).toEqual(new Date("12/01/2015"));
		});

		it("should return null if date is invalid", () => {
			const result = {
				RecordInfo: {
					BibRecord: {
						BibRelationships: {
							IsPartOfRelationships: [
								{
									BibEntity: {
										Dates: [
											{
												M: 99,
												D: 99,
												Y: 2015,
												Type: "published",
											},
										],
									},
								},
							],
						},
					},
				},
			};

			expect(extractPublicationDate(result)).toEqual(null);
		});

		it("should return null if no date is found", () => {
			const result = {
				RecordInfo: {
					BibRelationships: {
						IsPartOfRelationships: {
							BibEntity: {},
						},
					},
				},
			};

			expect(extractPublicationDate(result)).toEqual(null);
		});
	});

	describe("extractLanguages", () => {
		it("should return languages from result", () => {
			const result = {
				RecordInfo: {
					BibRecord: {
						BibEntity: {
							Languages: [
								{
									Code: "eng",
									Text: "English",
								},
								{
									Code: "fra",
									Text: "French",
								},
							],
						},
					},
				},
			};

			expect(extractLanguages(result)).toEqual(["English", "French"]);
		});

		it("should return null if no language is found", () => {
			const result = {
				RecordInfo: {
					BibRecord: {
						BibEntity: {},
					},
				},
			};

			expect(extractLanguages(result)).toEqual(null);
		});
	});

	describe("extractDatabase", () => {
		it("should return database from result", () => {
			const result = {
				Header: {
					DbLabel: "mysql?",
				},
			};

			expect(extractDatabase(result)).toBe("mysql?");
		});

		it("should return null if no database is found", () => {
			const result = {
				Header: {},
			};

			expect(extractDatabase(result)).toBeNull();
		});
	});

	describe("extracSubjects", () => {
		it("should return subject list from result", () => {
			const result = {
				RecordInfo: {
					BibRecord: {
						BibEntity: {
							Subjects: [
								{
									SubjectFull: "The fermi paradox",
								},
								{
									SubjectFull: "Hempel's ravens",
								},
							],
						},
					},
				},
			};

			expect(extractSubjects(result)).toEqual([
				"The fermi paradox",
				"Hempel's ravens",
			]);
		});

		it("should return null if no subjects is found", () => {
			const result = {
				RecordInfo: {},
			};

			expect(extractSubjects(result)).toBeNull();
		});
	});

	describe("extractPublicationType", () => {
		it("should return pubType from result", () => {
			const result = {
				Header: {
					PubType: "Academic Journal",
				},
			};

			expect(extractPublicationType(result)).toBe("Academic Journal");
		});

		it("should return pubId if no PubType and PubId not unknown from result", () => {
			const result = {
				Header: {
					PubType: "",
					PubId: "Academic Journal",
				},
			};

			expect(extractPublicationType(result)).toBe("Academic Journal");
		});

		it('should return "Dissertation/ Thesis" if no PubType and PubId unknown and DbId is edsndl', () => {
			const result = {
				Header: {
					PubType: "",
					PubId: "unknown",
					DbId: "edsndl",
				},
			};

			expect(extractPublicationType(result)).toBe("Dissertation/ Thesis");
		});

		it("should return items TypePub data if no PubType and PubId unknown from result", () => {
			const result = {
				Header: {
					PubType: "",
					PubId: "unknown",
				},
				Items: [
					{
						Name: "title",
						Data: "the title",
					},
					{
						Name: "TypePub",
						Data: "Academic Journal",
					},
				],
			};

			expect(extractPublicationType(result)).toBe("Academic Journal");
		});

		it("should return null if no publicationType is found", () => {
			const result = {
				RecordInfo: {},
			};

			expect(extractPublicationType(result)).toBeNull();
		});
	});

	describe("extractSource", () => {
		it("should return sourceTitle from result", () => {
			const result = {
				Items: [
					{
						Name: "TitleSource",
						Data: "Here is my source.",
					},
				],
			};

			expect(extractSource(result)).toBe("Here is my source.");
		});

		it("should return sourceTitle from result without the xml tag if any", () => {
			const result = {
				Items: [
					{
						Name: "TitleSource",
						Data: '&lt;SearchLink attr="whatever"&gt;Here is&lt;/SearchLink&gt; &lt;i&gt;my&lt;/i&gt; source.',
					},
				],
			};

			expect(extractSource(result)).toBe("Here is my source.");
		});

		it("should return null if no source", () => {
			const result = {
				Items: [
					{
						Name: "Something",
						Data: "whatever",
					},
				],
			};

			expect(extractSource(result)).toBeNull();
		});
	});

	describe("extractAbstract", () => {
		it("should return abstract from result", () => {
			const result = {
				Items: [
					{
						Name: "Abstract",
						Data: "Here is the resume.",
					},
				],
			};

			expect(extractAbstract(result)).toBe("Here is the resume.");
		});

		it("should reblace br in abstract by \n", () => {
			const result = {
				Items: [
					{
						Name: "Abstract",
						Data: "Here is&lt;br&gt;the resume.&lt;br/&gt;On several lines.&lt;br /&gt;OK",
					},
				],
			};

			expect(extractAbstract(result)).toBe(
				"Here is\nthe resume.\nOn several lines.\nOK",
			);
		});

		it("should remove xml in abstract", () => {
			const result = {
				Items: [
					{
						Name: "Abstract",
						Data: "Here is&lt;br&gt;the &lt;supers&gt;resume&lt;/supers&gt;.&lt;br/&gt;On several lines.&lt;br /&gt;OK",
					},
				],
			};

			expect(extractAbstract(result)).toBe(
				"Here is\nthe resume.\nOn several lines.\nOK",
			);
		});

		it("should replace &lt; and $gt; by < and > if they are not part of a tag", () => {
			const result = {
				Items: [
					{
						Name: "Abstract",
						Data: "Here is&lt;br&gt;the &lt;supers&gt;resume&lt;/supers&gt;.&lt;br/&gt;On several lines.&lt;br /&gt;(&gt;_&lt;)",
					},
				],
			};

			expect(extractAbstract(result)).toBe(
				"Here is\nthe resume.\nOn several lines.\n(>_<)",
			);
		});

		it("should return null if no abstract", () => {
			const result = {
				Items: [
					{
						Name: "Something",
						Data: "whatever",
					},
				],
			};

			expect(extractSource(result)).toBeNull();
		});
	});

	describe("extractExportLinks", () => {
		it("should return exportLinks", async () => {
			const result = {
				CustomLinks: [
					{
						Name: "Exporter en format RIS",
						Url: "http://ris-link.com",
						Category: "other",
					},
					{
						Name: "Exporter en format BIBTEX",
						Url: "http://bibtex-link.com",
						Category: "other",
					},
					{
						Name: "Ignore",
						Url: "http://ignore-link.com",
						Category: "ignore",
					},
				],
			};

			expect(extractExportLinks(result)).toEqual({
				"Exporter en format RIS": "http://ris-link.com",
				"Exporter en format BIBTEX": "http://bibtex-link.com",
			});
		});

		it("should return empty array if no CustomLinks", () => {
			const result = {};

			expect(extractExportLinks(result)).toEqual({});
		});
	});

	describe("extractFullTextLinks", () => {
		it("should return array of customLinks", () => {
			expect(
				extractFullTextLinks({
					FullText: {
						CustomLinks: [
							{
								Category: "fullText",
								Text: "name1",
								Url: "http://url1",
							},
							{
								Category: "fullText",
								Text: "name2",
								Url: "http://url2",
							},
						],
					},
				}),
			).toMatchObject([
				{ name: "name1", url: "http://url1" },
				{ name: "name2", url: "http://url2" },
			]);
		});

		it("should ignore customLinks that have not the fullText category", () => {
			expect(
				extractFullTextLinks({
					FullText: {
						CustomLinks: [
							{
								Category: "fullText",
								Text: "name1",
								Url: "http://url1",
							},
							{
								Category: "noFullText",
								Text: "name2",
								Url: "http://url2",
							},
						],
					},
				}),
			).toMatchObject([{ name: "name1", url: "http://url1" }]);
		});

		it("should replace all &amp; by & in all link", () => {
			expect(
				extractFullTextLinks({
					FullText: {
						CustomLinks: [
							{
								Category: "fullText",
								Text: "name1",
								Url: "http://url1?a=1&amp;b=2",
							},
							{
								Category: "fullText",
								Text: "name2",
								Url: "http://url2?a=1&amp;b=2&amp;c=3",
							},
						],
					},
				}),
			).toMatchObject([
				{
					name: "name1",
					url: "http://url1?a=1&b=2",
				},
				{
					name: "name2",
					url: "http://url2?a=1&b=2&c=3",
				},
			]);
		});
	});

	describe("extractPdfLinks", () => {
		it("should extract pdf link", () => {
			expect(
				extractPdfLinks({
					FullText: {
						Links: [
							{
								Type: "pdflink",
								Url: "http://url1",
							},
							{
								Type: "pdflink",
								Url: "http://url2",
							},
						],
					},
				}),
			).toMatchObject([{ url: "http://url1" }, { url: "http://url2" }]);
		});

		it("should exclude link with type other than pdflink", () => {
			expect(
				extractPdfLinks({
					FullText: {
						Links: [
							{
								Type: "pdflink",
								Url: "http://url1",
							},
							{
								Type: "nopdflink",
								Url: "http://url2",
							},
						],
					},
				}),
			).toMatchObject([{ url: "http://url1" }]);
		});

		it("should exclude link with no Url", () => {
			expect(
				extractPdfLinks({
					FullText: {
						Links: [
							{
								Type: "pdflink",
								Url: "http://url1",
							},
							{ Type: "nopdflink" },
						],
					},
				}),
			).toMatchObject([{ url: "http://url1" }]);
		});
	});

	describe("extractHtml", () => {
		it("should extract html from result", () => {
			expect(
				extractHtml({
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
					},
				}),
			).toBe(
				`<html>
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
			);
		});

		it("should return null if no FullText.Text.Value", () => {
			expect(
				extractHtml({
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
						},
					},
				}),
			).toBeNull();
		});

		it("should return null if FullText.Text.Availability is not 1", () => {
			expect(
				extractHtml({
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
							Availability: "0",
							Value: `&lt;anid&gt;anid&lt;/anid&gt;
&lt;title&gt;title&lt;/title&gt;
&lt;hd&gt;subtitle&lt;/hd&gt;
&lt;p&gt;text&lt;/p&gt;
&lt;ulist&gt;
&lt;item&gt;list item&lt;/item&gt;
&lt;/ulist&gt;`,
						},
					},
				}),
			).toBeNull();
		});

		it("should return null if no FullText.Text", () => {
			expect(
				extractHtml({
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
					FullText: {},
				}),
			).toBeNull();
		});

		it("should return null if no FullText", () => {
			expect(
				extractHtml({
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
				}),
			).toBeNull();
		});
	});

	describe("cleanUrl", () => {
		it("should return url from given string", () => {
			expect(cleanUrl("http://editor.com?title=the title&author=nemo")).toBe(
				"http://editor.com?title=the title&author=nemo",
			);
			expect(
				cleanUrl(
					"series: http://onlinelibrary.wiley.com/journal/10.1002/%28ISSN%291944-8007/issues",
				),
			).toBe(
				"http://onlinelibrary.wiley.com/journal/10.1002/%28ISSN%291944-8007/issues",
			);
		});
	});
});
