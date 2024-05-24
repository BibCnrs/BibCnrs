import { Module } from "@nestjs/common";
import { EbscoAuthModule } from "./ebsco-auth/ebsco-auth.module";
import { EbscoCmsModule } from "./ebsco-cms/ebsco-cms.module";
import { EbscoLicenseModule } from "./ebsco-license/ebsco-license.module";
import { EbscoResourceModule } from "./ebsco-resource/ebsco-resource.module";
import { EbscoTestNewsModule } from "./ebsco-test-news/ebsco-test-news.module";

@Module({
	imports: [
		EbscoAuthModule,
		EbscoCmsModule,
		EbscoLicenseModule,
		EbscoTestNewsModule,
		EbscoResourceModule,
	],
})
export class EbscoModule {}
