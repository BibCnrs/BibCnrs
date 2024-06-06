import { Inject, Injectable, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import flatten from "lodash.flatten";
import { CommonRedisService } from "../../common/common-redis/common-redis.service";
import { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { AbstractEbscoSearchService } from "./ebsco-search-abstract.service";
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
} from "./ebsco-search-article.utils";
import { parseXML } from "./ebsco-search.utils";

const DOI_REGEX = /(10[.][0-9]{4,}(?:[.][0-9]+)*\/(?:(?![%"#? ])\S)+)/;
const ARTICLE_URL = "/edsapi/rest/Search";

@Injectable({ scope: Scope.REQUEST })
export class EbscoSearchArticleService extends AbstractEbscoSearchService {
	constructor(
		configService: ConfigService<Config, true>,
		@Inject(REQUEST) request: Request,
		prismaService: PrismaService,
		redisService: CommonRedisService,
	) {
		super(configService.get("ebsco"), request, prismaService, redisService);
	}

	parseArticleQueries() {
		const { queries } = this.request.query;
		if (!queries || typeof queries !== "string") {
			return null;
		}

		return JSON.parse(decodeURIComponent(queries)).map(
			this.addTruncatureToQuery,
		);
	}

	parseArticleSearch() {
		const rawQuery = this.request.query;
		return {
			...rawQuery,
			activeFacets:
				rawQuery.activeFacets && typeof rawQuery.activeFacets === "string"
					? JSON.parse(decodeURIComponent(rawQuery.activeFacets))
					: null,
			queries: this.parseArticleQueries(),
		};
	}

	isDOI(term: string | null) {
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

	private async getInfoFromDOI(term: string) {
		try {
			const result = await fetch(`${this.ebsco.crossref}${term}`).then((res) =>
				res.json(),
			);
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

		const { title, issn, isbn } = await this.getInfoFromDOI(doi);
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

	async getUrlFromUnpaywall(unpaywallUrl, domain) {
		try {
			const doi = unpaywallUrl
				.replace("https://api.unpaywall.org/v2/doi=", "")
				.replace("?email=jjoly@ebsco.com", "");
			const query = `{GetByDOI(dois:["${doi}"]){is_oa, best_oa_location{ url_for_pdf }}}`;
			const response = await fetch(
				`${this.ebsco.ezUnpaywallUrl}/api/graphql?sid=bibapi`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"x-api-key": `${this.ebsco.ezUnpaywallKey}`,
					},
					body: JSON.stringify({ query: query }),
				},
			);

			if (response.status !== 200) {
				throw new Error("Unpaywall error");
			}

			const result = await response.json();

			const is_oa = JSON.parse(result).data.GetByDOI[0].is_oa;
			const url =
				JSON.parse(result).data.GetByDOI[0].best_oa_location.url_for_pdf;
			if (is_oa && url) {
				const urlEncoded = encodeURIComponent(url);
				return `${this.ebsco.apiEndpoint}/ebsco/oa?sid=unpaywall&doi=${doi}&url=${urlEncoded}&domaine=${domain}`;
			}
			return null;
		} catch (error) {
			return null;
		}
	}

	async extractUrls(
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		result: any,
		domain: string,
		isRetrieve: boolean,
	) {
		const items =
			result.Items?.filter(
				(item) => item.Name === "URL" || item.Name === "Avail",
			) || [];

		const hasOpenAccessLink =
			result.FullText?.CustomLinks &&
			!!result.FullText.CustomLinks.find(
				(link) =>
					link.Category === "fullText" &&
					/accès en ligne en open access/i.test(link.Text),
			);

		const unpaywalls =
			(!hasOpenAccessLink &&
				result.CustomLinks &&
				result.CustomLinks.filter(
					(link) =>
						link.Category === "other" && link.Url.includes("api.unpaywall"),
				)) ||
			[];

		if (items.length === 0 && unpaywalls.length === 0) {
			return [];
		}

		const urls: (() => Promise<{ name: string; url: string }>)[] = items.map(
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(item: any) => async () => {
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

		if (!isRetrieve) {
			urls.push(
				...unpaywalls.map(
					async (link) => async () => {
						const unpaywallUrl = await this.getUrlFromUnpaywall(
							link.Url,
							domain,
						);
						return {
							name: link.Name,
							url: unpaywallUrl ? unpaywallUrl.replace("&amp;", "&") : null,
						};
					},
					{},
				),
			);
		}

		return Promise.all(urls.map((fn) => fn())).then((items) =>
			items.filter((item) => !!item && !!item.url),
		);
	}

	async articleLinkParser(
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		result: any,
		domain: string,
		isRetrieve = false,
	) {
		return {
			fullTextLinks: extractFullTextLinks(result),
			pdfLinks: extractPdfLinks(result),
			html: extractHtml(result),
			urls: await this.extractUrls(result, domain, isRetrieve),
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

	async searchArticle(communityName: string) {
		const query = this.parseArticleSearch();

		let searchResult = await this.ebscoSearch(
			async (authToken, sessionToken) => {
				return this.ebscoRequest(
					ARTICLE_URL,
					this.getEbscoQuery(query),
					authToken,
					sessionToken,
				);
			},
			communityName,
		);

		if (!searchResult?.SearchResult?.Statistics?.TotalHits) {
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
					communityName,
				);
				searchResult.noFullText = true;
			}
		}

		return this.parsePublicationResults(
			this.searchArticleParser.bind(this),
			searchResult,
			communityName,
		);
	}
}
