import { expect, test } from "vitest";
import {
	linkPast,
	linkPresent,
	linkPresentWithEmbargo_one,
	linkPresentWithEmbargo_two,
} from "./prioritizeLinksCommons.testdata";
import { getPrioritizedLink_v1 } from "./prioritizeLinksV1";

test("with 3 links", () => {
	const links = [
		linkPresentWithEmbargo_one,
		linkPresentWithEmbargo_two,
		linkPast,
	];
	const result = getPrioritizedLink_v1(links);
	expect(result).toContain(linkPresentWithEmbargo_one);
	expect(result).not.toContain(linkPast);
	expect(result).not.toContain(linkPresentWithEmbargo_two);
});

test("with 2 links", () => {
	const links = [linkPresent, linkPast];
	const result = getPrioritizedLink_v1(links);
	expect(result).toContain(linkPresent);
	expect(result).toContain(linkPast);
});
