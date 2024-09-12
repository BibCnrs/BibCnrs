import { describe, expect, it } from "vitest";
import { getOneNewsPerDomains } from "./testNews.service";

describe("Front TestNewsServices", () => {
	describe("getOneNewsPerDomains", () => {
		it("return one news by domains preserving the news from order", () => {
			const result = getOneNewsPerDomains(
				["first", "sixth", "third"],
				[
					{
						id: "6",
						from: new Date("01/01/2015"),
						tests_news_community: [{ community: { name: "sixth" } }],
					},
					{
						id: "5",
						from: new Date("01/01/2014"),
						tests_news_community: [{ community: { name: "fifth" } }],
					},
					{
						id: "4",
						from: new Date("01/01/2013"),
						tests_news_community: [{ community: { name: "fourth" } }],
					},
					{
						id: "3",
						from: new Date("01/01/2012"),
						tests_news_community: [{ community: { name: "third" } }],
					},
					{
						id: "2",
						from: new Date("01/01/2011"),
						tests_news_community: [{ community: { name: "second" } }],
					},
					{
						id: "1",
						from: new Date("01/01/2010"),
						tests_news_community: [{ community: { name: "first" } }],
					},
				],
			);
			expect(result).toEqual([
				{
					id: "6",
					from: new Date("01/01/2015"),
					communities: ["sixth"],
				},
				{
					id: "3",
					from: new Date("01/01/2012"),
					communities: ["third"],
				},
				{
					id: "1",
					from: new Date("01/01/2010"),
					communities: ["first"],
				},
			]);
		});

		it("return only the 3 most recent news for 3 different domain", () => {
			const result = getOneNewsPerDomains(
				["first", "second", "third", "fourth", "fifth", "sixth"],
				[
					{
						id: "7",
						from: new Date("01/01/2016"),
						tests_news_community: [{ community: { name: "sixth" } }],
					},
					{
						id: "6",
						from: new Date("01/01/2015"),
						tests_news_community: [{ community: { name: "sixth" } }],
					},
					{
						id: "5",
						from: new Date("01/01/2014"),
						tests_news_community: [{ community: { name: "fifth" } }],
					},
					{
						id: "4",
						from: new Date("01/01/2013"),
						tests_news_community: [{ community: { name: "fourth" } }],
					},
					{
						id: "3",
						from: new Date("01/01/2012"),
						tests_news_community: [{ community: { name: "third" } }],
					},
					{
						id: "2",
						from: new Date("01/01/2011"),
						tests_news_community: [{ community: { name: "second" } }],
					},
					{
						id: "1",
						from: new Date("01/01/2010"),
						tests_news_community: [{ community: { name: "first" } }],
					},
				],
			);
			expect(result).toEqual([
				{
					id: "7",
					from: new Date("01/01/2016"),
					communities: ["sixth"],
				},
				{
					id: "5",
					from: new Date("01/01/2014"),
					communities: ["fifth"],
				},
				{
					id: "4",
					from: new Date("01/01/2013"),
					communities: ["fourth"],
				},
			]);
		});

		it("should return one news per domain taking with no multi domain news filling for two domains", () => {
			const result = getOneNewsPerDomains(
				["first", "second"],
				[
					{
						id: "3",
						from: new Date("01/01/2012"),
						tests_news_community: [{ community: { name: "second" } }],
					},
					{
						id: "2",
						from: new Date("01/01/2011"),
						tests_news_community: [
							{ community: { name: "first" } },
							{ community: { name: "second" } },
						],
					},
					{
						id: "1",
						from: new Date("01/01/2010"),
						tests_news_community: [{ community: { name: "first" } }],
					},
				],
			);
			expect(result).toEqual([
				{
					id: "3",
					from: new Date("01/01/2012"),
					communities: ["second"],
				},
				{
					id: "2",
					from: new Date("01/01/2011"),
					communities: ["first", "second"],
				},
			]);
		});

		it("should return most recent news for a given domain", () => {
			const result = getOneNewsPerDomains(
				["first"],
				[
					{
						id: "3",
						from: new Date("01/01/2012"),
						tests_news_community: [{ community: { name: "first" } }],
					},
					{
						id: "2",
						from: new Date("01/01/2011"),
						tests_news_community: [{ community: { name: "first" } }],
					},
					{
						id: "1",
						from: new Date("01/01/2010"),
						tests_news_community: [{ community: { name: "first" } }],
					},
				],
			);
			expect(result).toEqual([
				{
					id: "3",
					from: new Date("01/01/2012"),
					communities: ["first"],
				},
			]);
		});
	});
});
