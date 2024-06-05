import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { EbscoSearchAlertDto } from "./dto/ebsco-search-alert.dto";

@Injectable()
export class EbscoSearchAlertService {
	constructor(private prismaService: PrismaService) {}

	async setSearchAlert({ historyId, frequence }: EbscoSearchAlertDto) {
		const history = await this.prismaService.history.findUnique({
			where: {
				id: historyId,
			},
		});

		if (!history) {
			throw new NotFoundException();
		}

		await this.prismaService.$queryRaw`
		UPDATE history SET
		has_alert = true,
		frequence = CAST(${frequence} as interval),
		last_execution = ${
			history.last_execution ? history.last_execution : new Date()
		},
		last_results = CAST(${JSON.stringify(
			history.last_results ? history.last_results : [],
		)} as json),
		nb_results = ${history.nb_results ? history.nb_results : 0}
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
