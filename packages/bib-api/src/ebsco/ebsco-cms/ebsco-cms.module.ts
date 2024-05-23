import { Module } from "@nestjs/common";
import { EbscoCmsController } from "packages/bib-api/src/ebsco/ebsco-cms/ebsco-cms.controller";
import { EbscoCmsService } from "packages/bib-api/src/ebsco/ebsco-cms/ebsco-cms.service";
import { PrismaModule } from "packages/bib-api/src/prisma/prisma.module";

@Module({
	imports: [PrismaModule],
	controllers: [EbscoCmsController],
	providers: [EbscoCmsService],
	exports: [EbscoCmsService],
})
export class EbscoCmsModule {}
