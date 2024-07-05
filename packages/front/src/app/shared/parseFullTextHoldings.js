const PRESENT = Symbol("PRESENT");
const CALENDAR = Symbol("CALENDAR");

const isAfter = (a, b) => {
	if (a.year > b.year) {
		return true;
	}

	if (a.year < b.year) {
		return false;
	}

	if (a.month > b.month) {
		return true;
	}

	if (a.month < b.month) {
		return false;
	}

	if (a.day > b.day) {
		return true;
	}

	return false;
};

const isBefore = (a, b) => !isAfter(a, b);

function parseCoverageDate(date) {
	return {
		day: Number.parseInt(date.day, 10),
		month: Number.parseInt(date.month, 10),
		year: Number.parseInt(date.year, 10),
	};
}

function parseEmbargoValue(embargo) {
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

function computeCalendarData(holding) {
	if (!holding.coverage) {
		return {
			end: {
				day: 1,
				month: 1,
				year: -9999,
			},
			start: {
				day: 31,
				month: 12,
				year: 9999,
			},
		};
	}

	const start = parseCoverageDate(holding.coverage[0].start);
	const endValue = parseCoverageDate(holding.coverage[0].end);
	const end = endValue.year === 9999 ? PRESENT : endValue;
	return {
		end,
		start,
		...(end === PRESENT &&
			holding.embargo && { embargo: parseEmbargoValue(holding.embargo) }),
	};
}

function shouldKeepAOverBWhenPresent(a, b) {
	const aCalendar = a[CALENDAR];
	const bCalendar = b[CALENDAR];

	if (bCalendar.end !== PRESENT && aCalendar.end === PRESENT) {
		return true;
	}

	if (bCalendar.end === PRESENT && aCalendar.end !== PRESENT) {
		return false;
	}

	if (bCalendar.end === PRESENT && aCalendar.end === PRESENT) {
		if (bCalendar.embargo && aCalendar.embargo === undefined) {
			if (isAfter(bCalendar.start, aCalendar.start)) {
				return true;
			}
		}

		if (bCalendar.embargo === undefined && aCalendar.embargo) {
			return false;
		}

		if (bCalendar.embargo === undefined && aCalendar.embargo === undefined) {
			if (isAfter(bCalendar.start, aCalendar.start)) {
				return true;
			}
			return false;
		}

		return aCalendar.embargo < bCalendar.embargo;
	}

	return false;
}

function parseFullTextHoldings(fullTextHoldings = []) {
	return fullTextHoldings
		.sort((a, b) => {
			if (a.url?.includes("bib.cnrs.fr")) return 1;
			if (b.url?.includes("bib.cnrs.fr")) return -1;
			return 0;
		})
		.map((d) => ({
			...d,
			[CALENDAR]: computeCalendarData(d),
		}))
		.filter((holding, index, self) => {
			return (
				index ===
				self.findIndex(
					(d) =>
						JSON.stringify(d[CALENDAR]) === JSON.stringify(holding[CALENDAR]),
				)
			);
		})
		.filter((holding, index, self) => {
			const holdingsWithSameStartDate = self.filter(
				(d, i) =>
					JSON.stringify(d[CALENDAR].start) ===
						JSON.stringify(holding[CALENDAR].start) && i !== index,
			);
			return !holdingsWithSameStartDate.find((d) => {
				if (shouldKeepAOverBWhenPresent(d, holding)) {
					return true;
				}

				if (isAfter(d[CALENDAR].end, holding[CALENDAR].end)) {
					return true;
				}

				return false;
			});
		})
		.filter((holding, index, self) => {
			const holdingsWithSameEndDate = self.filter(
				(d, i) =>
					JSON.stringify(d[CALENDAR].end) ===
						JSON.stringify(holding[CALENDAR].end) && i !== index,
			);
			return !holdingsWithSameEndDate.find((d) => {
				if (shouldKeepAOverBWhenPresent(d, holding)) {
					return true;
				}
				return false;
			});
		})
		.filter((holding, index, self) => {
			const holdingsWithSameEndDate = self.filter(
				(d, i) =>
					JSON.stringify(d[CALENDAR].end) ===
						JSON.stringify(holding[CALENDAR].end) && i !== index,
			);
			return !holdingsWithSameEndDate.find((d) => {
				if (shouldKeepAOverBWhenPresent(d, holding)) {
					return true;
				}
				if (
					isBefore(d[CALENDAR].start, holding[CALENDAR].start) &&
					d[CALENDAR].end !== PRESENT &&
					holding[CALENDAR].end !== PRESENT
				) {
					return true;
				}
				return false;
			});
		})
		.filter((holding, index, self) => {
			const isWrappedByOtherHoldingDateRange = self.find((d, i) => {
				const isOlder =
					isAfter(d[CALENDAR].end, holding[CALENDAR].end) ||
					(d[CALENDAR].end === PRESENT && holding[CALENDAR].end !== PRESENT);
				return (
					isBefore(d[CALENDAR].start, holding[CALENDAR].start) &&
					isOlder &&
					i !== index
				);
			});
			return !isWrappedByOtherHoldingDateRange;
		})
		.map((d) => {
			const { [CALENDAR]: _, ...rest } = d;
			return rest;
		});
}

export default parseFullTextHoldings;
