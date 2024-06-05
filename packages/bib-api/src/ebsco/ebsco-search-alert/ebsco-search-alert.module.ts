import { Module } from "@nestjs/common";
import { CommonAuthModule } from "../../common/common-auth/common-auth.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoSearchAlertController } from "./ebsco-search-alert.controller";
import { EbscoSearchAlertService } from "./ebsco-search-alert.service";

@Module({
	imports: [PrismaModule, CommonAuthModule],
	controllers: [EbscoSearchAlertController],
	providers: [EbscoSearchAlertService],
	exports: [EbscoSearchAlertService],
})
export class EbscoSearchAlertModule {}
