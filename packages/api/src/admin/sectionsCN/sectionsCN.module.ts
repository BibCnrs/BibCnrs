import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { AdminAuthenticationModule } from "../authentication/authentication.module";
import { SectionsCNController } from "./sectionsCN.controller";
import { SectionsCNService } from "./sectionsCN.service";

@Module({
	controllers: [SectionsCNController],
	providers: [SectionsCNService],
	imports: [PrismaModule, AdminAuthenticationModule],
	exports: [SectionsCNService],
})
export class SectionsCNModule {}
