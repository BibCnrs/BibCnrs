import { describe, expect, it } from "vitest";
import type { Link } from "./prioritizeLinksCommons";
import {
	linkPresent,
	linkPresentWithEmbargo_doaj,
	linkPresentWithEmbargo_one,
	linkPresentWithEmbargo_two,
} from "./prioritizeLinksCommons.testdata";
import {
	_getPriorityLinkWhenSameCoverageEnd,
	_getPriorityLinksWhenDifferentCoverageEnd,
	getPrioritizedLink_v2,
} from "./prioritizeLinksV2";

it("should return the link array if less than two links are present", () => {
	expect(getPrioritizedLink_v2([linkPresent])).toStrictEqual([linkPresent]);
	expect(getPrioritizedLink_v2([])).toStrictEqual([]);
});

describe("getPriorityLinkWhenSameCoverageEnd", () => {
	it("should return an empty array when array is empty", () => {
		expect(_getPriorityLinkWhenSameCoverageEnd([])).toStrictEqual([]);
	});

	it("should return prioritized link when there is only one link in array", () => {
		expect(_getPriorityLinkWhenSameCoverageEnd([linkPresent])).toStrictEqual([
			linkPresent,
		]);
	});

	it("should prioritize dominant links when coverage duration is not the same", () => {
		const linkWithGreaterCoverage = {
			...linkPresentWithEmbargo_one,
			embargo: null,
		};
		const links = [linkPresent, linkWithGreaterCoverage];
		expect(_getPriorityLinkWhenSameCoverageEnd(links)).toStrictEqual([
			linkWithGreaterCoverage,
		]);
	});

	it("should prioritize doaj links when coverage duration is not the same if any link comes from doaj", () => {
		const links = [linkPresentWithEmbargo_one, linkPresentWithEmbargo_doaj];
		expect(_getPriorityLinkWhenSameCoverageEnd(links)).toStrictEqual([
			linkPresentWithEmbargo_doaj,
		]);
	});

	it("should prioritize first links when  coverage duration is not the same", () => {
		const links = [linkPresentWithEmbargo_one, linkPresentWithEmbargo_two];
		expect(_getPriorityLinkWhenSameCoverageEnd(links)).toStrictEqual([
			linkPresentWithEmbargo_one,
		]);
	});
});

describe("getPriorityLinksWhenDifferentCoverageEnd", () => {
	it("should group links with identical coverage and handle a third with different coverage", () => {
	const linkA: Link = {
		...linkPresent,
		coverage: [
			{
				start: { year: "2020", month: "01", day: "01" },
				end: { year: "2022", month: "12", day: "31" },
			},
		],
		embargo: null,
	};

	const linkB: Link = {
		...linkPresent,
		coverage: [
			{
				start: { year: "2020", month: "01", day: "01" },
				end: { year: "2022", month: "12", day: "31" },
			},
		],
		embargo: null,
	};

	const linkC: Link = {
		...linkPresent,
		coverage: [
			{
				start: { year: "2021", month: "01", day: "01" },
				end: { year: "2023", month: "12", day: "31" },
			},
		],
		embargo: null,
	};

	const result = _getPriorityLinksWhenDifferentCoverageEnd([linkA, linkB, linkC]);

	expect(result.length).toBe(2);
	expect(result).toEqual(expect.arrayContaining([linkA, linkC]));
});

	it("should return an empty array when array is empty", () => {
		expect(_getPriorityLinksWhenDifferentCoverageEnd([])).toStrictEqual([]);
	});

	it("should return prioritized link when there is only one link in array", () => {
		expect(
			_getPriorityLinksWhenDifferentCoverageEnd([linkPresent]),
		).toStrictEqual([linkPresent]);
	});
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
			_getPriorityLinksWhenDifferentCoverageEnd([
				linkPresentWithLesserCoverage,
				linkPresent,
			]),
		).toStrictEqual([linkPresentWithLesserCoverage, linkPresent]);
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
			_getPriorityLinksWhenDifferentCoverageEnd([
				linkPresentWithLesserCoverage,
				linkPresent,
				linkPresentWithOverlappingCoverage,
			]),
		).toStrictEqual([
			linkPresentWithLesserCoverage,
			linkPresent,
			linkPresentWithOverlappingCoverage,
		]);
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
			_getPriorityLinksWhenDifferentCoverageEnd([
				linkPresentWithLesserCoverage,
				linkPresent,
				linkPresentWithNoOverlappingCoverage,
			]),
		).toStrictEqual([
			linkPresentWithLesserCoverage,
			linkPresent,
			linkPresentWithNoOverlappingCoverage,
		]);
	});
});

describe("getPrioritizedLink_v2", () => {
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
			).toStrictEqual([linkPresentWithLesserCoverage, linkPresent]);
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
			).toStrictEqual([
				linkPresentWithLesserCoverage,
				linkPresent,
				linkPresentWithOverlappingCoverage,
			]);
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
			).toStrictEqual([
				linkPresentWithLesserCoverage,
				linkPresent,
				linkPresentWithNoOverlappingCoverage,
			]);
		});
	});
});
