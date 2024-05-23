import { Module } from "@nestjs/common";
import { RevuesController } from "packages/bib-api/src/admin/revues/revues.controller";
import { RevuesService } from "packages/bib-api/src/admin/revues/revues.service";
import { PrismaModule } from "packages/bib-api/src/prisma/prisma.module";

@Module({
	controllers: [RevuesController],
	providers: [RevuesService],
	imports: [PrismaModule],
	exports: [RevuesService],
})
export class RevuesModule {}
