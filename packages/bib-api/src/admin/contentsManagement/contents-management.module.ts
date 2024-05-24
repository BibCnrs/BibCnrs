import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { ContentsManagementController } from "./contents-management.controller";
import { ContentsManagementService } from "./contents-management.service";

@Module({
	controllers: [ContentsManagementController],
	providers: [ContentsManagementService],
	imports: [PrismaModule],
	exports: [ContentsManagementService],
})
export class ContentsManagementModule {}
