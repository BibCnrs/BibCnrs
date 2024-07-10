import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoDomainService } from "./domain.service";

@Module({
	imports: [PrismaModule],
	controllers: [],
	providers: [EbscoDomainService],
	exports: [EbscoDomainService],
})
export class EbscoDomainModule {}
