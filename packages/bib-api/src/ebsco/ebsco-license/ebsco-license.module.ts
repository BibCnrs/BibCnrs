import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoLicenseController } from "./ebsco-license.controller";
import { EbscoLicenseService } from "./ebsco-license.service";

@Module({
	imports: [PrismaModule],
	controllers: [EbscoLicenseController],
	providers: [EbscoLicenseService],
	exports: [EbscoLicenseService],
})
export class EbscoLicenseModule {}
