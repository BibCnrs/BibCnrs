import { Module } from "@nestjs/common";
import { EbscoMetadoreController } from "./ebsco-metadore.controller";
import { EbscoMetadoreService } from "./ebsco-metadore.service";

@Module({
	imports: [],
	controllers: [EbscoMetadoreController],
	providers: [EbscoMetadoreService],
	exports: [EbscoMetadoreService],
})
export class EbscoMetadoreModule {}
