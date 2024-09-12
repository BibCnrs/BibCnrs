import {
	type Link,
	calculateCoverageEndWithEmbargo,
	getCouvertureDuration,
	getStartDate,
	haveAllLinksSameCoverageEnd,
} from "./prioritizeLinksCommons";

function getLinkWithGreatestCoverage(
	firstLink: Link,
	firstLinkCoverageDuration: number,
	secondLink: Link,
	secondLinkCoverageSuration: number,
) {
	if (firstLinkCoverageDuration < secondLinkCoverageSuration) {
		return secondLink;
	}

	return firstLink;
}

function getPriorityLinkWhenSameCoverageEnd(links: Link[]) {
	return links.reduce<Link>((prioritizedLink, currentLink) => {
		const prioritizedLinkCoverageDuration =
			getCouvertureDuration(prioritizedLink);
		const currentLinkCoverageDuration = getCouvertureDuration(currentLink);

		if (prioritizedLinkCoverageDuration !== currentLinkCoverageDuration) {
			return getLinkWithGreatestCoverage(
				prioritizedLink,
				prioritizedLinkCoverageDuration,
				currentLink,
				currentLinkCoverageDuration,
			);
		}

		if (prioritizedLink.url.includes("doaj.org")) {
			return prioritizedLink;
		}

		if (currentLink.url.includes("doaj.org")) {
			return currentLink;
		}

		// We return the first link ordered by URL
		if (prioritizedLink.url.localeCompare(currentLink.url) > 0) {
			return currentLink;
		}

		return prioritizedLink;
	}, links[0]);
}

function getPriorityLinksWhenDifferentCoverageEnd(links: Link[]) {
	return links.filter((currentLink, currentLinkIndex, allLinks) => {
		const currentLinkStartDate = getStartDate(currentLink.coverage[0]);
		const currentLinkEndDate = calculateCoverageEndWithEmbargo(
			currentLink.coverage[0],
			currentLink.embargo,
		);

		// Check if the current link is included in another link
		return allLinks.some((otherLink, otherLinkIndex) => {
			const otherLinkStartDate = getStartDate(otherLink.coverage[0]);
			const otherLinkEndDate = calculateCoverageEndWithEmbargo(
				otherLink.coverage[0],
				otherLink.embargo,
			);

			if (
				otherLinkStartDate < currentLinkStartDate &&
				otherLinkEndDate > currentLinkEndDate
			) {
				return true;
			}

			// Prioritize first link ordered by index if the coverage is the same
			return currentLinkIndex > otherLinkIndex;
		});
	});
}

export function getPrioritizedLink_v2(links: Link[]) {
	if (links.length < 2) {
		return links;
	}

	if (haveAllLinksSameCoverageEnd(links)) {
		return [getPriorityLinkWhenSameCoverageEnd(links)];
	}

	return getPriorityLinksWhenDifferentCoverageEnd(links);
}
