import { Module } from "@nestjs/common";
import { SecurityModule } from "../../common/security/security.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { AdminAuthenticationModule } from "../authentication/authentication.module";
import { AdminUsersController } from "./users.controller";
import { AdminUsersService } from "./users.service";

@Module({
	controllers: [AdminUsersController],
	providers: [AdminUsersService],
	imports: [PrismaModule, SecurityModule, AdminAuthenticationModule],
	exports: [AdminUsersService],
})
export class AdminUsersModule {}
