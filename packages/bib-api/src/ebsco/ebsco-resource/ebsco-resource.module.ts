import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoResourceController } from "./ebsco-resource.controller";
import { EbscoResourceService } from "./ebsco-resource.service";

@Module({
	imports: [PrismaModule],
	controllers: [EbscoResourceController],
	providers: [EbscoResourceService],
	exports: [EbscoResourceService],
})
export class EbscoResourceModule {}
