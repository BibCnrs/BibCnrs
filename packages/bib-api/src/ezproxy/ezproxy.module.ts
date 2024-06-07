import { Module } from "@nestjs/common";
import { CommonAuthModule } from "../common/common-auth/common-auth.module";
import { InistAccountModule } from "../inist/inist-account/inist-account.module";
import { PrismaModule } from "../prisma/prisma.module";
import { SecurityModule } from "../security/security.module";
import { EzProxyService } from "./ez-proxy.service";
import { EzProxyController } from "./ezproxy.controller";

@Module({
	imports: [PrismaModule, InistAccountModule, CommonAuthModule, SecurityModule],
	controllers: [EzProxyController],
	exports: [EzProxyService],
	providers: [EzProxyService],
})
export class EzProxyModule {}
