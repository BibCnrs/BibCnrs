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
	_isCoverageIncludedInOtherLink,
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

	it("should support links without coverage", () => {
		const links = [linkPresentWithEmbargo_one, linkPresentWithEmbargo_two];
		expect(_getPriorityLinkWhenSameCoverageEnd(links)).toStrictEqual([
			linkPresentWithEmbargo_one,
		]);
	});
});

describe("isCoverageIncludedInOtherLink", () => {
	it("should return included when other link includes link", () => {
		expect(
			_isCoverageIncludedInOtherLink(
				{
					coverage: [
						{
							start: {
								month: "01",
								day: "01",
								year: "1995",
							},
							end: {
								month: "12",
								day: "31",
								year: "2001",
							},
						},
					],
				},
				{
					coverage: [
						{
							start: {
								month: "01",
								day: "01",
								year: "1995",
							},
							end: {
								month: "12",
								day: "31",
								year: "9999",
							},
						},
					],
				},
			),
		).toBe("included");

		expect(
			_isCoverageIncludedInOtherLink(
				{
					coverage: [
						{
							start: {
								month: "01",
								day: "01",
								year: "1996",
							},
							end: {
								month: "12",
								day: "31",
								year: "9999",
							},
						},
					],
				},
				{
					coverage: [
						{
							start: {
								month: "01",
								day: "01",
								year: "1995",
							},
							end: {
								month: "12",
								day: "31",
								year: "9999",
							},
						},
					],
				},
			),
		).toBe("included");

		expect(
			_isCoverageIncludedInOtherLink(
				{
					coverage: [
						{
							start: {
								month: "01",
								day: "01",
								year: "1996",
							},
							end: {
								month: "12",
								day: "31",
								year: "2001",
							},
						},
					],
				},
				{
					coverage: [
						{
							start: {
								month: "01",
								day: "01",
								year: "1995",
							},
							end: {
								month: "12",
								day: "31",
								year: "9999",
							},
						},
					],
				},
			),
		).toBe("included");
	});

	it("should return overlap if link does not have coverage", () => {
		expect(
			_isCoverageIncludedInOtherLink(
				{},
				{
					coverage: [
						{
							start: {
								month: "01",
								day: "01",
								year: "1995",
							},
							end: {
								month: "12",
								day: "31",
								year: "2001",
							},
						},
					],
				},
			),
		).toBe("overlap");
	});

	it("should return overlap if other link does not have coverage", () => {
		expect(
			_isCoverageIncludedInOtherLink(
				{
					coverage: [
						{
							start: {
								month: "01",
								day: "01",
								year: "1995",
							},
							end: {
								month: "12",
								day: "31",
								year: "2001",
							},
						},
					],
				},
				{},
			),
		).toBe("overlap");
	});

	it("should return same when both have same coverage", () => {
		expect(
			_isCoverageIncludedInOtherLink(
				{
					coverage: [
						{
							start: {
								month: "01",
								day: "01",
								year: "1995",
							},
							end: {
								month: "12",
								day: "31",
								year: "9999",
							},
						},
					],
				},
				{
					coverage: [
						{
							start: {
								month: "01",
								day: "01",
								year: "1995",
							},
							end: {
								month: "12",
								day: "31",
								year: "9999",
							},
						},
					],
				},
			),
		).toBe("same");
	});

	it("should return overlap when links overlaps", () => {
		expect(
			_isCoverageIncludedInOtherLink(
				{
					coverage: [
						{
							start: {
								month: "01",
								day: "01",
								year: "1995",
							},
							end: {
								month: "12",
								day: "31",
								year: "2020",
							},
						},
					],
				},
				{
					coverage: [
						{
							start: {
								month: "01",
								day: "01",
								year: "1998",
							},
							end: {
								month: "12",
								day: "31",
								year: "2024",
							},
						},
					],
				},
			),
		).toBe("overlap");
	});

	it("should return overlap when other link does not include link", () => {
		expect(
			_isCoverageIncludedInOtherLink(
				{
					coverage: [
						{
							start: {
								month: "01",
								day: "01",
								year: "1995",
							},
							end: {
								month: "12",
								day: "31",
								year: "9999",
							},
						},
					],
				},
				{
					coverage: [
						{
							start: {
								month: "01",
								day: "01",
								year: "1995",
							},
							end: {
								month: "12",
								day: "31",
								year: "2001",
							},
						},
					],
				},
			),
		).toBe("overlap");
	});

	it("should return overlap when both do not have coverage", () => {
		expect(_isCoverageIncludedInOtherLink({}, {})).toBe("overlap");
	});
});

