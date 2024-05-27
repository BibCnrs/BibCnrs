import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { TestsNewsController } from "./tests-news.controller";
import { TestsNewsService } from "./tests-news.service";

@Module({
	controllers: [TestsNewsController],
	providers: [TestsNewsService],
	imports: [PrismaModule],
	exports: [TestsNewsService],
})
export class TestsNewsModule {}
