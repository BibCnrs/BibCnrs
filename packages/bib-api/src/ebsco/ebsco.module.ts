import { Module } from "@nestjs/common";
import { EbscoCmsModule } from "packages/bib-api/src/ebsco/ebsco-cms/ebsco-cms.module";

@Module({
	imports: [EbscoCmsModule],
	controllers: [],
	providers: [],
})
export class EbscoModule {}
