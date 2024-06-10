import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoTokenGuard } from "./ebsco-token.guard";

@Module({
	imports: [PrismaModule],
	controllers: [],
	providers: [EbscoTokenGuard],
	exports: [EbscoTokenGuard],
})
export class EbscoTokenModule {}
