import type { FacetEntry } from "../../components/page/search/facet/Facet.type";
import { convertFacet, convertPayload } from "../../shared/typeConvertion";
import type {
	ArticleDataType,
	ArticleLinksDataType,
	ArticleResultDataType,
	ArticleRetrieveDataType,
	RetrieveItemDataType,
	RetrieveItemValueDataType,
} from "../../shared/types/data.types";
import type { Institute, Url, Url2 } from "../../shared/types/types";
import { createQuery, environment, json, throwIfNotOk } from "../Environment";
import { addHistory } from "../user/History";

export type ArticlePayLoad = {
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	queries: any[];
	FT?: "Y";
	OA?: "Y";
	RV?: "Y";
	DT1?: string;
	activeFacets?: {
		SourceType?: string[];
		SubjectEDS?: string[];
		Journal?: string[];
		Language?: string[];
		CollectionLibrary?: string[];
		Publisher?: string[];
		ContentProvider?: string[];
	};
	sort?: "date" | "date2" | "relevance";
	resultsPerPage: number;
	currentPage: number;
};

export type OrderByType = "date_asc" | "date_desc" | "relevance";

export type ArticleParam = {
	orderBy: OrderByType;
	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	limiters?: Record<string, any> & {
		fullText?: boolean;
		openAccess?: boolean;
		reviewed?: boolean;
		dateRange?: {
			from: number;
			to: number;
		};
	};
	facets?: Record<
		| string
		| "collection"
		| "journal"
		| "language"
		| "lexile"
		| "provider"
		| "publisher"
		| "source"
		| "subject",
		FacetEntry[]
	>;
};

export const article = async (
	domain: Institute,
	query: string,
	page: number,
	perPage: number,
	saveHistory: boolean,
	param: ArticleParam,
): Promise<ArticleDataType> => {
	// Create payload from params
	const payload: Partial<ArticlePayLoad> = {
		queries: [
			{
				boolean: "AND",
				term: query,
				suggestedTerms: [],
				field: null,
				key: "initial",
			},
		],
	};

	switch (param.orderBy) {
		case "date_asc": {
			payload.sort = "date";
			break;
		}
		case "date_desc": {
			payload.sort = "date2";
			break;
		}
		default: {
			payload.sort = "relevance";
			break;
		}
	}

	payload.currentPage = page;
	payload.resultsPerPage = perPage;

	if (param.limiters) {
		if (param.limiters.fullText) {
			payload.FT = "Y";
		}
		if (param.limiters.openAccess) {
			payload.OA = "Y";
		}
		if (param.limiters.reviewed) {
			payload.RV = "Y";
		}
		if (param.limiters.dateRange) {
			payload.DT1 = `${param.limiters.dateRange.from}-01/${param.limiters.dateRange.to}-01`;
		}
	}

	if (param.facets) {
		payload.activeFacets = {};
		if (param.facets.source) {
			payload.activeFacets.SourceType = convertFacet(param.facets.source);
		}
		if (param.facets.subject) {
			payload.activeFacets.SubjectEDS = convertFacet(param.facets.subject);
		}
		if (param.facets.journal) {
			payload.activeFacets.Journal = convertFacet(param.facets.journal);
		}
		if (param.facets.language) {
			payload.activeFacets.Language = convertFacet(param.facets.language);
		}
		if (param.facets.collection) {
			payload.activeFacets.CollectionLibrary = convertFacet(
				param.facets.collection,
			);
		}
		if (param.facets.publisher) {
			payload.activeFacets.Publisher = convertFacet(param.facets.publisher);
		}
		if (param.facets.provider) {
			payload.activeFacets.ContentProvider = convertFacet(
				param.facets.provider,
			);
		}
	}

	// Call api
	const response: Response = await fetch(
		createQuery(
			environment.get.search.article.replace("{domain}", domain),
			convertPayload(payload),
		),
		{
			credentials: "include",
		},
	);
	throwIfNotOk(response);
	const result = await json<ArticleDataType>(response);
	if (saveHistory) {
		addHistory(payload, param, domain, result).then();
	}
	return result;
};
const HAL_REGEX = /https?:\/\/(?:www\.)?(hal|tel)(shs)?(-.*)?\.(.*)\.(.*)/;
export class ArticleContentGetter {
	private readonly initial: ArticleResultDataType;
	private readonly retrieve: ArticleRetrieveDataType | null;
	constructor(
		initial: ArticleResultDataType,
		retrieve: ArticleRetrieveDataType | null,
	) {
		this.initial = initial;
		this.retrieve = retrieve;
	}

	public isRetrieve() {
		return this.retrieve !== null;
	}

