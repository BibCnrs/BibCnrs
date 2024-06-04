import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoTokenModule } from "../ebsco-token/ebsco-token.module";
import { EbscoSearchController } from "./ebsco-search.controller";
import { EbscoSearchService } from "./ebsco-search.service";

@Module({
	imports: [PrismaModule, EbscoTokenModule],
	controllers: [EbscoSearchController],
	providers: [EbscoSearchService],
	exports: [EbscoSearchService],
})
export class EbscoSearchModule {}
