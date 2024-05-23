import { Module } from "@nestjs/common";
import { EbscoTestNewsController } from "packages/bib-api/src/ebsco/ebsco-test-news/ebsco-test-news.controller";
import { EbscoTestNewsService } from "packages/bib-api/src/ebsco/ebsco-test-news/ebsco-test-news.service";
import { PrismaModule } from "packages/bib-api/src/prisma/prisma.module";

@Module({
	imports: [PrismaModule],
	controllers: [EbscoTestNewsController],
	providers: [EbscoTestNewsService],
	exports: [EbscoTestNewsService],
})
export class EbscoTestNewsModule {}
