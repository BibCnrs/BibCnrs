import { Module } from "@nestjs/common";
import { AuthModule } from "../../common/auth/auth.module";
import { MailModule } from "../../common/mail/mail.module";
import { JanusAccountModule } from "../../janus/accounts/accounts.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoDomainModule } from "../domain/domain.module";
import { EbscoSearchModule } from "../search/search.module";
import { EbscoSearchAlertController } from "./searchAlert.controller";
import { EbscoSearchAlertService } from "./searchAlert.service";
import { EbscoSearchAlertCronService } from "./searchAlertCron.service";

@Module({
	imports: [
		PrismaModule,
		AuthModule,
		MailModule,
		EbscoDomainModule,
		EbscoSearchModule,
		JanusAccountModule,
	],
	controllers: [EbscoSearchAlertController],
	providers: [EbscoSearchAlertService, EbscoSearchAlertCronService],
	exports: [EbscoSearchAlertService, EbscoSearchAlertCronService],
})
export class EbscoSearchAlertModule {}
