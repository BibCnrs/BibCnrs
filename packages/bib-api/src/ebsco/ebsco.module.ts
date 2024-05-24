import { Module } from "@nestjs/common";
import { EbscoCmsModule } from "./ebsco-cms/ebsco-cms.module";
import { EbscoLicenseModule } from "./ebsco-license/ebsco-license.module";
import { EbscoResourceModule } from "./ebsco-resource/ebsco-resource.module";
import { EbscoTestNewsModule } from "./ebsco-test-news/ebsco-test-news.module";

@Module({
	imports: [
		EbscoCmsModule,
		EbscoLicenseModule,
		EbscoTestNewsModule,
		EbscoResourceModule,
	],
	controllers: [],
	providers: [],
})
export class EbscoModule {}