	public getTitle = (): string | null => {
		const retrieveObj = this.getEntry("Title");
		const retrieve = this.getString(retrieveObj);
		if (retrieve) {
			return retrieve;
		}
		if (this.initial.title) {
			return this.initial.title;
		}
		return null;
	};

	public getDOI = (): string | null => {
		const retrieveObj = this.getEntry("DOI");
		const retrieve = this.getString(retrieveObj);
		if (retrieve) {
			return retrieve;
		}
		if (this.initial.doi) {
			return this.initial.doi;
		}
		return null;
	};

	public getSource = (): string | null => {
		const retrieveObj = this.getEntry("TitleSource");
		const retrieve = this.getString(retrieveObj);
		if (retrieve) {
			return retrieve;
		}
		if (this.initial.source) {
			return this.initial.source;
		}
		return null;
	};

	public getPublisher = (): string | null => {
		const retrieveObj = this.getEntry("Publisher");
		const retrieve = this.getString(retrieveObj);
		if (retrieve) {
			return retrieve;
		}
		return null;
	};

	public getAuthors = (): string[] | null => {
		const retrieveObj = this.getEntry("Author", "Authors");
		const retrieve = this.getStringArray(retrieveObj);
		if (retrieve) {
			// merge this.initial.authors and retrieve
			if (this.initial.authors) {
				return [...new Set([...this.initial.authors, ...retrieve])];
			}
		}
		if (this.initial.authors) {
			return this.initial.authors;
		}
		return null;
	};

	public getLanguages = (): string[] | null => {
		const retrieveObj = this.getEntry("Language");
		const retrieve = this.getStringArray(retrieveObj);
		if (retrieve) {
			return retrieve;
		}
		if (this.initial.languages) {
			return this.initial.languages;
		}
		return null;
	};

	public getPublisherURL = (): string[] | null => {
		if (this.retrieve) {
			const urls = this.retrieve.articleLinks.urls.filter(
				(value) => value.name === "Publisher URL",
			);
			if (urls.length > 0) {
				return urls.map((url) => url.url);
			}
		}
		return null;
	};

	public getArticleLinks = (): ArticleLinksDataType => {
		const articleLinks: ArticleLinksDataType = {
			fullTextLinks: [],
			pdfLinks: [],
			urls: [],
		};
		if (this.initial.articleLinks) {
			if (Array.isArray(this.initial.articleLinks.fullTextLinks)) {
				articleLinks.fullTextLinks.push(
					...this.initial.articleLinks.fullTextLinks,
				);
			}
			if (Array.isArray(this.initial.articleLinks.pdfLinks)) {
				articleLinks.pdfLinks.push(...this.initial.articleLinks.pdfLinks);
			}
			if (this.initial.articleLinks.html) {
				articleLinks.html = this.initial.articleLinks.html;
			}
			if (Array.isArray(this.initial.articleLinks.urls)) {
				articleLinks.urls.push(...this.initial.articleLinks.urls);
			}
		}
		if (this.retrieve) {
			if (Array.isArray(this.retrieve.articleLinks.fullTextLinks)) {
				for (const fullTextLink of this.retrieve.articleLinks.fullTextLinks) {
					if (
						articleLinks.fullTextLinks.findIndex(
							(v) => v.name === fullTextLink.name && v.url === fullTextLink.url,
						) < 0
					) {
						articleLinks.fullTextLinks.push(fullTextLink);
					}
				}
			}
			if (Array.isArray(this.retrieve.articleLinks.pdfLinks)) {
				for (const pdfLink of this.retrieve.articleLinks.pdfLinks) {
					if (
						articleLinks.pdfLinks.findIndex(
							(v) => v.name === pdfLink.name && v.url === pdfLink.url,
						) < 0
					) {
						articleLinks.pdfLinks.push(pdfLink);
					}
				}
			}
			if (this.retrieve.articleLinks.html) {
				articleLinks.html = this.retrieve.articleLinks.html;
			}
			if (Array.isArray(this.retrieve.articleLinks.urls)) {
				for (const url of this.retrieve.articleLinks.urls) {
					if (
						articleLinks.urls.findIndex(
							(v) => v.name === url.name && v.url === url.url,
						) < 0
					) {
						articleLinks.urls.push(url);
					}
				}
			}
		}
		articleLinks.fullTextLinks = this.articleLinksNameCleanup(
			articleLinks.fullTextLinks,
		);
		articleLinks.pdfLinks = this.articleLinksNameCleanup(articleLinks.pdfLinks);
		return articleLinks;
	};

