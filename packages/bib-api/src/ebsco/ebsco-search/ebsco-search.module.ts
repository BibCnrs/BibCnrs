import { Module } from "@nestjs/common";
import { CommonRedisModule } from "../../common/common-redis/common-redis.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoTokenModule } from "../ebsco-token/ebsco-token.module";
import { EbscoSearchPublicationService } from "./ebsco-search-publication.service";
import { EbscoSearchController } from "./ebsco-search.controller";

@Module({
	imports: [PrismaModule, EbscoTokenModule, CommonRedisModule],
	controllers: [EbscoSearchController],
	providers: [EbscoSearchPublicationService],
	exports: [EbscoSearchPublicationService],
})
export class EbscoSearchModule {}
