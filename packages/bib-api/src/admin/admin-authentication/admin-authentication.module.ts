import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SecurityModule } from "../../security/security.module";
import { AdminAuthenticationController } from "./admin-authentication.controller";
import { AdminAuthenticationGuard } from "./admin-authentication.guard";
import { AdminAuthenticationService } from "./admin-authentication.service";

@Module({
	imports: [JwtModule, SecurityModule],
	controllers: [AdminAuthenticationController],
	providers: [AdminAuthenticationService, AdminAuthenticationGuard],
	exports: [AdminAuthenticationService, AdminAuthenticationGuard],
})
export class AdminAuthenticationModule {}