	public getHref = (prioritizeFullText?: boolean): Url | null => {
		const articleLinks = this.getArticleLinks();
		if (this.initial.is_linkiq) {
			return articleLinks.fullTextLinks.at(0);
		}

		let openAccess = null;
		const fullText = articleLinks.fullTextLinks.find((d) =>
			/lien\(s\) texte intégral/i.test(d.name),
		);
		const unpaywall = articleLinks.urls.find((d) =>
			/unpaywalleds/i.test(d.name),
		);

		if (fullText && prioritizeFullText) {
			return fullText;
		}

		if (!unpaywall) {
			// BUSINESS RULES: For the moment, we consider that an open access link is a link that contains the words "open access" or "Full Text from ERIC"
			openAccess = articleLinks.fullTextLinks.find((d) =>
				/(accès en ligne en open access|Full Text from ERIC)/i.test(d.name),
			);
		}
		const accessUrl = articleLinks.urls.find((d) =>
			/access url|online access/i.test(d.name),
		);
		const availability = articleLinks.urls.find((d) =>
			/availability/i.test(d.name),
		);
		const pdf = articleLinks.pdfLinks.find((d) => !!d.url);
		const html = articleLinks.html
			? ({ url: `data:${articleLinks.html}` } as Url)
			: null;

		return (
			openAccess ||
			unpaywall ||
			fullText ||
			pdf ||
			accessUrl ||
			availability ||
			html
		);
	};

	public guessSid(url: string) {
		if (url.startsWith("http://arxiv.org/")) {
			return "arxiv";
		}

		if (url.startsWith("https://doaj.org/")) {
			return "doaj";
		}

		if (HAL_REGEX.test(url)) {
			return "hal";
		}

		return null;
	}

	public proxify = (
		urlObj: Url | null,
		domain?: string,
		database = false,
		isLogged = false,
	) => {
		if (!urlObj) {
			return null;
		}
		let { url } = urlObj;
		const { name } = urlObj;
		let sid = this.guessSid(url);

		if (this.initial.is_linkiq) {
			sid = "linkiq";
		}

		if (database) {
			sid = "bdd";
		}

		if (!sid) {
			// BUSINESS RULES: For the moment, we consider that an open access link is a link that contains the words "open access" or "Full Text from ERIC"
			if (/(open access|Full Text from ERIC)/i.test(name)) {
				sid = "oa";
			} else {
				return url;
			}
		}

		let path = "oa";
		if (database && !isLogged) {
			path = "oa_database";
		}

		url = encodeURIComponent(url);
		if (url.includes("ebsco/oa")) {
			return url;
		}

		return `${
			environment.host
		}/ebsco/${path}?url=${url}&sid=${sid}&domaine=${domain}&doi=${this.getDOI()}`;
	};

	public getAN = (): string => this.initial.an;

	public getDBID = (): string => this.initial.dbId;

	public getDatabase = (): string => this.initial.database;

	public getType = (): string => this.initial.publicationType;

	public getId = (): number => this.initial.id;

	public getExportLink = () => this.initial.exportLinks;

	public getPublicationYear = (): string | null => {
		const retrieveObj = this.getEntry("Publication Year");
		const retrieve = this.getString(retrieveObj);
		if (retrieve) {
			return retrieve;
		}
		return null;
	};

	public getAllItems = (): Array<{ label: string; content: string[] }> => {
		if (this.retrieve) {
			const toReturn: Array<{ label: string; content: string[] }> = [];
			this.retrieve.items.forEach((value) => {
				const content = this.getStringArray(
					this.getEntry(value.name, value.label),
				);
				if (content) {
					toReturn.push({
						label: value.label,
						content,
					});
				}
			});
			return toReturn;
		}
		return [];
	};

	public isOpenAccess = (prioritizeFullText?: boolean): boolean => {
		const href = this.getHref(prioritizeFullText);
		if (!href) {
			return false;
		}
		const articleLinks = this.getArticleLinks();
		let openAccess = null;
		const unpaywall = articleLinks.urls.find((d) =>
			/unpaywalleds/i.test(d.name),
		);
		if (!unpaywall) {
			// BUSINESS RULES: For the moment, we consider that an open access link is a link that contains the words "open access" or "Full Text from ERIC"
			openAccess = articleLinks.fullTextLinks.find((d) =>
				/(accès en ligne en open access|Full Text from ERIC)/i.test(d.name),
			);
		}
		const hrefWithIcon = [openAccess, unpaywall].filter(Boolean);
		return (
			hrefWithIcon.some((url) => url && url.url === href.url) ||
			HAL_REGEX.test(href.url)
		);
	};

	public isLinkIq() {
		return this.initial.is_linkiq;
	}

