import { describe, expect, test } from "vitest";
import {
	calculateCoverageEndWithEmbargo,
	compareEndCouvertureWhenCouvertureDifferent,
	compareEndCouvertureWhenCouvertureIsSame,
	compareStartDates,
	findDateLink,
	findEmbargoLink,
	findPresentLink,
	haveAllLinksSameCoverageEnd,
	isCoverageIdentical,
	isDateLink,
	isPresentLink,
	isPresentLinkWithEmbargo,
	linkHasEndCouverture,
	parseValueEmbargo,
} from "./prioritizeLinksCommons";
import {
	linkPast,
	linkPastWithEmbargo,
	linkPresent,
	linkPresentWithEmbargo_doaj,
	linkPresentWithEmbargo_one,
	linkPresentWithEmbargo_two,
} from "./prioritizeLinksCommons.testdata";

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
});

test("haveAllLinksSameCoverageEnd", () => {
	expect(haveAllLinksSameCoverageEnd([])).toBe(true);
	expect(haveAllLinksSameCoverageEnd([linkPresent])).toBe(true);
	expect(haveAllLinksSameCoverageEnd([linkPresent, linkPresent])).toBe(true);
	expect(
		haveAllLinksSameCoverageEnd([
			linkPresentWithEmbargo_one,
			linkPresentWithEmbargo_two,
			linkPresentWithEmbargo_doaj,
		]),
	).toBe(true);
	expect(haveAllLinksSameCoverageEnd([linkPresent, linkPast])).toBe(false);
});
