import { Module } from "@nestjs/common";
import { AdminUsersController } from "packages/bib-api/src/admin/admin-users/admin-users.controller";
import { AdminUsersService } from "packages/bib-api/src/admin/admin-users/admin-users.service";
import { PrismaModule } from "packages/bib-api/src/prisma/prisma.module";

@Module({
	controllers: [AdminUsersController],
	providers: [AdminUsersService],
	imports: [PrismaModule],
	exports: [AdminUsersService],
})
export class AdminUsersModule {}
