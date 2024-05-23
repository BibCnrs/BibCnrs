import { Module } from "@nestjs/common";
import { EbscoCmsModule } from "packages/bib-api/src/ebsco/ebsco-cms/ebsco-cms.module";
import { EbscoLicenseModule } from "packages/bib-api/src/ebsco/ebsco-license/ebsco-license.module";
import { EbscoTestNewsModule } from "packages/bib-api/src/ebsco/ebsco-test-news/ebsco-test-news.module";

@Module({
	imports: [EbscoCmsModule, EbscoLicenseModule, EbscoTestNewsModule],
	controllers: [],
	providers: [],
})
export class EbscoModule {}
