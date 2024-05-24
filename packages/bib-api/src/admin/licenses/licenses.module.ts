import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { LicensesController } from "./licenses.controller";
import { LicensesService } from "./licenses.service";

@Module({
	controllers: [LicensesController],
	providers: [LicensesService],
	imports: [PrismaModule],
	exports: [LicensesService],
})
export class LicensesModule {}
