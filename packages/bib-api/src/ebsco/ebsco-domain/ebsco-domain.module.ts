import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoDomainController } from "./ebsco-domain.controller";
import { EbscoDomainService } from "./ebsco-domain.service";

@Module({
	imports: [PrismaModule],
	controllers: [EbscoDomainController],
	providers: [EbscoDomainService],
	exports: [EbscoDomainService],
})
export class EbscoDomainModule {}
