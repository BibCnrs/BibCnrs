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
	const prioritizedLink = links.reduce<Link>((prioritizedLink, currentLink) => {
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

	return prioritizedLink ? [prioritizedLink] : [];
}

function getCoverageTypeWithOtherLink(
	link: Pick<Link, "coverage" | "embargo">,
	otherLink: Pick<Link, "coverage" | "embargo">,
) {
	if (!link.coverage?.at(0) || !otherLink.coverage) {
		return "overlap";
	}

	const linkStartDate = getStartDate(link.coverage[0]).getTime();
	const linkEndDate = calculateCoverageEndWithEmbargo(
		link.coverage[0],
		link.embargo,
	).getTime();

	const otherLinkStartDate = getStartDate(otherLink.coverage[0]).getTime();
	const otherLinkEndDate = calculateCoverageEndWithEmbargo(
		otherLink.coverage[0],
		otherLink.embargo,
	).getTime();

	if (
		linkStartDate === otherLinkStartDate &&
		linkEndDate === otherLinkEndDate
	) {
		return "same";
	}

	if (otherLinkStartDate <= linkStartDate && otherLinkEndDate >= linkEndDate) {
		return "included";
	}
	return "overlap";
}

function getPriorityLinksWhenDifferentCoverageEnd(links: Link[]) {
	if (links.length < 2) {
		return links;
	}

	const coveragesame = (link: Link) => {
		if (!link.coverage?.[0]) return "no-coverage";
		const start = getStartDate(link.coverage[0]).getTime();
		const end = calculateCoverageEndWithEmbargo(
			link.coverage[0],
			link.embargo,
		).getTime();
		return `${start}-${end}`;
	};

	const groupLink = new Map<string, Link[]>();
	for (const link of links) {
		// On génère une clé correspondant à la période de couverture du lien.
		const key = coveragesame(link);

		// Si cette clé n'existe pas encore dans la Map, on initialise un tableau vide pour cette clé.
		if (!groupLink.has(key)) groupLink.set(key, []);

		// On ajoute le lien au groupe correspondant dans la Map.
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		groupLink.get(key)!.push(link);
	}

	const reducedLinks = Array.from(groupLink.values()).flatMap((group) =>
		group.length > 1 ? getPriorityLinkWhenSameCoverageEnd(group) : group,
	);

	const linksWithoutEmbargo = reducedLinks.filter((link) => !link.embargo);
	const linksWithEmbargo = reducedLinks.filter((link) => link.embargo);

	if (linksWithoutEmbargo.length > 0 && linksWithEmbargo.length > 0) {
		const noEmbargo = getStartDate(
			linksWithoutEmbargo[0].coverage?.[0],
		).getTime();
		const embargo = getStartDate(linksWithEmbargo[0].coverage?.[0]).getTime();

		return noEmbargo === embargo
			? linksWithoutEmbargo
			: [linksWithoutEmbargo[0], linksWithEmbargo[0]];
	}

	if (linksWithoutEmbargo.length > 0) {
		return linksWithoutEmbargo;
	}
	if (linksWithEmbargo.length > 0) {
		const minEmbargo = Math.min(
			...linksWithEmbargo.map((link) =>
				link.embargo.unit === "Year"
					? link.embargo.value * 12
					: link.embargo.value,
			),
		);
		return linksWithEmbargo.filter(
			(link) =>
				(link.embargo.unit === "Year"
					? link.embargo.value * 12
					: link.embargo.value) === minEmbargo,
		);
	}

	return reducedLinks.filter((currentLink, currentLinkIndex, allLinks) => {
		if (!currentLink.coverage?.length) {
			return true;
		}

		for (
			let otherLinkIndex = 0;
			otherLinkIndex < allLinks.length;
			otherLinkIndex++
		) {
			const otherLink = allLinks[otherLinkIndex];
			const coverageType = getCoverageTypeWithOtherLink(currentLink, otherLink);

			if (coverageType === "included") {
				return false;
			}

			if (coverageType === "same" && currentLinkIndex < otherLinkIndex) {
				return false;
			}
		}

		return true;
	});
}

export function getPrioritizedLink_v2(links: Link[]) {
	if (haveAllLinksSameCoverageEnd(links)) {
		return getPriorityLinkWhenSameCoverageEnd(links);
	}

	return getPriorityLinksWhenDifferentCoverageEnd(links);
}

/**
 * @deprecated This is for testing purposes only
 */
export const _getPriorityLinkWhenSameCoverageEnd =
	getPriorityLinkWhenSameCoverageEnd;

/**
 * @deprecated This is for testing purposes only
 */
export const _getPriorityLinksWhenDifferentCoverageEnd =
	getPriorityLinksWhenDifferentCoverageEnd;

/**
 * @deprecated This is for testing purposes only
 */
export const _isCoverageIncludedInOtherLink = getCoverageTypeWithOtherLink;
