import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoHistoriesController } from "./ebsco-histories.controller";
import { EbscoHistoryController } from "./ebsco-history.controller";
import { EbscoHistoryService } from "./ebsco-history.service";

@Module({
	imports: [PrismaModule],
	controllers: [EbscoHistoryController, EbscoHistoriesController],
	providers: [EbscoHistoryService],
	exports: [EbscoHistoryService],
})
export class EbscoHistoryModule {}
