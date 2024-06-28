import flattenDeep from "lodash.flattendeep";

const HAL_REGEX = /https?:\/\/(?:www\.)?(hal|tel)(shs)?(-.*)?\.(.*)\.(.*)/;
const EXTRACT_DOI_REGEX = /https?:\/\/(?:www\.)?(?:.*)?\.doi\.org\/(.*)/;

export const fieldLabel = {
	ALL: "Tout",
	AU: "Auteur",
	AR: "Auteur exact",
	TI: "Titre",
	SU: "Sujet",
	SO: "Source",
	AB: "Résumé",
	IS: "ISSN",
	IB: "ISBN",
	PB: "Editeur",
};

const text = {
	fullTextLinks: "Accès à l'article",
	pdfLinks: "Accès au pdf",
	urls: "Urls",
	html: "html",
	noLinks: "Pas d'accès pour cet article.",
	linksLoading: "Chargement des liens",
	"Access URL": "URL d'accès",
	"Other URLs": "Autres URLs",
	Availability: "Disponibilité",
};

const displayTerm = {
	fullText: "Texte intégral",
	peerReviewedArticle: "Relu par un comité de lecture",
	publicationDate: "Date de publication",
	Journal: "Journal",
	SubjectEDS: "Mots clé",
	Publisher: "Editeur",
	Publication: "Publication",
	Language: "Langue",
	Category: "Categorie",
	ContentProvider: "Fournisseur de contenu",
};

export function parseArticleLinks(articleLinks, currentGate) {
	const { fullTextLinks = [], pdfLinks = [], urls = [], html } = articleLinks;

	if (
		(!fullTextLinks || !fullTextLinks.length) &&
		(!pdfLinks || !pdfLinks.length) &&
		(!urls || !urls.length) &&
		!html
	) {
		return null;
	}
	const htmlLists = html
		? [
				{
					name: "html",
					url: `data:text/html;charset=utf-8,${encodeURIComponent(html)}`,
					download: true,
				},
			]
		: [];

	return []
		.concat(
			fullTextLinks.map((link) => ({
				...link,
				icon: "th-list",
			})),
		)
		.concat(
			pdfLinks.map(({ url }) => ({
				url: url.match(currentGate)
					? url
					: `http://${currentGate}.bib.cnrs.fr/login?url=${url}`,
				name: text.pdfLinks,
			})),
		)
		.concat(
			urls.map((link) => ({
				...link,
				name: text[link.name] || link.name,
			})),
		)
		.concat(htmlLists);
}

const guessSid = (url) => {
	if (url.indexOf("http://arxiv.org") === 0) {
		return "arxiv";
	}

	if (url.indexOf("https://doaj.org") === 0) {
		return "doaj";
	}

	if (HAL_REGEX.test(url)) {
		return "hal";
	}

	return null;
};

const getLinksText = (links) =>
	links.map(({ name, url }) => `${name} - ${url}`).join("\n");

export const getRecordText = (record, gate) => {
	const { id, doi, title, publicationType, authors, source, articleLinks } =
		record;
	const type = publicationType ? `[${publicationType}]` : "";
	const links = parseArticleLinks(articleLinks, gate);

	return `${id}. ${title} ${type}

${
	authors
		? authors.length > 5
			? authors.slice(0, 5).join("; ").concat("...")
			: authors.join("; ")
		: ""
}

${source || ""} ${doi ? `DOI : ${doi}` : ""}

${links ? getLinksText(links) : `Pas d'accès pour cet article.`}`;
};

export const getLimitersText = (limiters) => {
	const keys = Object.keys(limiters).filter((key) => !!limiters[key]);
	if (!keys.length) {
		return "";
	}

	return `Limites : ${searchDataToString(keys, limiters)}`;
};

export const getFacetsText = (facets) => {
	const keys = Object.keys(facets).filter((key) => !!facets[key]);
	if (!keys.length) {
		return "";
	}

	return `Facettes : ${searchDataToString(keys, facets)}`;
};

function proxify(apiUrl, url, doi, domain, name, user_id) {
	if (!url) {
		return null;
	}
	let sid = guessSid(url);

	if (!sid) {
		if (/open access/i.test(name)) {
			sid = "oa";
		} else {
			return url;
		}
	}

	return `${apiUrl}/oa_database?url=${encodeURIComponent(
		url,
	)}&sid=${sid}&domaine=${domain}&doi=${doi}&user_id=${user_id}`;
}

export function OALink({ apiUrl, url, doi, domain, name, user_id }) {
	let normalizedDoi = typeof doi === "string" ? doi : null;
	let OA = false;
	if (Array.isArray(doi)) {
		const { url } = flattenDeep(doi)[0];

		if (url) {
			normalizedDoi = url.match(EXTRACT_DOI_REGEX)[1];
		}
	}

	if (/open access/i.test(name) || HAL_REGEX.test(url)) {
		OA = true;
	}

	return {
		url: proxify(apiUrl, url, normalizedDoi, domain, name, user_id),
		OA,
	};
}

export const getLimitersHtml = (limiters) => {
	const keys = Object.keys(limiters).filter((key) => !!limiters[key]);
	if (!keys.length) {
		return "";
	}

	return `<dt style="font-weight: bold;">Limites</dt>
    <dd style="flex: 9;">${searchDataToString(keys, limiters)}</dd>`;
};

export const getFacetsHtml = (facets) => {
	const keys = Object.keys(facets).filter((key) => !!facets[key]);
	if (!keys.length) {
		return "";
	}

	return `<dt style="font-weight: bold;">Facettes</dt>
    <dd style="flex: 9;">${searchDataToString(keys, facets)}</dd>`;
};

const getDisplay = (key, value) => {
	if (value === null || typeof value === "undefined") {
		return;
	}
	switch (key) {
		case "fullText":
			return displayTerm[key];
		case "peerReviewedArticle":
			return displayTerm[key];
		case "publicationDate":
			if (!value.from || !value.to) {
				return;
			}
			return `${displayTerm[key]}: ${value.from}/${value.to}`;
		case "Journal":
			return `${displayTerm[key]}: ${value}`;
		case "SourceType":
			return `${displayTerm[key]}: ${value.join(", ")}`;
		case "SubjectEDS":
			return `${displayTerm[key]}: ${value.join(", ")}`;
		case "Publisher":
			return `${displayTerm[key]}: ${value.join(", ")}`;
		case "Publication":
			return `${displayTerm[key]}: ${value.join(", ")}`;
		case "Language":
			return `${displayTerm[key]}: ${value.join(", ")}`;
		case "Category":
			return `${displayTerm[key]}: ${value.join(", ")}`;
		case "ContentProvider":
			return `${displayTerm[key]}: ${value.join(", ")}`;
		default:
			return key + JSON.stringify(value);
	}
};

const searchDataToString = (keys, data) => {
	return keys
		.map((key) => {
			return getDisplay(key, data[key]);
		})
		.filter((v) => !!v)
		.join("; ");
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getResultsIdentifiers = (result: any) => {
	return result?.SearchResult?.Data?.Records?.map?.(
		({ Header: { DbId, An } }) => ({
			dbId: DbId,
			an: An,
		}),
	);
};
