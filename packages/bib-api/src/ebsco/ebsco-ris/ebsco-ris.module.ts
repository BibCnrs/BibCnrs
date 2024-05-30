import { Module } from "@nestjs/common";
import { EbscoRisController } from "./ebsco-ris.controller";

@Module({
	imports: [],
	controllers: [EbscoRisController],
	providers: [],
	exports: [],
})
export class EbscoRisModule {}
