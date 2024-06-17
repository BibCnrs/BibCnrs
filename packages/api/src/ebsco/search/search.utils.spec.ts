import { describe, expect, it } from "vitest";
import {
	parseXML,
	parseXMLLine,
	parseXMLObject,
	smartConcat,
} from "./search.utils";

describe("parseXML", () => {
	it("should extract searchLink", async () => {
		const authorField =
			"&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Chen+S%22&quot;&gt;Chen S&lt;/searchLink&gt;; Hebei Province Center for Disease Control and Prevention, 97 Huaian East Road, Yuhua District, Shijiazhuang, 050021, China. hebeicdc2013@sina.com.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Zhao+H%22&quot;&gt;Zhao H&lt;/searchLink&gt;; Hebei Province Center for Disease Control and Prevention, 97 Huaian East Road, Yuhua District, Shijiazhuang, 050021, China. sunline6666@sina.com.&lt;br /&gt;&lt;searchLink fieldCode=&quot;AU&quot; term=&quot;%22Zhao+C%22&quot;&gt;Zhao C&lt;/searchLink&gt;; Hebei Province Center for Disease Control and Prevention, 97 Huaian East Road, Yuhua District, Shijiazhuang, 050021, China. zhaocuiying906@sina.com.";

		expect(await parseXML(authorField)).toEqual([
			[
				{
					field: "AU",
					term: '"Chen S"',
					value: "Chen S",
				},
				"Hebei Province Center for Disease Control and Prevention, 97 Huaian East Road, Yuhua District, Shijiazhuang, 050021, China. hebeicdc2013@sina.com.",
			],
			[
				{
					field: "AU",
					term: '"Zhao H"',
					value: "Zhao H",
				},
				"Hebei Province Center for Disease Control and Prevention, 97 Huaian East Road, Yuhua District, Shijiazhuang, 050021, China. sunline6666@sina.com.",
			],
			[
				{
					field: "AU",
					term: '"Zhao C"',
					value: "Zhao C",
				},
				"Hebei Province Center for Disease Control and Prevention, 97 Huaian East Road, Yuhua District, Shijiazhuang, 050021, China. zhaocuiying906@sina.com.",
			],
		]);
	});

	describe("parseXMLObject", () => {
		it("should return value if it is a string", () => {
			expect(parseXMLObject("hello")).toEqual("hello");
		});

		it('should return $attrs.term, $attrs.fieldcode as field and $test as value if $name is "searchlink"', () => {
			expect(
				parseXMLObject({
					$name: "searchlink",
					$text: "search label",
					$attrs: {
						term: "search term",
						fieldcode: "field code",
					},
				}),
			).toEqual({
				value: "search label",
				term: "search term",
				field: "field code",
			});
		});

		it("should discard use term as value if no $ text", () => {
			expect(
				parseXMLObject({
					$name: "searchlink",
					$attrs: {
						term: "search term",
						fieldcode: "field code",
					},
				}),
			).toEqual({
				value: "search term",
				term: "search term",
				field: "field code",
			});
		});

		it("should return {indice: $text} if $name is relatesto", () => {
			expect(
				parseXMLObject({
					$name: "relatesto",
					$text: "indice value",
				}),
			).toEqual({
				indice: "indice value",
			});
		});

		it("should return $text if $name is i", () => {
			expect(
				parseXMLObject({
					$name: "i",
					$text: "tag value",
				}),
			).toEqual("tag value");
		});

		it('should return $attrs.term, $attrs.fieldcode as field and $test as value if $name is "externallink"', () => {
			expect(
				parseXMLObject({
					$name: "externallink",
					$text: "link label",
					$attrs: {
						term: "link url",
					},
				}),
			).toEqual({
				value: "link label",
				url: "link url",
			});
		});

		it('should return $attrs.term, $attrs.fieldcode as field and $test as value if $name is "link"', () => {
			expect(
				parseXMLObject({
					$name: "link",
					$text: "link label",
					$attrs: {
						linkterm: "link url",
					},
				}),
			).toEqual({
				value: "link label",
				url: "link url",
			});
		});

		it("should parse inline-formula", () => {
			expect(
				parseXMLObject({
					$name: "inline-formula",
					"tex-math": {
						$attrs: {
							notation: "LaTeX",
						},
						$text: "$(1,s)$",
					},
				}),
			).toEqual({
				notation: "LaTeX",
				value: "(1,s)",
			});
		});
	});

	describe("smartConcat", () => {
		it("should add value to array", () => {
			expect(smartConcat([{ item: 1 }], "new value")).toEqual([
				{ item: 1 },
				"new value",
			]);
		});

		it("should not add value to array if it is falsy", () => {
			expect(smartConcat([{ item: 1 }], null)).toEqual([{ item: 1 }]);
			expect(smartConcat([{ item: 1 }], undefined)).toEqual([{ item: 1 }]);
			expect(smartConcat([{ item: 1 }], "")).toEqual([{ item: 1 }]);
			expect(smartConcat([{ item: 1 }], 0)).toEqual([{ item: 1 }]);
		});

		it("should join value with array last item if both are string", () => {
			expect(smartConcat([{ item: 1 }, "join"], "us")).toEqual([
				{ item: 1 },
				"join us",
			]);
		});
	});

	describe("parseXMLLine", () => {
		it("should return object with value extracted from string", async () => {
			expect(
				await parseXMLLine(
					' first value <searchLink fieldCode="field" term="term">searchable value</searchLink><relatesTo>indice</relatesTo> last value ',
				),
			).toEqual([
				"first value",
				{
					term: "term",
					field: "field",
					value: "searchable value",
				},
				{
					indice: "indice",
				},
				"last value",
			]);
		});

		it("should return object with value extracted from string when there is only tag", async () => {
			expect(
				await parseXMLLine(
					'<searchLink fieldCode="AR" term="%22Bhat%2C+Nisha%22">Bhat, Nisha</searchLink><relatesTo>1</relatesTo>',
				),
			).toEqual([
				{
					term: '"Bhat, Nisha"',
					field: "AR",
					value: "Bhat, Nisha",
				},
				{
					indice: "1",
				},
			]);
		});

		it("should return passed value if there is no tag", async () => {
			expect(await parseXMLLine(" value ")).toEqual("value");
		});

		it("should return lastValue and indice extracted from string if there is no searchLink tag but one relatesTo tag", async () => {
			expect(await parseXMLLine("<relatesTo>indice</relatesTo> after")).toEqual(
				[
					{
						indice: "indice",
					},
					"after",
				],
			);
		});

		it("should use parseLabelValue if it start with <i>", async () => {
			expect(await parseXMLLine("<i>label</i>value")).toEqual(["label value"]);
		});

		it("should return given line if parseXMLLine cannot parse xml", async () => {
			expect(
				await parseXMLLine("<relatesTo>indice</relatesTo> after </10 value"),
			).toEqual("<relatesTo>indice</relatesTo> after </10 value");
		});
	});
});
