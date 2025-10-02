import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import flatten from "lodash.flatten";
import { HttpService } from "../../common/http/http.service";
import { AppLogger } from "../../common/logger/AppLogger";
import { RedisService } from "../../common/redis/redis.service";
import { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { EbscoToken } from "../token/token.type";
import { AbstractEbscoSearchService } from "./abstractSearch.service";
import { parseXML } from "./search.utils";
import {
	extractAbstract,
	extractAuthors,
	extractDOI,
	extractDatabase,
	extractExportLinks,
	extractFullTextLinks,
	extractHtml,
	extractLanguages,
	extractPdfLinks,
	extractPublicationDate,
	extractPublicationType,
	extractSource,
	extractSubjects,
	extractText,
	extractTitle,
	parseItems,
} from "./searchArticle.utils";

const DOI_REGEX = /(10[.][0-9]{4,}(?:[.][0-9]+)*\/(?:(?![%"#? ])\S)+)/;
const ARTICLE_URL = "/edsapi/rest/Search";

type Info = {
	title?: string;
	issn?: string;
	isbn?: string;
};

type LinkIqInfoResponse = {
	contextObjects: {
		contextObjectFacts: {
			name: "atitle" | "issn1" | "isbn1" | "isbn" | "year" | "authors";
			value: string;
		}[];
		targetLinks: {
			linkName: string;
			targetUrl: string;
		}[];
	}[];
};
type LinkIqInfoResult = {
	id: number;
	doi: string;
	title: string;
	year: string;
	authors: string[];
	issn?: string;
	isbn?: string;
	articleLinks: {
		fullTextLinks: {
			name: string;
			url: string;
		}[];
	};
	is_linkiq: true;
};

@Injectable()
export class EbscoSearchArticleService extends AbstractEbscoSearchService {
	private readonly logger = new AppLogger(EbscoSearchArticleService.name);

	constructor(
		configService: ConfigService<Config, true>,
		httpService: HttpService,
		prismaService: PrismaService,
		redisService: RedisService,
	) {
		super(configService.get("ebsco"), httpService, prismaService, redisService);
	}

	parseArticleQueries({ queries }) {
		if (!queries) {
			return null;
		}

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const parsedQueries: any[] =
			typeof queries === "string"
				? JSON.parse(decodeURIComponent(queries))
				: queries;

		return parsedQueries.map(this.addTruncatureToQuery);
	}

	parseArticleSearch(rawQuery) {
		return {
			...rawQuery,
			activeFacets:
				rawQuery.activeFacets && typeof rawQuery.activeFacets === "string"
					? JSON.parse(decodeURIComponent(rawQuery.activeFacets))
					: rawQuery.activeFacets,
			queries: this.parseArticleQueries(rawQuery),
		};
	}

	isDOI(term?: string | null) {
		return term ? !!term.match(DOI_REGEX) : false;
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	getDOIFromQuery(query: any) {
		if (query?.queries?.length === 1 && query?.queries?.[0]?.field === null) {
			const term = query?.queries?.[0]?.term;
			return this.isDOI(term) ? term : null;
		}

		return null;
	}

	private async getInfoFromLinkIQ(
		domain: string,
		doi: string,
	): Promise<LinkIqInfoResult | null> {
		const url = this.ebsco.linkIq[domain.toUpperCase()];
		if (!url) {
			return null;
		}

		try {
			const response = await this.http.request<LinkIqInfoResponse, void>(
				`${url}${doi}`,
			);

			if (response.status !== 200) {
				return null;
			}

			const facts = response.data?.contextObjects?.[0].contextObjectFacts;
			const links =
				response.data?.contextObjects?.[0].targetLinks?.filter?.(
					(link) => link.linkName.trim().toLocaleLowerCase() !== "unpaywall",
				) ?? [];

			const title = facts.find((fact) => fact.name === "atitle")?.value;
			if (!facts || !title || links.length === 0) {
				return null;
			}

			return {
				id: 1,
				doi,
				title: facts.find((fact) => fact.name === "atitle")?.value,
				authors:
					facts.find((fact) => fact.name === "authors")?.value.split(";") ?? [],
				year: facts.find((fact) => fact.name === "year")?.value,
				issn: facts.find((fact) => fact.name === "issn1")?.value,
				isbn: facts.find(
					(fact) => fact.name === "isbn1" || fact.name === "isbn",
				)?.value,
				articleLinks: {
					fullTextLinks: links.map((link) => ({
						name: link.linkName,
						url: link.targetUrl,
					})),
				},
				is_linkiq: true,
			};
		} catch (error) {
			return null;
		}
	}

	private async getInfoFromCrossref(doi: string): Promise<Info> {
		try {
			const result = await this.http
				.request(`${this.ebsco.crossref}${doi}`)
				.then((res) => res.data);

			return {
				title: result?.message?.title?.[0],
				issn: result?.message?.ISSN?.[0],
				isbn: result?.message?.ISBN?.[0],
			};
		} catch (error) {
			// 404 crossref
			return {};
		}
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	private async getRetryQuery(query: any) {
		const doi = this.getDOIFromQuery(query);

		if (!doi) {
			return null;
		}

		const { title, issn, isbn } = await this.getInfoFromCrossref(doi);
		if (!title) {
			return null;
		}

		return {
			...query,
			queries: [
				{ field: "TI", term: title, boolean: "AND" },
				issn && { field: "IS", term: issn, boolean: "AND" },
				isbn && { field: "IB", term: isbn, boolean: "AND" },
			].filter((v) => !!v),
		};
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	async getUrlFromUnpaywall(unpaywallUrl: any, domain: any) {
		try {
			const doi = unpaywallUrl
				.replace("https://api.unpaywall.org/v2/doi=", "")
				.replace("?email=jjoly@ebsco.com", "");
			const query = `{GetByDOI(dois:["${doi}"]){is_oa, best_oa_location{ url_for_pdf }}}`;

			const response = await this.http.request<{
				data: {
					GetByDOI: {
						is_oa: boolean;
						best_oa_location: { url_for_pdf: string };
					}[];
				};
			}>(`${this.ebsco.ezUnpaywallUrl}/api/graphql?sid=bibapi`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": `${this.ebsco.ezUnpaywallKey}`,
				},
				data: JSON.stringify({ query: query }),
			});

			if (response.status !== 200) {
				throw new Error("Unpaywall error");
			}

			const result = response.data;

			const is_oa = result.data?.GetByDOI?.[0]?.is_oa;
			const url = result.data?.GetByDOI?.[0]?.best_oa_location?.url_for_pdf;
			if (is_oa && url) {
				const urlEncoded = encodeURIComponent(url);
				return `${this.ebsco.apiEndpoint}/ebsco/oa?sid=unpaywall&doi=${doi}&url=${urlEncoded}&domaine=${domain}`;
			}
			return null;
		} catch (error) {
			this.logger.error(
				`Failed to retrieve unpawall url: ${error.message || error}`,
			);
			return null;
		}
	}

	async extractUrls(
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		result: any,
		domain?: string,
	) {
		const items: { Url: string; Name: string }[] =
			result.Items?.filter(
				(item) => item.Name === "URL" || item.Name === "Avail",
			) || [];

		const hasOpenAccessLink = !!result.FullText?.CustomLinks?.find?.(
			(link) =>
				link.Category === "fullText" &&
				/accès en ligne en open access/i.test(link.Text),
		);

		const unpaywalls: { Url: string; Name: string }[] =
			(!hasOpenAccessLink &&
				result?.CustomLinks?.filter?.(
					(link) =>
						link.Category === "other" && link.Url.includes("api.unpaywall"),
				)) ||
			[];

		if (items.length === 0 && unpaywalls.length === 0) {
			return [];
		}

		const urls: Promise<{ name: string; url: string }>[] = items.map(
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			async (item: any) => {
				try {
					let parsedItem = await parseXML(item.Data);
					if (Array.isArray(parsedItem)) {
						parsedItem = flatten(parsedItem).filter(
							// biome-ignore lint/suspicious/noExplicitAny: <explanation>
							(item: any) => typeof item === "string" || !!item.url,
						);
					}

					return {
						name: item.Label,
						url: extractText(parsedItem),
					};
				} catch (e) {
					return null;
				}
			},
		);

		urls.push(
			...unpaywalls.map(async (link) => {
				const unpaywallUrl = await this.getUrlFromUnpaywall(link.Url, domain);
				return {
					name: link.Name,
					url: unpaywallUrl ? unpaywallUrl.replace("&amp;", "&") : null,
				};
			}),
		);

		return Promise.all(urls).then((items) =>
			items.filter((item) => !!item && !!item.url),
		);
	}

	async articleLinkParser(
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		result: any,
		domain: string,
	) {
		return {
			fullTextLinks: extractFullTextLinks(result),
			pdfLinks: extractPdfLinks(result),
			html: extractHtml(result),
			urls: await this.extractUrls(result, domain),
		};
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	async searchArticleParser(result: any, communityName: string) {
		return {
			id: result.ResultId,
			an: result.Header.An,
			dbId: result.Header.DbId,
			articleLinks: await this.articleLinkParser(result, communityName),
			exportLinks: extractExportLinks(result),
			doi: extractDOI(result),
			title: extractTitle(result),
			source: extractSource(result),
			authors: extractAuthors(result),
			publicationDate: extractPublicationDate(result),
			languages: extractLanguages(result),
			database: extractDatabase(result),
			subjects: extractSubjects(result),
			publicationType: extractPublicationType(result),
			abstract: extractAbstract(result),
			doiRetry: result.doiRetry,
		};
	}

	async searchArticleRaw(token: EbscoToken, rawQuery, communityName: string) {
		const query = this.parseArticleSearch(rawQuery);

		return await this.ebscoSearch(
			async (authToken, sessionToken) => {
				return this.ebscoRequest(
					ARTICLE_URL,
					this.getEbscoQuery(query),
					authToken,
					sessionToken,
				);
			},
			token,
			communityName,
		);
	}

	async searchArticle(
		token: EbscoToken,
		rawQuery: Request["query"],
		communityName: string,
	) {
		const query = this.parseArticleSearch(rawQuery);

		let searchResult = await this.searchArticleRaw(
			token,
			rawQuery,
			communityName,
		);

		if (!searchResult?.SearchResult?.Statistics?.TotalHits) {
			const linkIqResult = await this.getInfoFromLinkIQ(
				communityName,
				this.getDOIFromQuery(query),
			);

			if (linkIqResult) {
				return {
					results: [linkIqResult],
					totalHits: 1,
					currentPage: 1,
					maxPage: 1,
					facets: [],
					dateRange: {
						min: Number.parseInt(linkIqResult.year, 10),
						max: Number.parseInt(linkIqResult.year, 10),
					},
				};
			}

			const retryQuery = await this.getRetryQuery(query);
			if (retryQuery) {
				searchResult = await this.ebscoSearch(
					async (authToken, sessionToken) => {
						return this.ebscoRequest(
							ARTICLE_URL,
							this.getEbscoQuery(retryQuery),
							authToken,
							sessionToken,
						);
					},
					token,
					communityName,
				);
				searchResult.doiRetry = true;
			}

			if (
				!searchResult?.SearchResult?.Statistics?.TotalHits &&
				retryQuery?.FT === "Y"
			) {
				const { FT: _FT, ...noFullTextQuery } = retryQuery;

				searchResult = await this.ebscoSearch(
					async (authToken, sessionToken) => {
						return this.ebscoRequest(
							ARTICLE_URL,
							this.getEbscoQuery(noFullTextQuery),
							authToken,
							sessionToken,
						);
					},
					token,
					communityName,
				);
				searchResult.noFullText = true;
			}
		}

		const results = await this.parsePublicationResults(
			this.searchArticleParser.bind(this),
			searchResult,
			communityName,
		);

		for (const article of results.results) {
			if (article.doi) {
				const bibcheck = await this.bibCheck(article.doi);
				article.bibcheck = bibcheck.status;
			}
		}

		return results;
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	async retrieveArticleParser(result: any, domain?: string) {
		return {
			items: await parseItems(result.Items),
			dbLabel: result.Header ? result.Header.DbLabel : undefined,
			dbId: result.Header ? result.Header.DbId : undefined,
			articleLinks: await this.articleLinkParser(result, domain),
		};
	}

	async retrieveArticle(
		token: EbscoToken,
		communityName: string,
		dbId: string,
		an: string,
	) {
		const searchResult = await this.ebscoSearch(
			async (authToken, sessionToken) => {
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				return this.ebscoRequest<any>(
					"/edsapi/rest/Retrieve",
					{
						EbookPreferredFormat: "ebook-pdf",
						HighlightTerms: null,
						An: an,
						DbId: dbId,
					},
					authToken,
					sessionToken,
				).then((result) => result.Record);
			},
			token,
			communityName,
		);

		return this.retrieveArticleParser(searchResult, communityName);
	}
	async bibCheck(reference: string) {
		try {
			const DOI = reference.toLowerCase();
			const response = await this.http.request(
				"https://biblio-ref.services.istex.fr/v1/is-retracted",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					data: [{ value: DOI }],
				},
			);

			if (!Array.isArray(response.data) || !response.data[0]?.value) {
				return { status: "not_found", data: null };
			}

			const result = response.data[0].value;
			if (typeof result.is_retracted === "undefined") {
				return { status: "not_found", data: null };
			}

			const status = result.is_retracted ? "retracted" : "not_retracted";
			return { status, data: result };
		} catch (error) {
			this.logger.error(
				`Bibcheck error for ${reference}: ${error.message || error}`,
			);
			return { status: "error", data: null };
		}
	}
}
