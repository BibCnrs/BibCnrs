import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { AdminAuthenticationModule } from "../admin-authentication/admin-authentication.module";
import { InstitutesController } from "./institutes.controller";
import { InstitutesService } from "./institutes.service";

@Module({
	controllers: [InstitutesController],
	providers: [InstitutesService],
	imports: [PrismaModule, AdminAuthenticationModule],
	exports: [InstitutesService],
})
export class InstitutesModule {}
