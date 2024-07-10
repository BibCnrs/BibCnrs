import { Module } from "@nestjs/common";
import { HttpModule } from "../../common/http/http.module";
import { FrontMetadoreController } from "./metadore.controller";
import { FrontMetadoreService } from "./metadore.service";

@Module({
	imports: [HttpModule],
	controllers: [FrontMetadoreController],
	providers: [FrontMetadoreService],
	exports: [FrontMetadoreService],
})
export class FrontMetadoreModule {}
