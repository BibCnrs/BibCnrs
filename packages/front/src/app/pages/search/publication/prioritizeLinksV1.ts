import {
	type Link,
	calculateCoverageEndWithEmbargo,
	compareEndCouvertureWhenCouvertureDifferent,
	compareEndCouvertureWhenCouvertureIsSame,
	compareStartDates,
	isCoverageIdentical,
	linkHasEndCouverture,
} from "./prioritizeLinksCommons";

export function getPrioritizedLink_v1(links: Link[]): Link[] {
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
			nextLink = links[i + 2];
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
