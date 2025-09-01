import { decoder, defaultToNull } from "./search.utils";

export function extractTargetFromItems<T>(
	attr: string,
	value: T,
	items: T[],
	target = "Data",
) {
	return items
		.filter((item) => item[attr] === value)
		.map((item) => item[target]);
}

export const extractTitle = defaultToNull(
	decoder(function extractTitle(result) {
		return extractTargetFromItems(
			"Type",
			"main",
			result.RecordInfo.BibRecord.BibEntity.Titles,
			"TitleFull",
		).join(", ");
	}),
);

export const extractISSNOnline = defaultToNull(function extractISSN(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	result: any,
) {
	return extractTargetFromItems(
		"Type",
		"issn-online",
		result.RecordInfo.BibRecord.BibEntity.Identifiers,
		"Value",
	);
});

export const extractISSNPrint = defaultToNull(function extractISSN(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	result: any,
) {
	return extractTargetFromItems(
		"Type",
		"issn-print",
		result.RecordInfo.BibRecord.BibEntity.Identifiers,
		"Value",
	);
});

export const extractISBNOnline = defaultToNull(function extractISBN(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	result: any,
) {
	return extractTargetFromItems(
		"Type",
		"isbn-online",
		result.RecordInfo.BibRecord.BibEntity.Identifiers,
		"Value",
	);
});

export const extractISBNPrint = defaultToNull(function extractISBN(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	result: any,
) {
	return extractTargetFromItems(
		"Type",
		"isbn-print",
		result.RecordInfo.BibRecord.BibEntity.Identifiers,
		"Value",
	);
});

export function parseDate(rawDate: string) {
	if (!rawDate) {
		return null;
	}
	if (rawDate === "now") {
		return {
			year: "9999",
		};
	}
	return {
		month: rawDate.substring(4, 6),
		day: rawDate.substring(6, 8),
		year: rawDate.substring(0, 4),
	};
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function parseFullTextHolding(fullTextHolding: any) {
	const coverage = fullTextHolding.CoverageDates
		? fullTextHolding.CoverageDates.sort(
				({ end: a }, { end: b }) =>
					Number.parseInt(b, 10) - Number.parseInt(a, 10),

				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			).map((coverageDate: any) => ({
				start: parseDate(coverageDate.StartDate),
				end: parseDate(coverageDate.EndDate),
				startIndex: coverageDate.StartDate,
				endIndex: coverageDate.EndDate,
			}))
		: null;

	return {
		url: fullTextHolding.URL,
		name: fullTextHolding.Name,
		coverage: coverage
			? coverage
			: [
					{
						start: { month: "01", day: "01", year: "1789" },
						end: { month: "12", day: "31", year: "9999" },
						StartDate: "17890101",
						EndDate: "99991231",
					},
				],
		isCurrent: coverage?.[0]?.end?.year === "9999",
		embargo: fullTextHolding.Embargo
			? {
					value: fullTextHolding.Embargo || 0,
					unit: fullTextHolding.EmbargoUnit,
				}
			: undefined,
	};
}

function getUnitValue(unit: string) {
	switch (unit) {
		case "Year":
			return 365;
		case "Month":
			return 30;
		case "Week":
			return 7;
		case "Day":
			return 1;
	}
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function extractFullTextHoldings(result: any) {
	if (!result.FullTextHoldings) {
		return [];
	}

	return result.FullTextHoldings.map(parseFullTextHolding)
		.sort((a, b) => {
			const startA = a?.coverage?.[0]?.startIndex ?? "0";
			const startB = a?.coverage?.[0]?.startIndex ?? "0";

			return startB - startA;
		})
		.sort((a, b) => {
			const embargoA = a?.embargo ?? {
				value: 0,
				unit: "Year",
			};
			const aValue = embargoA.value * getUnitValue(embargoA.unit);
			const embargoB = b?.embargo ?? {
				value: 0,
				unit: "Year",
			};
			const bValue = embargoB.value * getUnitValue(embargoB.unit);

			return aValue - bValue;
		})
		.sort((a, b) => {
			const endA = a?.coverage?.[0]?.endIndex ?? "0";
			const endB = b?.coverage?.[0]?.endIndex ?? "0";

			return endB - endA;
		})
		.map(({ coverage, ...holding }) => ({
			...holding,
			coverage: coverage
				? // biome-ignore lint/suspicious/noExplicitAny: <explanation>
					coverage.map(({ startIndex, endIndex, ...data }: any) => data)
				: undefined,
		}));
}
