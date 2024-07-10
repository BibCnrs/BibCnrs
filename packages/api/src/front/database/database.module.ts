import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { FrontDatabaseController } from "./database.controller";
import { FrontDatabaseService } from "./database.service";

@Module({
	imports: [PrismaModule],
	controllers: [FrontDatabaseController],
	providers: [FrontDatabaseService],
	exports: [FrontDatabaseService],
})
export class FrontDatabaseModule {}