	public getAbstract = (): string | null => {
		const retrieveObj = this.getEntry("Abstract");
		const retrieve = this.getString(retrieveObj);
		if (retrieve) {
			return retrieve;
		}
		if (this.initial.abstract) {
			return this.initial.abstract;
		}

		return null;
	};

	public getPageCount = (): string | null => {
		const retrieveObj = this.getEntry("Pages", "Page Count");
		const retrieve = this.getString(retrieveObj);
		if (retrieve) {
			return retrieve;
		}
		return null;
	};

	public getContributors = (): string[] | null => {
		const retrieveObj = this.getEntry("Author", "Contributors");
		const retrieve = this.getStringArray(retrieveObj);
		if (retrieve) {
			return retrieve;
		}
		return null;
	};

	public getAuthorsWithoutContributors = (): string[] | null => {
		const retrieveObj = this.getEntry("Author", "Authors");
		const retrieve = this.getStringArray(retrieveObj);
		if (retrieve) {
			return retrieve;
		}
		return null;
	};

	public getCollections = (): string[] | null => {
		const retrieveObj = this.getEntry("Subset", "Collection");
		const retrieve = this.getStringArray(retrieveObj);
		if (retrieve) {
			return retrieve;
		}
		return null;
	};

	public getSubjectTerms = (): string[] | null => {
		const retrieveObj = this.getEntry("Subject", "Descriptors");
		const retrieve = this.getStringArray(retrieveObj);
		if (retrieve) {
			return retrieve;
		}
		return null;
	};

	private articleLinksNameCleanup = (urls: Url2[]): Url[] => {
		return urls.map((url: Url2): Url => {
			const name = url.name ?? url.url;
			if (name.length > 130) {
				return {
					...url,
					name: `${name.substring(0, 130)}...`,
				};
			}
			return {
				...url,
				name,
			};
		});
	};

	private getEntry = (
		name: string,
		label?: string,
	): Array<RetrieveItemDataType<RetrieveItemValueDataType>> | null => {
		if (!this.retrieve) {
			return null;
		}
		return this.retrieve.items.filter((value) => {
			const keep = value.name === name;
			if (label) {
				return keep && value.label === label;
			}
			return keep;
		});
	};

	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	private readValue = (value: any) => {
		let tmp = "";
		if (value === null) {
			return tmp;
		}
		if (typeof value === "string") {
			return value;
		}
		// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
		value.forEach((entry: any) => {
			if (typeof entry === "string") {
				tmp += entry;
			}
			if (typeof entry === "object") {
				if (entry.value) {
					tmp += entry.value;
				}
				if (entry.indice) {
					tmp += entry.indice;
				}
			}
		});
		return tmp;
	};

	// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
	private get = (values: any): string[] | string | undefined => {
		if (typeof values === "string") {
			return values;
		}
		if (Array.isArray(values) && !Array.isArray(values[0])) {
			return values.map(this.readValue);
		}
		if (Array.isArray(values) && Array.isArray(values[0])) {
			const formatted: string[] = [];
			// biome-ignore lint/suspicious/noExplicitAny: Need to type after marmelab's mission
			values.forEach((value: any) => {
				formatted.push(this.readValue(value));
			});
			return formatted;
		}
		return undefined;
	};

	private getString = (
		retrieveObj: Array<RetrieveItemDataType<RetrieveItemValueDataType>> | null,
	): string | undefined => {
		if (retrieveObj && retrieveObj.length > 0) {
			const retrieve = this.get(retrieveObj[0].value);
			if (retrieve) {
				if (typeof retrieve === "string") {
					return retrieve;
				}
				return retrieve[0];
			}
		}
		return undefined;
	};

	private getStringArray = (
		retrieveObj: Array<RetrieveItemDataType<RetrieveItemValueDataType>> | null,
	): string[] | undefined => {
		if (retrieveObj && retrieveObj.length > 0) {
			const retrieve = this.get(retrieveObj[0].value);
			if (retrieve) {
				if (typeof retrieve === "string") {
					return [retrieve];
				}
				return retrieve;
			}
		}
		return undefined;
	};
}

export const retrieve = async (
	domain: Institute,
	dbid: string,
	an: string,
): Promise<ArticleRetrieveDataType> => {
	const response: Response = await fetch(
		createQuery(environment.get.retrieve.article.replace("{domain}", domain), {
			dbid,
			an,
		}),
		{
			credentials: "include",
		},
	);
	throwIfNotOk(response);
	return json<ArticleRetrieveDataType>(response);
};

export const retrieveExport = async (links: string[]): Promise<string[]> => {
	const response: Response = await fetch(
		createQuery(environment.post.retrieve.articleExport),
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				links,
			}),
		},
	);
	throwIfNotOk(response);
	return json<string[]>(response);
};
