import { Module } from "@nestjs/common";
import { CommonAuthModule } from "../../common/common-auth/common-auth.module";
import { CommonMailModule } from "../../common/common-mail/common-mail.module";
import { CommonRedisModule } from "../../common/common-redis/common-redis.module";
import { JanusAccountModule } from "../../janus/janus-accounts/janus-accounts.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoDomainModule } from "../ebsco-domain/ebsco-domain.module";
import { EbscoSearchModule } from "../ebsco-search/ebsco-search.module";
import { EbscoSearchAlertCronService } from "./ebsco-search-alert-cron.service";
import { EbscoSearchAlertController } from "./ebsco-search-alert.controller";
import { EbscoSearchAlertService } from "./ebsco-search-alert.service";

@Module({
	imports: [
		PrismaModule,
		CommonAuthModule,
		CommonMailModule,
		EbscoDomainModule,
		EbscoSearchModule,
		JanusAccountModule,
	],
	controllers: [EbscoSearchAlertController],
	providers: [EbscoSearchAlertService, EbscoSearchAlertCronService],
	exports: [EbscoSearchAlertService, EbscoSearchAlertCronService],
})
export class EbscoSearchAlertModule {}
