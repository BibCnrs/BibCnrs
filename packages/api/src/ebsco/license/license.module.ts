import { Module } from "@nestjs/common";
import { AuthModule } from "../../common/auth/auth.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoLicenseController } from "./license.controller";
import { EbscoLicenseService } from "./license.service";

@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [EbscoLicenseController],
	providers: [EbscoLicenseService],
	exports: [EbscoLicenseService],
})
export class EbscoLicenseModule {}
