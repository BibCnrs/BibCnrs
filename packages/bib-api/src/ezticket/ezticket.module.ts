import { Module } from "@nestjs/common";
import { CommonAuthModule } from "../common/common-auth/common-auth.module";
import { InistAccountModule } from "../inist/inist-account/inist-account.module";
import { PrismaModule } from "../prisma/prisma.module";
import { SecurityModule } from "../security/security.module";
import { EzTicketController } from "./ezticket.controller";
import { EzTicketService } from "./ezticket.service";

@Module({
	imports: [PrismaModule, InistAccountModule, CommonAuthModule, SecurityModule],
	controllers: [EzTicketController],
	exports: [EzTicketService],
	providers: [EzTicketService],
})
export class EzTicketModule {}
