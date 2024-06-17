import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { AdminAuthenticationModule } from "../authentication/authentication.module";
import { RevuesController } from "./revues.controller";
import { RevuesService } from "./revues.service";

@Module({
	controllers: [RevuesController],
	providers: [RevuesService],
	imports: [PrismaModule, AdminAuthenticationModule],
	exports: [RevuesService],
})
export class RevuesModule {}
