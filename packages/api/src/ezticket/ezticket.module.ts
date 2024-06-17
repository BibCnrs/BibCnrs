import { Module } from "@nestjs/common";
import { AuthModule } from "../common/auth/auth.module";
import { SecurityModule } from "../common/security/security.module";
import { InistAccountModule } from "../inist/accounts/accounts.module";
import { PrismaModule } from "../prisma/prisma.module";
import { EzTicketController } from "./ezticket.controller";
import { EzTicketService } from "./ezticket.service";

@Module({
	imports: [PrismaModule, InistAccountModule, AuthModule, SecurityModule],
	controllers: [EzTicketController],
	exports: [EzTicketService],
	providers: [EzTicketService],
})
export class EzTicketModule {}
