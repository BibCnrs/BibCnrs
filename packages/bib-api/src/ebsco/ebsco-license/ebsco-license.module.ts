import { Module } from "@nestjs/common";
import { EbscoLicenseController } from "packages/bib-api/src/ebsco/ebsco-license/ebsco-license.controller";
import { EbscoLicenseService } from "packages/bib-api/src/ebsco/ebsco-license/ebsco-license.service";
import { PrismaModule } from "packages/bib-api/src/prisma/prisma.module";

@Module({
	imports: [PrismaModule],
	controllers: [EbscoLicenseController],
	providers: [EbscoLicenseService],
	exports: [EbscoLicenseService],
})
export class EbscoLicenseModule {}
