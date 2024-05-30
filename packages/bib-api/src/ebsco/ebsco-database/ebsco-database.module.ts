import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoDatabaseController } from "./ebsco-database.controller";
import { EbscoDatabaseService } from "./ebsco-database.service";

@Module({
	imports: [PrismaModule],
	controllers: [EbscoDatabaseController],
	providers: [EbscoDatabaseService],
	exports: [EbscoDatabaseService],
})
export class EbscoDatabaseModule {}
