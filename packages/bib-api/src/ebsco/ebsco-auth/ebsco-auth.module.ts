import { Module } from "@nestjs/common";
import { InistAccountModule } from "../../inist/inist-account/inist-account.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoAuthController } from "./ebsco-auth.controller";
import { EbscoAuthGuard } from "./ebsco-auth.guard";
import { EbscoAuthService } from "./ebsco-auth.service";

@Module({
	imports: [PrismaModule, InistAccountModule],
	controllers: [EbscoAuthController],
	providers: [EbscoAuthService, EbscoAuthGuard],
	exports: [EbscoAuthService, EbscoAuthGuard],
})
export class EbscoAuthModule {}
