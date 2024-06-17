import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoHistoriesController } from "./ebsco-histories.controller";
import { EbscoHistoryCronService } from "./ebsco-history-cron.service";
import { EbscoHistoryController } from "./ebsco-history.controller";
import { EbscoHistoryService } from "./ebsco-history.service";

@Module({
	imports: [PrismaModule],
	controllers: [EbscoHistoryController, EbscoHistoriesController],
	providers: [EbscoHistoryService, EbscoHistoryCronService],
	exports: [EbscoHistoryService],
})
export class EbscoHistoryModule {}
