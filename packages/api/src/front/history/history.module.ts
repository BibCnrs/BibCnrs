import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { FrontHistoriesController } from "./histories.controller";
import { FrontHistoryController } from "./history.controller";
import { FrontHistoryService } from "./history.service";
import { FrontHistoryCronService } from "./historyCron.service";

@Module({
	imports: [PrismaModule],
	controllers: [FrontHistoryController, FrontHistoriesController],
	providers: [FrontHistoryService, FrontHistoryCronService],
	exports: [FrontHistoryService],
})
export class FrontHistoryModule {}
