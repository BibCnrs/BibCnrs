import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { DatabasesController } from "./databases.controller";
import { DatabasesService } from "./databases.service";

@Module({
	controllers: [DatabasesController],
	providers: [DatabasesService],
	imports: [PrismaModule],
	exports: [DatabasesService],
})
export class DatabasesModule {}
