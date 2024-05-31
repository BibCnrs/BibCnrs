import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { JanusAccountController } from "./janus-accounts.controller";
import { JanusAccountService } from "./janus-accounts.service";

@Module({
	imports: [PrismaModule],
	controllers: [JanusAccountController],
	providers: [JanusAccountService],
	exports: [JanusAccountService],
})
export class JanusAccountModule {}
