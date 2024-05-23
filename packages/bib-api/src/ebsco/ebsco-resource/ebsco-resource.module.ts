import { Module } from "@nestjs/common";
import { EbscoResourceController } from "packages/bib-api/src/ebsco/ebsco-resource/ebsco-resource.controller";
import { EbscoResourceService } from "packages/bib-api/src/ebsco/ebsco-resource/ebsco-resource.service";
import { PrismaModule } from "packages/bib-api/src/prisma/prisma.module";

@Module({
	imports: [PrismaModule],
	controllers: [EbscoResourceController],
	providers: [EbscoResourceService],
	exports: [EbscoResourceService],
})
export class EbscoResourceModule {}
