import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { AdminAuthenticationModule } from "../authentication/authentication.module";
import { UnitsController } from "./units.controller";
import { UnitsService } from "./units.service";

@Module({
	controllers: [UnitsController],
	providers: [UnitsService],
	imports: [PrismaModule, AdminAuthenticationModule],
	exports: [UnitsService],
})
export class UnitsModule {}
