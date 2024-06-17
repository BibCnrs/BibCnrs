import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoResourceController } from "./resource.controller";
import { EbscoResourceService } from "./resource.service";

@Module({
	imports: [PrismaModule],
	controllers: [EbscoResourceController],
	providers: [EbscoResourceService],
	exports: [EbscoResourceService],
})
export class EbscoResourceModule {}
