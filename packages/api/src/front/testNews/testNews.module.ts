import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { FrontTestNewsController } from "./testNews.controller";
import { FrontTestNewsService } from "./testNews.service";

@Module({
	imports: [PrismaModule],
	controllers: [FrontTestNewsController],
	providers: [FrontTestNewsService],
	exports: [FrontTestNewsService],
})
export class FrontTestNewsModule {}
