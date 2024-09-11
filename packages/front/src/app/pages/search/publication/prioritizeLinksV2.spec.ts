import { describe, expect, it } from "vitest";
import type { Link } from "./prioritizeLinksCommons";
import {
	linkPresent,
	linkPresentWithEmbargo_doaj,
	linkPresentWithEmbargo_one,
	linkPresentWithEmbargo_two,
} from "./prioritizeLinksCommons.testdata";
import { getPrioritizedLink_v2 } from "./prioritizeLinksV2";

it("should return the link array if less than two links are present", () => {
	expect(getPrioritizedLink_v2([linkPresent])).toStrictEqual([linkPresent]);
	expect(getPrioritizedLink_v2([])).toStrictEqual([]);
});

describe("coverage end is the same", () => {
	it("should prioritize dominant links when coverage duration is not the same", () => {
		const linkWithGreaterCoverage = {
			...linkPresentWithEmbargo_one,
			embargo: null,
		};
		const links = [linkPresent, linkWithGreaterCoverage];
		expect(getPrioritizedLink_v2(links)).toStrictEqual([
			linkWithGreaterCoverage,
		]);
	});

	it("should prioritize doaj links when coverage duration is not the same if any link comes from doaj", () => {
		const links = [linkPresentWithEmbargo_one, linkPresentWithEmbargo_doaj];
		expect(getPrioritizedLink_v2(links)).toStrictEqual([
			linkPresentWithEmbargo_doaj,
		]);
	});

	it("should prioritize first links when  coverage duration is not the same", () => {
		const links = [linkPresentWithEmbargo_one, linkPresentWithEmbargo_two];
		expect(getPrioritizedLink_v2(links)).toStrictEqual([
			linkPresentWithEmbargo_one,
		]);
	});
});

describe("coverage end is not the same", () => {
	it("should return a single link which coverage includes each others", () => {
		const linkPresentWithLesserCoverage = {
			...linkPresent,
			coverage: [
				{
					...linkPresent.coverage[0],
					end: {
						month: "12",
						day: "31",
						year: "2025",
					},
				},
			],
		};
		expect(
			getPrioritizedLink_v2([linkPresentWithLesserCoverage, linkPresent]),
		).toStrictEqual([linkPresent]);
	});

	it("should return the links that have coverage overlaping", () => {
		const linkPresentWithLesserCoverage: Link = {
			...linkPresent,
			coverage: [
				{
					...linkPresent.coverage[0],
					end: {
						month: "12",
						day: "31",
						year: "2025",
					},
				},
			],
		};

		const linkPresentWithOverlappingCoverage = {
			...linkPresent,
			coverage: [
				{
					start: {
						month: "01",
						day: "01",
						year: "2021",
					},
					end: {
						month: "01",
						day: "01",
						year: "2025",
					},
				},
			],
		};
		expect(
			getPrioritizedLink_v2([
				linkPresentWithLesserCoverage,
				linkPresent,
				linkPresentWithOverlappingCoverage,
			]),
		).toStrictEqual([linkPresent, linkPresentWithOverlappingCoverage]);
	});

	it("should return the links that have no coverage overlaping", () => {
		const linkPresentWithLesserCoverage: Link = {
			...linkPresent,
			coverage: [
				{
					...linkPresent.coverage[0],
					end: {
						month: "12",
						day: "31",
						year: "2025",
					},
				},
			],
		};

		const linkPresentWithNoOverlappingCoverage = {
			...linkPresent,
			coverage: [
				{
					start: {
						month: "01",
						day: "01",
						year: "2021",
					},
					end: {
						month: "01",
						day: "01",
						year: "2022",
					},
				},
			],
		};
		expect(
			getPrioritizedLink_v2([
				linkPresentWithLesserCoverage,
				linkPresent,
				linkPresentWithNoOverlappingCoverage,
			]),
		).toStrictEqual([linkPresent, linkPresentWithNoOverlappingCoverage]);
	});
});
