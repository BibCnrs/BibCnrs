import { Module } from "@nestjs/common";
import { HttpModule } from "../../common/http/http.module";
import { EbscoRisController } from "./ris.controller";

@Module({
	imports: [HttpModule],
	controllers: [EbscoRisController],
	providers: [],
	exports: [],
})
export class EbscoRisModule {}
