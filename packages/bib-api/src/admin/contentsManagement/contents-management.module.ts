import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { AdminAuthenticationModule } from "../admin-authentication/admin-authentication.module";
import { ContentsManagementController } from "./contents-management.controller";
import { ContentsManagementService } from "./contents-management.service";

@Module({
	controllers: [ContentsManagementController],
	providers: [ContentsManagementService],
	imports: [PrismaModule, AdminAuthenticationModule],
	exports: [ContentsManagementService],
})
export class ContentsManagementModule {}
