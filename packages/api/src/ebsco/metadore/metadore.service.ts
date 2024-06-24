import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "../../common/http/http.service";
import { AppLogger } from "../../common/logger/AppLogger";
import { Config } from "../../config";

type RawQuery = {
	queries: string;
	resultsPerPage: number;
	currentPage?: number;
};

@Injectable()
export class EbscoMetadoreService {
	private readonly metadoreConfig: Config["metadore"];
	private readonly logger = new AppLogger(EbscoMetadoreService.name);

	constructor(
		private readonly configService: ConfigService<Config, true>,
		private readonly http: HttpService,
	) {
		this.metadoreConfig =
			this.configService.get<Config["metadore"]>("metadore");
	}

	parseMetadoreSearch(rawQuery: RawQuery) {
		const parsedQueries = JSON.parse(rawQuery.queries);
		const term = parsedQueries[0].term;
		const field = parsedQueries[0].field || "*";
		const size = rawQuery.resultsPerPage;
		const page = rawQuery.currentPage || 1;
		let query: string =
			field === "attributes.titles.title"
				? term
						.split(" ")
						.map((term) => `(${field}:*${term}*)`)
						.join("AND")
				: `(${field}:"${term}")`;
		query +=
			"AND((attributes.types.resourceType:Dataset)OR(attributes.types.resourceTypeGeneral:Dataset))&sort=attributes.publicationYear:desc";
		const metadoreQuery = {
			query,
			size: size.toString(10),
			page: page.toString(10),
		};
		return new URLSearchParams(metadoreQuery);
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	metadoreResultsParser(searchResults: any) {
		const size = searchResults.meta.size;
		const currentPage = searchResults.meta.currentPage;
		if (searchResults.meta.total === 0) {
			return {
				results: [],
				totalHits: 0,
				maxPage: 1,
				currentPage,
			};
		}

		return {
			results: this.parseResultsData(searchResults.data, size, currentPage),
			totalHits: searchResults.meta.total,
			maxPage: searchResults.meta.totalPages,
			currentPage,
		};
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	private parseResultsData(data: any, size: any, currentPage: any) {
		return data.map((result, index) => ({
			id: (currentPage - 1) * size + index + 1,
			doi: result.attributes.doi,
			type:
				result.attributes.types.resourceType ||
				result.attributes.types.resourceTypeGeneral,
			titles: result.attributes.titles,
			descriptions: result.attributes.descriptions,
			subjects: result.attributes.subjects.map((subject) => subject.subject),
			publicationYear:
				result.attributes.publicationYear > new Date().getFullYear()
					? ""
					: result.attributes.publicationYear,
			url: result.attributes.url,
		}));
	}

	async metadoreRequest(query: RawQuery) {
		const queryString = this.parseMetadoreSearch(query);
		return this.http
			.request(`${this.metadoreConfig.url}/search?${queryString}`, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"x-api-key": this.metadoreConfig.apiKey,
				},
			})
			.then(async (response) => {
				if (response.status === 200) {
					return response.json();
				}
				throw {
					status: response.status,
					message: await response.text(),
				};
			})
			.then((searchResults) => this.metadoreResultsParser(searchResults))
			.catch((e) => {
				this.logger.error(
					`Failed to fetch from Metadore (status=${e.status || 500}): ${e.message || e}`,
				);
				throw new InternalServerErrorException();
			});
	}
}
