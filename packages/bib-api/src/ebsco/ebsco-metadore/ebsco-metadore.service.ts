import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Config } from "../../config";

@Injectable()
export class EbscoMetadoreService {
	private readonly metadoreConfig: Config["metadore"];

	constructor(private readonly configService: ConfigService<Config, true>) {
		this.metadoreConfig =
			this.configService.get<Config["metadore"]>("metadore");
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	private parseMetadoreSearch(rawQuery: any) {
		const parsedQueries = JSON.parse(rawQuery.queries);
		const term = parsedQueries[0].term;
		const field = parsedQueries[0].field || "*";
		const size = rawQuery.resultsPerPage;
		const page = rawQuery.currentPage || 1;
		let query =
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
			size,
			page,
		};
		return new URLSearchParams(metadoreQuery);
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	private metadoreResultsParser(searchResults: any) {
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

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	async metadoreRequest(query: any) {
		const queryString = this.parseMetadoreSearch(query);
		return fetch(`${this.metadoreConfig.url}/search?${queryString}`, {
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
			.then((searchResults) => this.metadoreResultsParser(searchResults));
	}
}
