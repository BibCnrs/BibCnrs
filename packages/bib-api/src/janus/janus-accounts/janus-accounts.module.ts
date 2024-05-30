import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { JanusAccountService } from "./janus-accounts.service";

@Module({
	imports: [PrismaModule],
	providers: [JanusAccountService],
	exports: [JanusAccountService],
})
export class JanusAccountModule {}
