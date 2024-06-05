import { Module } from "@nestjs/common";
import { CommonRedisModule } from "../../common/common-redis/common-redis.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoTokenModule } from "../ebsco-token/ebsco-token.module";
import { EbscoSearchArticleService } from "./ebsco-search-article.service";
import { EbscoSearchPublicationService } from "./ebsco-search-publication.service";
import { EbscoSearchController } from "./ebsco-search.controller";

@Module({
	imports: [PrismaModule, EbscoTokenModule, CommonRedisModule],
	controllers: [EbscoSearchController],
	providers: [EbscoSearchPublicationService, EbscoSearchArticleService],
	exports: [EbscoSearchPublicationService, EbscoSearchArticleService],
})
export class EbscoSearchModule {}
