import {
	InternalServerErrorException,
	Logger,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { community } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { Request } from "express";
import { ProxyAgent, request as httpRequest } from "undici";
import { CommonRedisService } from "../../common/common-redis/common-redis.service";
import { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";

const logger = new Logger("EbscoSearchAbstractService");

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type EbscoQuery = any;

type EbscoError = {
	ErrorNumber: string;
	ErrorDescription: string;
	Reason: string;
};

export class AbstractEbscoSearchService {
	constructor(
		protected readonly ebsco: Config["ebsco"],
		protected readonly request: Request,
		protected readonly prismaService: PrismaService,
		protected readonly redisService: CommonRedisService,
	) {}

	private handleEbscoError(error: {
		error?: EbscoError;
	}) {
		if (!error.error) {
			throw error;
		}

		// 109 = Invalid Session Token. Please generate a new one.
		if (error.error.ErrorNumber === "109") {
			throw new Error("retry");
		}

		// on retrieve api error 132 is wrong 'an' and 135 is wrong 'dbId'
		if (
			error.error.ErrorNumber === "132" ||
			error.error.ErrorNumber === "135"
		) {
			logger.warn(error.error.ErrorDescription, error.error);
			throw new NotFoundException();
		}

		logger.error(
			error.error.ErrorDescription || error.error.Reason || "ebsco error",
			error.error,
		);
		throw new InternalServerErrorException(
			error.error.ErrorDescription ||
				error.error.Reason ||
				JSON.stringify(error.error),
		);
	}

	addTruncature(term: string) {
		return term
			.split(" ")
			.map((t) => (t.match(/^[a-zA-Z]+$/) ? `${t}*` : t))
			.join(" ");
	}

	addTruncatureToQuery({
		field,
		term,
		...rest
	}: { boolean: string; field: string; term: string }) {
		return field === "TI"
			? { field, term: this.addTruncature(term), ...rest }
			: { field, term, ...rest };
	}

	protected async ebscoRequest<T>(
		url: string,
		json: JsonValue,
		authToken: string | null = null,
		sessionToken: string | null = null,
	): Promise<T> {
		const start = Date.now();

		const dispatcher = this.ebsco.proxy
			? new ProxyAgent(this.ebsco.proxy)
			: undefined;
		const response = await httpRequest(
			`${this.ebsco.host}${this.ebsco.port || ""}${url}`,
			{
				dispatcher,
				method: "POST",
				body: JSON.stringify(json),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"x-authenticationToken": authToken || undefined,
					"x-sessionToken": sessionToken || undefined,
				},
			},
		);

		const body = await response.body.json();

		logger.log(
			`[POST] ${url} ${response.statusCode}: ${JSON.stringify({
				json,
				authToken,
				sessionToken,
				time: `took ${Date.now() - start}ms`,
			})}`,
		);

		logger.warn(
			`[POST] ${url} ${response.statusCode}: ${JSON.stringify(body)}`,
		);

		if (response.statusCode !== 200) {
			this.handleEbscoError({ error: body as EbscoError });
		}

		return body as T;
	}

	private async ebscoAuthenticate(userId: string, password: string) {
		return this.ebscoRequest<{ AuthToken: string; AuthTimeout: string }>(
			"/authservice/rest/UIDAuth",
			{
				UserId: userId,
				Password: password,
			},
		);
	}

	private async ebscoSession(authToken: string, profile: string) {
		return this.ebscoRequest<{ SessionToken: string }>(
			"/edsapi/rest/CreateSession",
			{
				Profile: profile,
				Guest: "n",
			},
			authToken,
		);
	}

	protected async getEbscoToken({
		name: communityName,
		user_id,
		password,
		profile,
	}: community) {
		const { username, domains } = this.request.ebscoToken;
		if (!domains.includes(communityName)) {
			throw new UnauthorizedException(
				`You are not authorized to access domain ${communityName}`,
			);
		}

		let [authToken, sessionToken] = await this.redisService.hmgetAsync(
			communityName,
			["authToken", username],
		);

		if (authToken && sessionToken) {
			return {
				sessionToken,
				authToken,
			};
		}

		if (!authToken) {
			const { AuthToken, AuthTimeout } = await this.ebscoAuthenticate(
				user_id,
				password,
			);
			authToken = AuthToken;
			await this.redisService.hsetAsync(communityName, "authToken", authToken);
			await this.redisService.expireAsync(
				communityName,
				Number.parseInt(AuthTimeout, 10) - 5,
			);
		}

		const { SessionToken } = await this.ebscoSession(authToken, profile);

		await this.redisService.hsetAsync(communityName, username, SessionToken);

		return {
			sessionToken: SessionToken,
			authToken,
		};
	}

	private async ebscoInvalidateAuth(communityName: string) {}

	protected async ebscoSearch<
		F extends (authToken: string, sessionToken: string) => Promise<R>,
		R,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	>(ebscoCall: F, communityName: string): Promise<any> {
		try {
			const community = await this.prismaService.community.findUnique({
				where: {
					name: decodeURIComponent(communityName.replace(/\+/g, " ")),
				},
			});
			if (!community) {
				throw new NotFoundException();
			}

			const { authToken, sessionToken } = await this.getEbscoToken(community);

			const result = await ebscoCall(authToken, sessionToken);

			return result;
		} catch (error) {
			await this.ebscoInvalidateAuth(communityName);

			if (error.message === "Max retry reached. Giving up.") {
				throw new UnauthorizedException(
					"Could not connect to ebsco api. Please try again. If the problem persist contact us.",
				);
			}
			throw error;
		}
	}

	protected getEbscoQuery(query: EbscoQuery, view = "brief") {
		const actions = query.action
			? [`goToPage(${query.currentPage || 1})`, query.action]
			: [`goToPage(${query.currentPage || 1})`];

		if (query.OA === "Y") {
			if (!query.queries) {
				query.queries = [];
			}

			query.queries.push({
				boolean: "AND",
				field: null,
				term: "LO system.a2731812 OR LO system.a01000000280100001094 OR LO system.a6255937OR OR LN edsdoj OR LN edsdob OR LN edsgso OR LN edsper OR LN edsgal OR LN edseur OR IS edsairFT OR LN edshal",
			});
		}

		return {
			SearchCriteria: {
				Queries: query.queries
					? // biome-ignore lint/suspicious/noExplicitAny: <explanation>
						query.queries.map((q: any) => ({
							BooleanOperator: q.boolean,
							FieldCode: q.field,
							Term: q.term,
						}))
					: null,
				SearchMode: "all",
				IncludeFacets: "y",
				PublicationId: query.publicationId,
				FacetFilters: query.activeFacets
					? this.unparseActiveFacet(query.activeFacets)
					: [],
				Limiters:
					query.fullText === true
						? [{ Id: "FT", Values: ["Y"] }]
						: query.limiters?.fullText === true
							? [{ Id: "FT", Values: ["Y"] }]
							: Object.keys(query)
									.filter((id) => this.ebsco.allowedLimiters.indexOf(id) !== -1)
									.map((id) => ({
										Id: id,
										Values: [].concat(query[id]),
									})),
				Expanders: [],
				Sort: query.sort || "relevance",
			},
			RetrievalCriteria: {
				View: view,
				ResultsPerPage: query.resultsPerPage,
				PageNumber: 1,
				Highlight: "n",
			},
			Actions: actions,
		};
	}

	parseDateRange(
		results:
			| {
					AvailableCriteria?: {
						DateRange?: { MinDate: string; MaxDate: string };
					};
			  }
			| undefined = undefined,
	) {
		if (!results?.AvailableCriteria?.DateRange) {
			return {
				min: 1000,
				max: new Date().getFullYear() + 1,
			};
		}

		const { MinDate, MaxDate } = results.AvailableCriteria.DateRange;

		return {
			min: Number.parseInt(MinDate.substring(0, 4), 10),
			max: Math.min(
				Number.parseInt(MaxDate.substring(0, 4), 10),
				new Date().getFullYear() + 1,
			),
		};
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	private sortFacet(facet: any, overridenFirstValue: any) {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		facet.AvailableFacetValues.sort((a: any, b: any) => {
			return a.Value.localeCompare(b.Value);
		});

		const overrideIndex = facet.AvailableFacetValues.findIndex(
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(d: any) => d.Value === overridenFirstValue,
		);

		if (overrideIndex !== -1) {
			const [value] = facet.AvailableFacetValues.splice(overrideIndex, 1);
			facet.AvailableFacetValues.unshift(value);
		}

		return facet;
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	parseActiveFacets(rawActiveFacets?: any) {
		if (!rawActiveFacets) {
			return {};
		}

		const activeFacetValues = rawActiveFacets.reduce(
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			(result: any[], activeFacet: any) => {
				// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
				return [...result, ...activeFacet.FacetValues];
			},
			[],
		);

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		return activeFacetValues.reduce((result: any, facetValue: any) => {
			const values = result[facetValue.Id] || [];
			return {
				// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
				...result,
				[facetValue.Id]: [...values, facetValue.Value],
			};
		}, {});
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	unparseActiveFacet(activeFacets: any) {
		return Object.keys(activeFacets).map((key, index) => {
			return {
				FilterId: index + 1,
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				FacetValues: activeFacets[key].map((facetValue: any) => {
					return {
						Id: key,
						Value: facetValue,
					};
				}),
			};
		});
	}

	async parsePublicationResults(
		// biome-ignore lint/complexity/noBannedTypes: <explanation>
		parser: Function,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		searchResults: any,
		domain: string,
	): Promise<{
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		results: any[];
		totalHits: number;
		currentPage: number;
		maxPage: number;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		facets: any[];
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		activeFacets: Record<string, any>;
		dateRange: { min: number; max: number };
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		noFullText?: any;
	}> {
		if (searchResults.SearchResult.Statistics.TotalHits === 0) {
			return {
				results: [],
				totalHits: 0,
				currentPage: 1,
				maxPage: 1,
				facets: [],
				activeFacets: {},
				dateRange: this.parseDateRange(),
			};
		}

		return {
			results: await Promise.all(
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				searchResults.SearchResult.Data.Records.map((record: any) =>
					parser(record, domain),
				),
			),
			totalHits: searchResults.SearchResult.Statistics.TotalHits,
			currentPage: searchResults.SearchRequest.RetrievalCriteria.PageNumber,
			maxPage: Math.ceil(
				searchResults.SearchResult.Statistics.TotalHits /
					searchResults.SearchRequest.RetrievalCriteria.ResultsPerPage,
			),
			facets: (searchResults.SearchResult.AvailableFacets || []).map(
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				(facet: any) => {
					if (facet.Id === "ContentProvider") {
						return this.sortFacet(facet, "HAL");
					}

					return this.sortFacet(facet, null);
				},
			),
			activeFacets: this.parseActiveFacets(
				searchResults.SearchRequest.SearchCriteria.FacetFilters,
			),
			dateRange: this.parseDateRange(searchResults.SearchResult),
			noFullText: searchResults.noFullText,
		};
	}

	async getInfoFromDOAJ(isn: string) {
		try {
			const result = await fetch(
				`${this.ebsco.doajUrl}search/journals/issn:${isn}`,
			);
			const body = await result.json();
			return {
				has_apc: body?.results?.[0]?.bibjson?.apc?.has_apc ?? null,
			};
		} catch (error) {
			// 404 crossref
			return {};
		}
	}
}