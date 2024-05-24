import { Module } from "@nestjs/common";
import { DatabasesController } from "packages/bib-api/src/admin/databases/databases.controller";
import { DatabasesService } from "packages/bib-api/src/admin/databases/databases.service";
import { PrismaModule } from "packages/bib-api/src/prisma/prisma.module";

@Module({
	controllers: [DatabasesController],
	providers: [DatabasesService],
	imports: [PrismaModule],
	exports: [DatabasesService],
})
export class DatabasesModule {}
