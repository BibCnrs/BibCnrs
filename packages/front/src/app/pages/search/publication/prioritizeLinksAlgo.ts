export interface Embargo {
	value: number;
	unit: "Month" | "Year";
}

export interface Coverage {
	start: {
		month: string;
		day: string;
		year: string;
	};
	end: {
		month: string;
		day: string;
		year: string;
	};
}

export interface Link {
	url: string;
	name: string;
	isCurrent: boolean;
	embargo?: Embargo;
	coverage: Coverage[];
}

// ##############
// ##  Utils  ##
// ##############
function calculateCoverageEndWithEmbargo(
	coverage: Coverage,
	embargo?: Embargo,
): Date {
	if (!embargo) {
		return new Date(
			Number.parseInt(coverage.end.year),
			Number.parseInt(coverage.end.month) - 1,
			Number.parseInt(coverage.end.day),
		);
	}

	const endDate = new Date(
		Number.parseInt(coverage.end.year),
		Number.parseInt(coverage.end.month) - 1,
		Number.parseInt(coverage.end.day),
	);

	const valueEmbargo = parseValueEmbargo(embargo);

	endDate.setDate(endDate.getDate() + valueEmbargo);
	return endDate;
}

function parseValueEmbargo(embargo: Embargo): number {
	const value = embargo.value || 0;
	switch ((embargo.unit || "").toLowerCase()) {
		case "month":
			return value * 30;
		case "year":
			return value * 365;
		default:
			return value;
	}
}

function isCoverageIdentical(link_one: Link, link_two: Link): boolean {
	const coverage1 = link_one.coverage[0];
	const coverage2 = link_two.coverage[0];

	const endCoverage1 = calculateCoverageEndWithEmbargo(
		coverage1,
		link_one.embargo,
	);
	const endCoverage2 = calculateCoverageEndWithEmbargo(
		coverage2,
		link_two.embargo,
	);

	return endCoverage1.getTime() === endCoverage2.getTime();
}

function isPresentLink(link: Link): boolean {
	return link.coverage[0].end.year === "9999" && !link.embargo;
}

function isPresentLinkWithEmbargo(link: Link): boolean {
	return link.coverage[0].end.year === "9999" && !!link.embargo;
}

function isDateLink(link: Link): boolean {
	// if date is past
	if (link.coverage[0].end.year !== "9999" && link.embargo) {
		const endDate = calculateCoverageEndWithEmbargo(
			link.coverage[0],
			link.embargo,
		);
		return endDate < new Date();
	}

	return link.coverage[0].end.year !== "9999" && !link.embargo;
}

function findPresentLink(firstLink: Link, secondLink: Link): Link {
	if (isPresentLink(firstLink)) {
		return firstLink;
	}
	if (isPresentLink(secondLink)) {
		return secondLink;
	}
}

function findEmbargoLink(firstLink: Link, secondLink: Link): Link {
	if (isPresentLinkWithEmbargo(firstLink)) {
		return firstLink;
	}
	if (isPresentLinkWithEmbargo(secondLink)) {
		return secondLink;
	}
}

function findDateLink(firstLink: Link, secondLink: Link): Link {
	if (isDateLink(firstLink)) {
		return firstLink;
	}
	if (isDateLink(secondLink)) {
		return secondLink;
	}
}

function compareStartDates(coverage1, coverage2) {
	const createDate = (coverage) =>
		new Date(
			coverage.start.year,
			Number.parseInt(coverage.start.month) - 1,
			Number.parseInt(coverage.start.day),
		);

	return createDate(coverage1).getTime() === createDate(coverage2).getTime();
}

function getStartDate(coverage) {
	return new Date(
		Number.parseInt(coverage.start.year),
		Number.parseInt(coverage.start.month) - 1,
		Number.parseInt(coverage.start.day),
	);
}

function linkHasEndCouverture(link: Link): boolean {
	return link.coverage.some((coverage) => coverage.end);
}

// ##################
// ##  Step Logic  ##
// ##################

// Step I.1
// Step I.1.1, I.1.2, I.1.3 are the same. We compare the start of Couverture. If date is same, we return the oldest one. Else we return the first link.
function compareEndCouvertureWhenCouvertureIsSame(
	firstLink: Link,
	secondLink: Link,
): Link {
	// Use the compareStartDates function to compare the start dates of the coverages
	const isStartSame = compareStartDates(
		firstLink.coverage[0],
		secondLink.coverage[0],
	);

	// If the start dates are the same, return the first link
	if (isStartSame) {
		return firstLink;
	}

	// Otherwise, compare the start dates to determine which link is older and return it
	const startCoverage1 = new Date(
		Number.parseInt(firstLink.coverage[0].start.year),
		Number.parseInt(firstLink.coverage[0].start.month) - 1,
		Number.parseInt(firstLink.coverage[0].start.day),
	);
	const startCoverage2 = new Date(
		Number.parseInt(secondLink.coverage[0].start.year),
		Number.parseInt(secondLink.coverage[0].start.month) - 1,
		Number.parseInt(secondLink.coverage[0].start.day),
	);

	return startCoverage1.getTime() < startCoverage2.getTime()
		? firstLink
		: secondLink;
}

