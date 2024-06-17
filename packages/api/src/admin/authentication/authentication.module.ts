import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SecurityModule } from "../../common/security/security.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { AdminAuthenticationController } from "./authentication.controller";
import { AdminAuthenticationGuard } from "./authentication.guard";
import { AdminAuthenticationService } from "./authentication.service";

@Module({
	imports: [PrismaModule, JwtModule, SecurityModule],
	controllers: [AdminAuthenticationController],
	providers: [AdminAuthenticationService, AdminAuthenticationGuard],
	exports: [AdminAuthenticationService, AdminAuthenticationGuard],
})
export class AdminAuthenticationModule {}