describe("getPriorityLinksWhenDifferentCoverageEnd", () => {
	it("should return an empty array when array is empty", () => {
		expect(_getPriorityLinksWhenDifferentCoverageEnd([])).toStrictEqual([]);
	});

	it("should return prioritized link when there is only one link in array", () => {
		expect(
			_getPriorityLinksWhenDifferentCoverageEnd([linkPresent]),
		).toStrictEqual([linkPresent]);
	});

	it("should support links without coverage", () => {
		const links = [
			{
				url: "https://insb.bib.cnrs.fr/login?url=https://www.sciencedirect.com/science/journal/00954470",
				name: "ScienceDirect Freedom Collection (COUPERIN)",
				isCurrent: true,
			},
			{
				url: "https://insb.bib.cnrs.fr/login?url=http://www.sciencedirect.com/science/journal/00954470",
				name: "ScienceDirect - Journals (ISTEX - Licences Nationales PFEDITEUR)",
				isCurrent: false,
				coverage: [
					{
						start: {
							month: "01",
							day: "01",
							year: "1995",
						},
						end: {
							month: "12",
							day: "31",
							year: "2001",
						},
					},
				],
			},
		];
		expect(_getPriorityLinksWhenDifferentCoverageEnd(links)).toStrictEqual(
			links,
		);
	});

	it("should return a single link which coverage includes each others", () => {
		const links = [
			{
				url: "https://insb.bib.cnrs.fr/login?url=https://www.sciencedirect.com/science/journal/00954470",
				name: "ScienceDirect Freedom Collection (COUPERIN)",
				isCurrent: true,
				coverage: [
					{
						start: {
							month: "01",
							day: "01",
							year: "1995",
						},
						end: {
							month: "12",
							day: "31",
							year: "9999",
						},
					},
				],
			},
			{
				url: "https://insb.bib.cnrs.fr/login?url=http://www.sciencedirect.com/science/journal/00954470",
				name: "ScienceDirect - Journals (ISTEX - Licences Nationales PFEDITEUR)",
				isCurrent: false,
				coverage: [
					{
						start: {
							month: "01",
							day: "01",
							year: "1995",
						},
						end: {
							month: "12",
							day: "31",
							year: "2001",
						},
					},
				],
			},
		];
		expect(_getPriorityLinksWhenDifferentCoverageEnd(links)).toStrictEqual([
			links[0],
		]);
	});

	it("should return the links that have coverage overlaping", () => {
		const linkPresentWithLesserCoverage: Link = {
			...linkPresent,
			coverage: [
				{
					start: linkPresent.coverage[0].start,
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
			_getPriorityLinksWhenDifferentCoverageEnd([
				linkPresentWithLesserCoverage,
				linkPresent,
				linkPresentWithNoOverlappingCoverage,
			]),
		).toStrictEqual([linkPresent, linkPresentWithNoOverlappingCoverage]);
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

	it("should support links without coverage", () => {
		const links = [
			{
				url: "https://insb.bib.cnrs.fr/login?url=https://www.sciencedirect.com/science/journal/00954470",
				name: "ScienceDirect Freedom Collection (COUPERIN)",
				isCurrent: true,
			},
			{
				url: "https://insb.bib.cnrs.fr/login?url=http://www.sciencedirect.com/science/journal/00954470",
				name: "ScienceDirect - Journals (ISTEX - Licences Nationales PFEDITEUR)",
				isCurrent: false,
				coverage: [
					{
						start: {
							month: "01",
							day: "01",
							year: "1995",
						},
						end: {
							month: "12",
							day: "31",
							year: "2001",
						},
					},
				],
			},
		];
		expect(getPrioritizedLink_v2(links)).toStrictEqual(links);
	});
});