// Step I.2
function compareEndCouvertureWhenCouvertureDifferent(
	firstLink: Link,
	secondLink: Link,
): Link[] {
	// Step I.2.1
	if (
		(isPresentLink(firstLink) && isPresentLinkWithEmbargo(secondLink)) ||
		(isPresentLink(secondLink) && isPresentLinkWithEmbargo(firstLink))
	) {
		const presentLink = findPresentLink(firstLink, secondLink);
		const embargoLink = findEmbargoLink(firstLink, secondLink);

		const sameStartDate = compareStartDates(
			presentLink.coverage[0],
			embargoLink.coverage[0],
		);

		if (sameStartDate) {
			return [presentLink];
		}

		const presentStartDate = getStartDate(presentLink.coverage[0]);
		const embargoStartDate = getStartDate(embargoLink.coverage[0]);

		// Si presentStartDate est le plus ancien, on retourne presentLink. Sinon les deux
		return presentStartDate.getTime() < embargoStartDate.getTime()
			? [presentLink]
			: [presentLink, embargoLink];
	}

	// Step I.2.2
	if (
		(isDateLink(firstLink) && isPresentLink(secondLink)) ||
		(isDateLink(secondLink) && isPresentLink(firstLink))
	) {
		const presentLink = findPresentLink(firstLink, secondLink);
		const dateLink = findDateLink(firstLink, secondLink);
		const sameStartDate = compareStartDates(
			presentLink.coverage[0],
			dateLink.coverage[0],
		);

		if (sameStartDate) {
			return [presentLink];
		}

		const presentStartDate = getStartDate(presentLink.coverage[0]);
		const dateStartDate = getStartDate(dateLink.coverage[0]);

		// Si presentStartDate est le plus ancien, on retourne presentLink. Sinon les deux
		return presentStartDate.getTime() < dateStartDate.getTime()
			? [presentLink]
			: [presentLink, dateLink];
	}

	// Step I.2.3
	if (
		isPresentLinkWithEmbargo(firstLink) &&
		isPresentLinkWithEmbargo(secondLink)
	) {
		// return link with smallest embargo
		const embargo1 = parseValueEmbargo(firstLink.embargo);
		const embargo2 = parseValueEmbargo(secondLink.embargo);

		const sameStartDate = compareStartDates(
			firstLink.coverage[0],
			secondLink.coverage[0],
		);

		if (sameStartDate) {
			return embargo1 < embargo2 ? [firstLink] : [secondLink];
		}

		const firstStartDate = getStartDate(firstLink.coverage[0]);
		const secondStartDate = getStartDate(secondLink.coverage[0]);

		// Si firstStartDate est le plus ancien, on retourne firstLink. Sinon les deux
		return firstStartDate.getTime() < secondStartDate.getTime()
			? [firstLink]
			: [firstLink, secondLink];
	}

	// Step I.2.4
	if (
		(isPresentLinkWithEmbargo(firstLink) && isDateLink(secondLink)) ||
		(isPresentLinkWithEmbargo(secondLink) && isDateLink(firstLink))
	) {
		const embargoLink = findEmbargoLink(firstLink, secondLink);
		const dateLink = findDateLink(firstLink, secondLink);

		const embargoDate = calculateCoverageEndWithEmbargo(
			embargoLink.coverage[0],
			embargoLink.embargo,
		);
		const date = calculateCoverageEndWithEmbargo(
			dateLink.coverage[0],
			dateLink.embargo,
		);

		const sameStartDate = compareStartDates(
			firstLink.coverage[0],
			secondLink.coverage[0],
		);

		if (sameStartDate) {
			return embargoDate > date ? [embargoLink] : [dateLink];
		}

		const firstStartDate = getStartDate(firstLink.coverage[0]);
		const secondStartDate = getStartDate(secondLink.coverage[0]);

		// Si firstStartDate est le plus ancien, on retourne firstLink. Sinon les deux
		return firstStartDate.getTime() < secondStartDate.getTime()
			? [firstLink]
			: [firstLink, secondLink];
	}

	// Step I.2.5
	if (isDateLink(firstLink) && isDateLink(secondLink)) {
		const firstDate = calculateCoverageEndWithEmbargo(
			firstLink.coverage[0],
			firstLink.embargo,
		);
		const secondDate = calculateCoverageEndWithEmbargo(
			secondLink.coverage[0],
			secondLink.embargo,
		);

		const sameStartDate = compareStartDates(
			firstLink.coverage[0],
			secondLink.coverage[0],
		);

		if (sameStartDate) {
			return firstDate > secondDate ? [firstLink] : [secondLink];
		}

		const firstStartDate = getStartDate(firstLink.coverage[0]);
		const secondStartDate = getStartDate(secondLink.coverage[0]);

		// Si firstStartDate est le plus ancien, on retourne firstLink. Sinon les deux
		return firstStartDate.getTime() < secondStartDate.getTime()
			? [firstLink]
			: [firstLink, secondLink];
	}
}

