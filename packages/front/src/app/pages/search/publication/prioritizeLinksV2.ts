import {
	type Link,
	calculateCoverageEndWithEmbargo,
	getCouvertureDuration,
	getStartDate,
	haveAllLinksSameCoverageEnd,
} from "./prioritizeLinksCommons";

function prioritizeLinksWithSameCoverageEnd(links: Link[]) {
	let prioritizedLink = links[0];

	for (let i = 1; i < links.length; i++) {
		const firstLinkCoverageDuration = getCouvertureDuration(prioritizedLink);
		const secondLinkCoverageDuration = getCouvertureDuration(links[i]);

		if (firstLinkCoverageDuration === secondLinkCoverageDuration) {
			if (prioritizedLink.url.includes("doaj.org")) {
				continue;
			}

			if (links[i].url.includes("doaj.org")) {
				prioritizedLink = links[i];
				continue;
			}

			// We return the first link ordered by URL
			if (prioritizedLink.url.localeCompare(links[i].url) > 0) {
				prioritizedLink = links[i];
			}

			continue;
		}

		if (firstLinkCoverageDuration < secondLinkCoverageDuration) {
			prioritizedLink = links[i];
		}
	}

	return [prioritizedLink];
}

function prioritizeLinksWithDifferentCoverageEnd(links: Link[]) {
	const prioritizedLinks = [links[0]];

	outer: for (let i = 1; i < links.length; i++) {
		const currentLink = links[i];
		const currentLinkStartDate = getStartDate(currentLink.coverage[0]);
		const currentLinkEndDate = calculateCoverageEndWithEmbargo(
			currentLink.coverage[0],
			currentLink.embargo,
		);

		for (let j = 0; j < prioritizedLinks.length; j++) {
			const currentPrioritizedLink = prioritizedLinks[j];
			const currentPrioritizedLinkStartDate = getStartDate(
				currentPrioritizedLink.coverage[0],
			);
			const currentPrioritizedLinkEndDate = calculateCoverageEndWithEmbargo(
				currentPrioritizedLink.coverage[0],
				currentPrioritizedLink.embargo,
			);

			// Prioritized link includes the current link, skipping
			if (
				currentPrioritizedLinkStartDate <= currentLinkStartDate &&
				currentPrioritizedLinkEndDate >= currentLinkEndDate
			) {
				continue outer;
			}

			// Current link includes the prioritized link, updating the prioritized link
			if (
				currentLinkStartDate <= currentPrioritizedLinkStartDate &&
				currentLinkEndDate >= currentPrioritizedLinkEndDate
			) {
				prioritizedLinks[j] = currentLink;
				continue outer;
			}
		}

		prioritizedLinks.push(currentLink);
	}

	return prioritizedLinks;
}

export function getPrioritizedLink_v2(links: Link[]) {
	if (links.length < 2) {
		return links;
	}

	if (haveAllLinksSameCoverageEnd(links)) {
		return prioritizeLinksWithSameCoverageEnd(links);
	}

	return prioritizeLinksWithDifferentCoverageEnd(links);
}
