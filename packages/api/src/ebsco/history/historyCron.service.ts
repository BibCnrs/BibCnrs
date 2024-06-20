import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { subMonths } from "date-fns";
import { AppLogger } from "../../common/logger/AppLogger";
import { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class EbscoHistoryCronService {
	private readonly historyConfig: Config["history"];

	constructor(
		private readonly logger: AppLogger,
		configService: ConfigService<Config, true>,
		private readonly prismaService: PrismaService,
	) {
		this.historyConfig = configService.get("history");
	}

	async cleanOldHistory() {
		this.logger.log("Cleaning old search history");

		const oldestDate = subMonths(
			new Date(),
			this.historyConfig.maxSearchHistoryAgeInMonths,
		);

		const [{ count }] = await this.prismaService.$queryRaw<{ count: string }[]>`WITH deleted AS (
	DELETE FROM history WHERE has_alert is false AND created_at < ${oldestDate}::timestamp RETURNING *
) SELECT count(*) FROM deleted;`;

		this.logger.log(`Deleted ${count} history entries`);
	}
}
