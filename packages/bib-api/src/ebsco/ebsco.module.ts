import { Module } from "@nestjs/common";
import { EbscoCmsModule } from "packages/bib-api/src/ebsco/ebsco-cms/ebsco-cms.module";
import { EbscoLicenseModule } from "packages/bib-api/src/ebsco/ebsco-license/ebsco-license.module";
import { EbscoResourceModule } from "packages/bib-api/src/ebsco/ebsco-resource/ebsco-resource.module";

@Module({
	imports: [EbscoCmsModule, EbscoLicenseModule, EbscoResourceModule],
	controllers: [],
	providers: [],
})
export class EbscoModule {}