export function getPrioritizedLink(links: Link[]): Link[] {
	if (links.length < 2) {
		return links;
	}

	const prioritizedLinks = [];
	let currentLink = links[0];
	let nextLink = links[1];

	for (let i = 1; i < links.length; i++) {
		let selectedLinks = null;
		if (!nextLink) {
			nextLink = links[i + 1];
			continue;
		}

		if (!currentLink) {
			currentLink = nextLink;
			nextLink = links[i + 1];
			continue;
		}

		if (currentLink === nextLink) {
			nextLink = links[i + 1];
			continue;
		}

		// Step I: Compare links based on the end of Couverture (coverage + embargo)
		if (linkHasEndCouverture(currentLink) && linkHasEndCouverture(nextLink)) {
			// Step I.1 if link has same Couverture
			if (isCoverageIdentical(currentLink, nextLink)) {
				selectedLinks = [
					compareEndCouvertureWhenCouvertureIsSame(currentLink, nextLink),
				];
				// Step I.2 if link has different Couverture
			} else {
				selectedLinks = compareEndCouvertureWhenCouvertureDifferent(
					currentLink,
					nextLink,
				);
			}
		} else {
			// Step II: Compare links based on the start of Couverture
			const startDateComparison = compareStartDates(
				currentLink.coverage[0],
				nextLink.coverage[0],
			);

			if (startDateComparison) {
				const endDate1 = calculateCoverageEndWithEmbargo(
					currentLink.coverage[0],
					currentLink.embargo,
				);
				const endDate2 = calculateCoverageEndWithEmbargo(
					nextLink.coverage[0],
					nextLink.embargo,
				);

				// Step II.1.1
				if (endDate1.getTime() === endDate2.getTime()) {
					selectedLinks = [currentLink];
				} else {
					// Step II.1.2
					selectedLinks = compareEndCouvertureWhenCouvertureDifferent(
						currentLink,
						nextLink,
					);
				}
			} else {
				// Step II.2
				const endDate1 = calculateCoverageEndWithEmbargo(
					currentLink.coverage[0],
					currentLink.embargo,
				);
				const endDate2 = calculateCoverageEndWithEmbargo(
					nextLink.coverage[0],
					nextLink.embargo,
				);

				// Step II.2.1
				if (endDate1.getTime() === endDate2.getTime()) {
					selectedLinks = [
						compareEndCouvertureWhenCouvertureIsSame(currentLink, nextLink),
					];
				} else {
					// Step II.2.2
					selectedLinks = compareEndCouvertureWhenCouvertureDifferent(
						currentLink,
						nextLink,
					);
				}
			}
		}

		if (selectedLinks.length === 1) {
			currentLink = selectedLinks[0];
			nextLink = links[i + 1];

			// Check if the link already exists in the prioritizedLinks array before pushing
			if (
				!prioritizedLinks.includes(selectedLinks[0]) &&
				i === links.length - 1
			) {
				prioritizedLinks.push(selectedLinks[0]);
			}
		} else {
			currentLink = selectedLinks[1];
			nextLink = links[i + 1];
			// Check if the first selected link exists in the prioritizedLinks array before pushing
			if (!prioritizedLinks.includes(selectedLinks[0])) {
				prioritizedLinks.push(selectedLinks[0]);
			}
			// Check if the second selected link exists in the prioritizedLinks array before pushing
			if (!prioritizedLinks.includes(selectedLinks[1])) {
				prioritizedLinks.push(selectedLinks[1]);
			}
		}
	}
	return prioritizedLinks;
}

// Export the function for testing
export {
	calculateCoverageEndWithEmbargo,
	parseValueEmbargo,
	isCoverageIdentical,
	isPresentLink,
	isPresentLinkWithEmbargo,
	isDateLink,
	findPresentLink,
	findEmbargoLink,
	findDateLink,
	compareStartDates,
	linkHasEndCouverture,
	compareEndCouvertureWhenCouvertureIsSame,
	compareEndCouvertureWhenCouvertureDifferent,
};
