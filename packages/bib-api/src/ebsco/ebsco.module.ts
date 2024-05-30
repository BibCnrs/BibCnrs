import { Module } from "@nestjs/common";
import { EbscoAuthModule } from "./ebsco-auth/ebsco-auth.module";
import { EbscoCmsModule } from "./ebsco-cms/ebsco-cms.module";
import { EbscoDomainModule } from "./ebsco-domain/ebsco-domain.module";
import { EbscoHistoryModule } from "./ebsco-history/ebsco-history.module";
import { EbscoLicenseModule } from "./ebsco-license/ebsco-license.module";
import { EbscoResourceModule } from "./ebsco-resource/ebsco-resource.module";
import { EbscoRisModule } from "./ebsco-ris/ebsco-ris.module";
import { EbscoTestNewsModule } from "./ebsco-test-news/ebsco-test-news.module";

@Module({
	imports: [
		EbscoAuthModule,
		EbscoCmsModule,
		EbscoDomainModule,
		EbscoLicenseModule,
		EbscoTestNewsModule,
		EbscoResourceModule,
		EbscoHistoryModule,
		EbscoRisModule,
	],
})
export class EbscoModule {}
