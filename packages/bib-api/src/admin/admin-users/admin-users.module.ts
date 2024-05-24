import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { AdminUsersController } from "./admin-users.controller";
import { AdminUsersService } from "./admin-users.service";

@Module({
	controllers: [AdminUsersController],
	providers: [AdminUsersService],
	imports: [PrismaModule],
	exports: [AdminUsersService],
})
export class AdminUsersModule {}
