import { Module } from "@nestjs/common";
import { HttpModule } from "../../common/http/http.module";
import { EbscoMetadoreController } from "./metadore.controller";
import { EbscoMetadoreService } from "./metadore.service";

@Module({
	imports: [HttpModule],
	controllers: [EbscoMetadoreController],
	providers: [EbscoMetadoreService],
	exports: [EbscoMetadoreService],
})
export class EbscoMetadoreModule {}
