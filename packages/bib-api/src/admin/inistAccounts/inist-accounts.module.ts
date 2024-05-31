import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { AdminAuthenticationModule } from "../admin-authentication/admin-authentication.module";
import { InistAccountsController } from "./inist-accounts.controller";
import { InistAccountsService } from "./inist-accounts.service";

@Module({
	controllers: [InistAccountsController],
	providers: [InistAccountsService],
	imports: [PrismaModule, AdminAuthenticationModule],
	exports: [InistAccountsService],
})
export class InistAccountsModule {}
