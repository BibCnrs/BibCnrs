import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cron } from "@nestjs/schedule";
import { subMonths } from "date-fns";
import { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";

const logger = new Logger("HistoryCronService");

@Injectable()
export class EbscoHistoryCronService {
	private readonly historyConfig: Config["history"];

	constructor(
		configService: ConfigService<Config, true>,
		private readonly prismaService: PrismaService,
	) {
		this.historyConfig = configService.get("history");
	}

	@Cron(process.env.SEARCH_ALERT_CRON || "0 4 * * *")
	async cleanOldHistory() {
		logger.log("Cleaning old search history");

		const oldestDate = subMonths(
			new Date(),
			this.historyConfig.maxSearchHistoryAgeInMonths,
		);

		const [{ count }] = await this.prismaService.$queryRaw<{ count: string }[]>`WITH deleted AS (
	DELETE FROM history WHERE has_alert is false AND created_at < ${oldestDate}::timestamp RETURNING *
) SELECT count(*) FROM deleted;`;

		logger.log(`Deleted ${count} history entries`);
	}
}
