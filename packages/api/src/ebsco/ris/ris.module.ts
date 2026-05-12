import { Module } from "@nestjs/common";
import { HttpModule } from "../../common/http/http.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoSearchModule } from "../search/search.module";
import { EbscoTokenModule } from "../token/token.module";
import { EbscoRisController } from "./ris.controller";
import { EbscoRisService } from "./ris.service";

@Module({
	imports: [PrismaModule, HttpModule, EbscoTokenModule, EbscoSearchModule],
	controllers: [EbscoRisController],
	providers: [EbscoRisService],
	exports: [],
})
export class EbscoRisModule {}
