import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoAuthModule } from "../ebsco-auth/ebsco-auth.module";
import { EbscoLicenseController } from "./ebsco-license.controller";
import { EbscoLicenseService } from "./ebsco-license.service";

@Module({
	imports: [PrismaModule, EbscoAuthModule],
	controllers: [EbscoLicenseController],
	providers: [EbscoLicenseService],
	exports: [EbscoLicenseService],
})
export class EbscoLicenseModule {}
