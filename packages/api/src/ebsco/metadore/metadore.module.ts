import { Module } from "@nestjs/common";
import { EbscoMetadoreController } from "./metadore.controller";
import { EbscoMetadoreService } from "./metadore.service";

@Module({
	imports: [],
	controllers: [EbscoMetadoreController],
	providers: [EbscoMetadoreService],
	exports: [EbscoMetadoreService],
})
export class EbscoMetadoreModule {}
