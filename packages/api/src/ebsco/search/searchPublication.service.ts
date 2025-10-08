import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { HttpService } from "../../common/http/http.service";
import { RedisService } from "../../common/redis/redis.service";
import { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { EbscoToken } from "../token/token.type";
import { AbstractEbscoSearchService } from "./abstractSearch.service";
import { parseItems } from "./searchArticle.utils";
import {
	extractFullTextHoldings,
	extractISBNOnline,
	extractISBNPrint,
	extractISSNOnline,
	extractISSNPrint,
	extractTitle,
} from "./searchPublication.utils";

@Injectable()
export class EbscoSearchPublicationService extends AbstractEbscoSearchService {
	constructor(
		config: ConfigService<Config, true>,
		httpService: HttpService,
		prismaService: PrismaService,
		redisService: RedisService,
	) {
		super(
			config.get("ebsco"),
			config.get("bibcheck"),
			httpService,
			prismaService,
			redisService,
		);
	}

	parsePublicationQueries(queries: Request["query"]["queries"]) {
		if (!queries || typeof queries !== "string") {
			return {};
		}

		const queriesJson = JSON.parse(decodeURIComponent(queries));
		if (queriesJson.length !== 1) {
			return { queries: queriesJson.map(this.addTruncatureToQuery) };
		}
		const { term, field } = queriesJson[0];

		if (
			term.match(/[A-Z]\*$/) ||
			term === "0* OR 1* OR 2* OR 3* OR 4* OR 5* OR 6* OR 7* OR 8* OR 9*"
		) {
			return {
				queries: [
					{
						term: `JN (${term}) OR (TI (${term}) AND (PT book OR PT ebook))`,
						field: null,
						boolean: "AND",
					},
				],
				sort: "title",
			};
		}

		return {
			queries: queriesJson.map(this.addTruncatureToQuery),
		};
	}

	private parsePublicationSearch(rawQuery: Request["query"]) {
		return {
			...rawQuery,
			activeFacets:
				rawQuery.activeFacets && typeof rawQuery.activeFacets === "string"
					? JSON.parse(decodeURIComponent(rawQuery.activeFacets))
					: null,
			...this.parsePublicationQueries(rawQuery.queries),
		};
	}

	// biome-ignore lint/suspicious/noExplicitAny: EBSCO result object
	private publicationParser(result: any) {
		return {
			id: result.ResultId,
			publicationId: result.Header.PublicationId,
			issnOnline: extractISSNOnline(result),
			issnPrint: extractISSNPrint(result),
			isbnOnline: extractISBNOnline(result),
			isbnPrint: extractISBNPrint(result),
			type: result.Header.ResourceType,
			title: extractTitle(result),
			fullTextHoldings: extractFullTextHoldings(result),
		};
	}

	async searchPublications(
		token: EbscoToken,
		rawQuery: Request["query"],
		communityName: string,
	) {
		const query = this.parsePublicationSearch(rawQuery);

		const searchResult = await this.ebscoSearch(
			async (authToken, sessionToken) => {
				return this.ebscoRequest(
					"/edsapi/publication/Search",
					this.getEbscoQuery(query),
					authToken,
					sessionToken,
				);
			},
			token,
			communityName,
		);

		const parsedResult = await this.parsePublicationResults(
			this.publicationParser,
			searchResult,
			communityName,
		);

		const formatISSN = (issn: string) => {
			return `${issn.slice(0, 4)}-${issn.slice(4)}`;
		};

		const apcMap = await this.getHasApcFromDoaj([
			...new Set(
				parsedResult.results.flatMap((item) => {
					const issns: string[] = [];
					if (item.issnPrint && item.issnPrint.length > 0) {
						issns.push(formatISSN(item.issnPrint[0]));
					}

					if (item.issnOnline && item.issnOnline.length > 0) {
						issns.push(formatISSN(item.issnOnline[0]));
					}
					return issns;
				}),
			),
		]);

		// Parallel process results
		await Promise.all(
			parsedResult.results.map(async (item) => {
				try {
					item.isDiamond = false;
					if (item.issnPrint && item.issnPrint.length > 0) {
						const formatedIssn = `${formatISSN(item.issnPrint[0])}`;
						if (apcMap.has(formatedIssn)) {
							item.isDiamond = apcMap.get(formatedIssn).has_apc === false;
						}
					}
					if (
						item.isDiamond === false &&
						item.issnOnline &&
						item.issnOnline.length > 0
					) {
						const formatedIssn = `${formatISSN(item.issnOnline[0])}`;
						if (apcMap.has(formatedIssn)) {
							item.isDiamond = apcMap.get(formatedIssn).has_apc === false;
						}
					}
				} catch {
					item.isDiamond = false;
				}
			}),
		);

		return parsedResult;
	}

	// biome-ignore lint/suspicious/noExplicitAny: parsing helper
	async retrievePublicationParser(result: any) {
		return {
			items: [...(await parseItems(result.Items))],
		};
	}

	async retrievePublicationById(
		token: EbscoToken,
		communityName: string,
		publicationId: string,
	) {
		const searchResult = await this.ebscoSearch(
			async (authToken, sessionToken) => {
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				return this.ebscoRequest<any>(
					"/edsapi/publication/Retrieve",
					{
						HighlightTerms: null,
						Id: publicationId,
					},
					authToken,
					sessionToken,
				).then((result) => result.Record);
			},
			token,
			communityName,
		);

		return this.retrievePublicationParser(searchResult);
	}
}
