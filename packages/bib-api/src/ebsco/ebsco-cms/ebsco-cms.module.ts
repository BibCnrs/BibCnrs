import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoCmsController } from "./ebsco-cms.controller";
import { EbscoCmsService } from "./ebsco-cms.service";

@Module({
	imports: [PrismaModule],
	controllers: [EbscoCmsController],
	providers: [EbscoCmsService],
	exports: [EbscoCmsService],
})
export class EbscoCmsModule {}
