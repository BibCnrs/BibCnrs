import { Module } from "@nestjs/common";
import { AuthGuard } from "../../common/common-auth/common-auth.guard";
import { InistAccountModule } from "../../inist/inist-account/inist-account.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoAuthController } from "./ebsco-auth.controller";
import { EbscoAuthService } from "./ebsco-auth.service";

@Module({
	imports: [PrismaModule, InistAccountModule],
	controllers: [EbscoAuthController],
	providers: [EbscoAuthService, AuthGuard],
	exports: [EbscoAuthService, AuthGuard],
})
export class EbscoAuthModule {}
