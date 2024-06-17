import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoDomainController } from "./domain.controller";
import { EbscoDomainService } from "./domain.service";

@Module({
	imports: [PrismaModule],
	controllers: [EbscoDomainController],
	providers: [EbscoDomainService],
	exports: [EbscoDomainService],
})
export class EbscoDomainModule {}
