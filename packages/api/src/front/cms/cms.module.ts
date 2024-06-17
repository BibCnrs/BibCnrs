import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { FrontCmsController } from "./cms.controller";
import { FrontCmsService } from "./cms.service";

@Module({
	imports: [PrismaModule],
	controllers: [FrontCmsController],
	providers: [FrontCmsService],
	exports: [FrontCmsService],
})
export class FrontCmsModule {}
