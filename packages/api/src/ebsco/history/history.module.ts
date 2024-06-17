import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoHistoriesController } from "./histories.controller";
import { EbscoHistoryController } from "./history.controller";
import { EbscoHistoryService } from "./history.service";
import { EbscoHistoryCronService } from "./historyCron.service";

@Module({
	imports: [PrismaModule],
	controllers: [EbscoHistoryController, EbscoHistoriesController],
	providers: [EbscoHistoryService, EbscoHistoryCronService],
	exports: [EbscoHistoryService],
})
export class EbscoHistoryModule {}
