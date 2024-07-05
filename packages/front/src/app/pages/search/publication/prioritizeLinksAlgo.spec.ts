import { describe, expect, test } from "vitest";
import {
	type Link,
	calculateCoverageEndWithEmbargo,
	compareEndCouvertureWhenCouvertureDifferent,
	compareEndCouvertureWhenCouvertureIsSame,
	compareStartDates,
	findDateLink,
	findEmbargoLink,
	findPresentLink,
	getPrioritizedLink,
	isCoverageIdentical,
	isDateLink,
	isPresentLink,
	isPresentLinkWithEmbargo,
	linkHasEndCouverture,
	parseValueEmbargo,
} from "./prioritizeLinksAlgo";

// Sample data for testing
const linkPresentWithEmbargo_one: Link = {
	url: "http://example.com/1",
	name: "Link 1",
	isCurrent: true,
	embargo: {
		value: 6,
		unit: "Month",
	},
	coverage: [
		{
			start: {
				month: "01",
				day: "01",
				year: "2020",
			},
			end: {
				month: "12",
				day: "31",
				year: "9999",
			},
		},
	],
};

const linkPresentWithEmbargo_two: Link = {
	url: "http://example.com/2",
	name: "Link 2",
	isCurrent: true,
	embargo: {
		value: 6,
		unit: "Month",
	},
	coverage: [
		{
			start: {
				month: "01",
				day: "01",
				year: "2020",
			},
			end: {
				month: "12",
				day: "31",
				year: "9999",
			},
		},
	],
};

const linkPast: Link = {
	url: "http://example.com/3",
	name: "Link 3",
	isCurrent: true,
	embargo: null,
	coverage: [
		{
			start: {
				month: "01",
				day: "01",
				year: "2020",
			},
			end: {
				month: "12",
				day: "31",
				year: "2021",
			},
		},
	],
};

const linkPastWithEmbargo: Link = {
	url: "http://example.com/4",
	name: "Link 4",
	isCurrent: true,
	embargo: {
		value: 1,
		unit: "Year",
	},
	coverage: [
		{
			start: {
				month: "01",
				day: "01",
				year: "2020",
			},
			end: {
				month: "12",
				day: "31",
				year: "2025",
			},
		},
	],
};

const linkPresent: Link = {
	url: "http://example.com/4",
	name: "Link 4",
	isCurrent: true,
	coverage: [
		{
			start: {
				month: "01",
				day: "01",
				year: "2020",
			},
			end: {
				month: "12",
				day: "31",
				year: "9999",
			},
		},
	],
};

describe("Utility Functions", () => {
	test("calculateCoverageEndWithEmbargo without embargo", () => {
		const endDate = calculateCoverageEndWithEmbargo(
			linkPresentWithEmbargo_one.coverage[0],
		);
		expect(endDate).toEqual(new Date(9999, 11, 31));
	});

	test("calculateCoverageEndWithEmbargo with embargo", () => {
		const endDate = calculateCoverageEndWithEmbargo(
			linkPastWithEmbargo.coverage[0],
			linkPastWithEmbargo.embargo,
		);
		expect(endDate).toEqual(new Date(2026, 11, 31));
	});

	test("parseValueEmbargo", () => {
		expect(parseValueEmbargo(linkPresentWithEmbargo_one.embargo)).toBe(180); // 6 month = 180 days
		expect(parseValueEmbargo(linkPresentWithEmbargo_two.embargo)).toBe(180); // 6 months = 180 days
		expect(parseValueEmbargo(linkPastWithEmbargo.embargo)).toBe(365); // 1 year = 365 days
	});

	test("isCoverageIdentical", () => {
		expect(
			isCoverageIdentical(
				linkPresentWithEmbargo_one,
				linkPresentWithEmbargo_two,
			),
		).toBe(true);
	});

	test("isPresentLink", () => {
		expect(isPresentLink(linkPast)).toBe(false);
		expect(isPresentLink(linkPresentWithEmbargo_one)).toBe(false); // He has embargo so he is not present
		expect(isPresentLink(linkPresent)).toBe(true);
	});

	test("isPresentLinkWithEmbargo", () => {
		expect(isPresentLinkWithEmbargo(linkPresentWithEmbargo_one)).toBe(true);
		expect(isPresentLinkWithEmbargo(linkPast)).toBe(false);
	});

	test("isDateLink", () => {
		expect(isDateLink(linkPresentWithEmbargo_one)).toBe(false);
		expect(isDateLink(linkPast)).toBe(true);
	});

	test("findPresentLink", () => {
		expect(findPresentLink(linkPresent, linkPast)).toBe(linkPresent);
	});

	test("findEmbargoLink", () => {
		expect(findEmbargoLink(linkPresentWithEmbargo_one, linkPast)).toBe(
			linkPresentWithEmbargo_one,
		);
	});

	test("findDateLink", () => {
		expect(findDateLink(linkPresentWithEmbargo_one, linkPast)).toBe(linkPast);
	});

	test("compareStartDates", () => {
		expect(
			compareStartDates(
				linkPresentWithEmbargo_one.coverage[0],
				linkPresentWithEmbargo_two.coverage[0],
			),
		).toBe(true);
	});

	test("linkHasEndCouverture", () => {
		expect(linkHasEndCouverture(linkPresentWithEmbargo_one)).toBe(true);
		expect(linkHasEndCouverture(linkPast)).toBe(true);
	});
});

describe("Main Logic", () => {
	test("compareEndCouvertureWhenCouvertureIsSame", () => {
		expect(
			compareEndCouvertureWhenCouvertureIsSame(
				linkPresentWithEmbargo_one,
				linkPresentWithEmbargo_two,
			),
		).toBe(linkPresentWithEmbargo_one);
	});

	test("compareEndCouvertureWhenCouvertureDifferent", () => {
		const result = compareEndCouvertureWhenCouvertureDifferent(
			linkPresentWithEmbargo_one,
			linkPast,
		);
		expect(result).toContain(linkPresentWithEmbargo_one);
	});

	test("getPrioritizedLink", () => {
		const links = [
			linkPresentWithEmbargo_one,
			linkPresentWithEmbargo_two,
			linkPast,
		];
		const result = getPrioritizedLink(links);
		expect(result).toContain(linkPresentWithEmbargo_one);
		expect(result).not.toContain(linkPast);
		expect(result).not.toContain(linkPresentWithEmbargo_two);
	});
});
