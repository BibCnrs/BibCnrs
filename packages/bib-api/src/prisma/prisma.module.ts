import { Module } from "@nestjs/common";
import { PrismaService } from "packages/bib-api/src/prisma/prisma.service";

@Module({
	imports: [],
	controllers: [],
	providers: [PrismaService],
	exports: [PrismaService],
})
export class PrismaModule {}
