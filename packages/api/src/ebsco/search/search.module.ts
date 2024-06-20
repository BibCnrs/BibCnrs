import { Module } from "@nestjs/common";
import { HttpModule } from "../../common/http/http.module";
import { RedisModule } from "../../common/redis/redis.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoTokenModule } from "../token/token.module";
import { EbscoSearchController } from "./search.controller";
import { EbscoSearchArticleService } from "./searchArticle.service";
import { EbscoSearchPublicationService } from "./searchPublication.service";

@Module({
	imports: [PrismaModule, EbscoTokenModule, RedisModule, HttpModule],
	controllers: [EbscoSearchController],
	providers: [EbscoSearchPublicationService, EbscoSearchArticleService],
	exports: [EbscoSearchPublicationService, EbscoSearchArticleService],
})
export class EbscoSearchModule {}
