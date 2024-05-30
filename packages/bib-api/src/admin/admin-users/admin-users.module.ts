import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { SecurityModule } from "../../security/security.module";
import { AdminUsersController } from "./admin-users.controller";
import { AdminUsersService } from "./admin-users.service";

@Module({
	controllers: [AdminUsersController],
	providers: [AdminUsersService],
	imports: [PrismaModule, SecurityModule],
	exports: [AdminUsersService],
})
export class AdminUsersModule {}
