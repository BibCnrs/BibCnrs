import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoDatabaseController } from "./database.controller";
import { EbscoDatabaseService } from "./database.service";

@Module({
	imports: [PrismaModule],
	controllers: [EbscoDatabaseController],
	providers: [EbscoDatabaseService],
	exports: [EbscoDatabaseService],
})
export class EbscoDatabaseModule {}
