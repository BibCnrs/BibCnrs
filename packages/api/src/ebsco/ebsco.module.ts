import { Module } from "@nestjs/common";
import { EbscoDomainModule } from "./domain/domain.module";
import { EbscoOaModule } from "./oa/oa.module";
import { EbscoRisModule } from "./ris/ris.module";
import { EbscoSearchModule } from "./search/search.module";
import { EbscoSearchAlertModule } from "./searchAlert/searchAlert.module";
import { EbscoTokenModule } from "./token/token.module";

@Module({
	imports: [
		EbscoDomainModule,
		EbscoRisModule,
		EbscoOaModule,
		EbscoSearchAlertModule,
		EbscoTokenModule,
		EbscoSearchModule,
	],
})
export class EbscoModule {}
