import { Module } from "@nestjs/common";
import { AuthModule } from "../../common/auth/auth.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { FrontLicenseController } from "./license.controller";
import { FrontLicenseService } from "./license.service";

@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [FrontLicenseController],
	providers: [FrontLicenseService],
	exports: [FrontLicenseService],
})
export class FrontLicenseModule {}
