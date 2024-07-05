import { Injectable, NotFoundException } from "@nestjs/common";
import { JsonObject } from "@prisma/client/runtime/library";
import { PrismaService } from "../../prisma/prisma.service";
import { EbscoDomainService } from "../domain/domain.service";
import { EbscoSearchArticleService } from "../search/searchArticle.service";
import { EbscoSearchAlertDto } from "./dto/ebsco-search-alert.dto";
import { getResultsIdentifiers } from "./searchAlert.utils";

@Injectable()
export class EbscoSearchAlertService {
	constructor(
		private prismaService: PrismaService,
		private readonly ebscoSearchArticleService: EbscoSearchArticleService,
		private readonly ebscoDomainService: EbscoDomainService,
	) {}

	async setSearchAlert({ historyId, frequence }: EbscoSearchAlertDto) {
		const history = await this.prismaService.history.findUnique({
			where: {
				id: historyId,
			},
		});

		if (!history) {
			throw new NotFoundException();
		}

		const communities = await this.ebscoDomainService.getCommunities();
		const domains = communities.map((community) => community.name);
		const { queries, limiters, activeFacets, domain } =
			history.event as JsonObject;

		const token = { username: "guest", domains };
		const result =
			process.env.NODE_ENV === "test"
				? undefined // We disable search for E2E tests, otherwise it would break them
				: await this.ebscoSearchArticleService.searchArticleRaw(
						token,
						{
							queries,
							limiters,
							activeFacets,
							resultsPerPage: 100,
						},
						domain as string,
					);

		await this.prismaService.$queryRaw`
		UPDATE history SET
		has_alert = true,
		frequence = CAST(${frequence} as interval),
		last_execution = ${
			history.last_execution ? history.last_execution : new Date()
		},
		last_results = CAST(${JSON.stringify(getResultsIdentifiers(result))} as json),
		nb_results = ${result?.SearchResult?.Statistics?.TotalHits ?? history.nb_results ?? 0}
		WHERE id = ${historyId}`;
	}

	async deleteSearchAlert(id: number) {
		await this.prismaService.$queryRaw`
		UPDATE history
		SET has_alert = false,
			frequence = NULL,
			last_results = NULL,
			last_execution = NULL,
			nb_results = NULL
		WHERE id = ${id};
		`;
	}
}
