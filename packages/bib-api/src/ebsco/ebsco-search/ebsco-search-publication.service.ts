import { Inject, Injectable, Scope } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { REQUEST } from "@nestjs/core";
import { community } from "@prisma/client";
import { Request } from "express";
import { CommonRedisService } from "../../common/common-redis/common-redis.service";
import { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { AbstractEbscoSearchService } from "./ebsco-search-abstract.service";
import {
	extractFullTextHoldings,
	extractISBNOnline,
	extractISBNPrint,
	extractISSNOnline,
	extractISSNPrint,
	extractTitle,
} from "./ebsco-search-publication.utils";

@Injectable({ scope: Scope.REQUEST })
export class EbscoSearchPublicationService extends AbstractEbscoSearchService {
	constructor(
		configService: ConfigService<Config, true>,
		@Inject(REQUEST) request: Request,
		prismaService: PrismaService,
		redisService: CommonRedisService,
	) {
		super(configService.get("ebsco"), request, prismaService, redisService);
	}

	private parsePublicationQueries() {
		const { queries } = this.request.query;
		if (!queries || typeof queries !== "string") {
			return {};
		}

		const queriesJson = JSON.parse(decodeURIComponent(queries));
		if (queriesJson.length !== 1) {
			return { queries: queriesJson.map(this.addTruncatureToQuery) };
		}
		const { term, field } = queriesJson[0];

		if (field !== "TI") {
			return {
				queries: queriesJson.map(this.addTruncatureToQuery),
			};
		}

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

	private parsePublicationSearch() {
		const rawQuery = this.request.query;

		return {
			...rawQuery,
			activeFacets:
				rawQuery.activeFacets && typeof rawQuery.activeFacets === "string"
					? JSON.parse(decodeURIComponent(rawQuery.activeFacets))
					: null,
			...this.parsePublicationQueries(),
		};
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
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

	async searchPublications(communityName: string) {
		const query = this.parsePublicationSearch();

		const searchResult = await this.ebscoSearch(
			async (authToken, sessionToken) => {
				return this.ebscoRequest(
					"/edsapi/publication/Search",
					this.getEbscoQuery(query),
					authToken,
					sessionToken,
				);
			},
			communityName,
		);

		const parsedResult = this.parsePublicationResults(
			this.publicationParser,
			searchResult,
			communityName,
		);
		for (const item of parsedResult.results) {
			try {
				item.isDiamond = false;
				if (item.issnPrint && item.issnPrint.length > 0) {
					const formatedIssn = `${item.issnPrint[0].slice(
						0,
						4,
					)}-${item.issnPrint[0].slice(4)}`;
					const doajInfo = await this.getInfoFromDOAJ(formatedIssn);
					item.isDiamond = doajInfo.has_apc === false;
				}
				if (
					item.isDiamond === false &&
					item.issnOnline &&
					item.issnOnline.length > 0
				) {
					const formatedIssn = `${item.issnOnline[0].slice(
						0,
						4,
					)}-${item.issnOnline[0].slice(4)}`;
					const doajInfo = await this.getInfoFromDOAJ(formatedIssn);
					item.isDiamond = doajInfo.has_apc === false;
				}
			} catch (e) {
				item.isDiamond = false;
			}
		}
		return parsedResult;
	}
}
