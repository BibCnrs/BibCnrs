import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { AdminAuthenticationModule } from "../admin-authentication/admin-authentication.module";
import { JanusAccountsController } from "./janus-accounts.controller";
import { JanusAccountsService } from "./janus-accounts.service";

@Module({
	controllers: [JanusAccountsController],
	providers: [JanusAccountsService],
	imports: [PrismaModule, AdminAuthenticationModule],
	exports: [JanusAccountsService],
})
export class JanusAccountsModule {}
