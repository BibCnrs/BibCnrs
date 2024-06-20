import {
	decoder,
	defaultToEmptyArray,
	defaultToEmptyObject,
	defaultToNull,
	parseXML,
	parseXMLArticle,
} from "./search.utils";

export function cleanUrl(url) {
	if (!url) {
		return url;
	}

	const match = url.match(/(http(s)?:.+)/);
	return match ? match[0] : null;
}

export function extractText(
	data: string | { url: string } | Array<{ url: string }>,
) {
	if (!data || typeof data === "string") {
		return cleanUrl(data);
	}

	if (!Array.isArray(data)) {
		return cleanUrl(data.url);
	}

	if (data.length === 1) {
		return extractText(data[0]);
	}

	return extractText(data.find((data) => !!data.url));
}

export const extractTargetFromItems = (attr, value, items, target = "Data") =>
	items
		.filter((item) => item[attr] === value)
		.reduce((_, item) => item[target], null);

export const extractExportLinks = defaultToEmptyObject(
	function extractExportLinks(result) {
		return result.CustomLinks.filter(
			(link) =>
				link.Category === "other" && !link.Url.includes("api.unpaywall"),
		).reduce(
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(result: any, link) => ({
				// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
				...result,
				[link.Name]: link.Url.replace("&amp;", "&"),
			}),
			{},
		);
	},
);

export const extractDOI = defaultToNull((result) => {
	return extractTargetFromItems(
		"Type",
		"doi",
		result.RecordInfo.BibRecord.BibEntity.Identifiers,
		"Value",
	);
});

export const extractTitle = defaultToNull(
	decoder(function extractTitle(result) {
		return extractTargetFromItems(
			"Type",
			"main",
			result.RecordInfo.BibRecord.BibEntity.Titles,
			"TitleFull",
		);
	}),
);

export const extractSource = defaultToNull(
	decoder((result) => {
		return extractTargetFromItems("Name", "TitleSource", result.Items).replace(
			/&lt;.*?&gt;/g,
			"",
		); // remove xml tag if any
	}),
);

export const extractAuthors = defaultToNull(function extractAuthors(result) {
	return result.RecordInfo.BibRecord.BibRelationships.HasContributorRelationships.map(
		(data) => data.PersonEntity.Name.NameFull,
	);
});

export const extractPublicationDate = defaultToNull(
	function extractPublicationDate(result) {
		return result.RecordInfo.BibRecord.BibRelationships.IsPartOfRelationships[0].BibEntity.Dates.filter(
			(data) => data.Type === "published",
		).reduce((result, data) => {
			const date = new Date(`${data.M}/${data.D}/${data.Y}`);
			if (date.toString() === "Invalid Date") {
				throw new Error("Invalid Date");
			}

			return date;
		}, null);
	},
);

export const extractLanguages = defaultToNull(
	function extractLanguages(result) {
		return result.RecordInfo.BibRecord.BibEntity.Languages.map(
			(data) => data.Text,
		);
	},
);

export const extractDatabase = defaultToNull(function extractDatabase(result) {
	return result.Header.DbLabel || result.Header.DbId;
});

export const extractSubjects = defaultToNull(function extractSubjects(result) {
	return result.RecordInfo.BibRecord.BibEntity.Subjects.map(
		(data) => data.SubjectFull,
	);
});

export const extractPublicationType = defaultToNull(
	function extractPublicationType(result) {
		if (result.Header.PubType) {
			return result.Header.PubType;
		}
		if (result.Header.PubId && result.Header.PubId !== "unknown") {
			return result.Header.PubId;
		}

		if (result.Header.DbId === "edsndl") {
			return "Dissertation/ Thesis";
		}

		return extractTargetFromItems("Name", "TypePub", result.Items);
	},
);

export const extractAbstract = defaultToNull(
	decoder(function extractAbstract(result) {
		return extractTargetFromItems("Name", "Abstract", result.Items);
	}),
);

export const extractFullTextLinks = defaultToEmptyArray(
	function extractFullTextLinks(result) {
		return result.FullText.CustomLinks.filter(
			({ Category }) => Category === "fullText",
		).map((link) => ({
			url: cleanUrl(link.Url.replace(/&amp;/g, "&")),
			name: link.Text,
		}));
	},
);

export const extractPdfLinks = defaultToEmptyArray((result) => {
	return result.FullText.Links.filter(
		({ Type, Url }) => Type === "pdflink" && !!Url,
	).map(({ Url }) => ({ url: cleanUrl(Url) }));
});

export function extractHtml(result) {
	if (
		!result.FullText ||
		!result.FullText.Text ||
		result.FullText.Text.Availability !== "1" ||
		!result.FullText.Text.Value
	) {
		return null;
	}

	return parseXMLArticle(result.FullText.Text.Value, extractTitle(result));
}

export async function parseItems(items = []) {
	return await Promise.all(
		items
			.filter((item) => item.Name && item.Data)
			.map(async (item) => {
				return {
					name: item.Name,
					label: item.Label,
					value: await parseXML(item.Data).catch(() => null),
				};
			}),
	);
}
