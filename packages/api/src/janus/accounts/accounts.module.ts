import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { JanusAccountService } from "./accounts.service";

@Module({
	imports: [PrismaModule],
	controllers: [],
	providers: [JanusAccountService],
	exports: [JanusAccountService],
})
export class JanusAccountModule {}
