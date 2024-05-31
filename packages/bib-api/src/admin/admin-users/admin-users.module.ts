import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { SecurityModule } from "../../security/security.module";
import { AdminAuthenticationModule } from "../admin-authentication/admin-authentication.module";
import { AdminUsersController } from "./admin-users.controller";
import { AdminUsersService } from "./admin-users.service";

@Module({
	controllers: [AdminUsersController],
	providers: [AdminUsersService],
	imports: [PrismaModule, SecurityModule, AdminAuthenticationModule],
	exports: [AdminUsersService],
})
export class AdminUsersModule {}
