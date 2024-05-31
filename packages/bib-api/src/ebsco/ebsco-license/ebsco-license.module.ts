import { Module } from "@nestjs/common";
import { CommonAuthModule } from "../../common/common-auth/common-auth.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoLicenseController } from "./ebsco-license.controller";
import { EbscoLicenseService } from "./ebsco-license.service";

@Module({
	imports: [PrismaModule, CommonAuthModule],
	controllers: [EbscoLicenseController],
	providers: [EbscoLicenseService],
	exports: [EbscoLicenseService],
})
export class EbscoLicenseModule {}
