import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoTestNewsController } from "./ebsco-test-news.controller";
import { EbscoTestNewsService } from "./ebsco-test-news.service";

@Module({
	imports: [PrismaModule],
	controllers: [EbscoTestNewsController],
	providers: [EbscoTestNewsService],
	exports: [EbscoTestNewsService],
})
export class EbscoTestNewsModule {}
