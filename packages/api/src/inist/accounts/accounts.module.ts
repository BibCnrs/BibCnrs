import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { InistAccountService } from "./accounts.service";

@Module({
	imports: [PrismaModule],
	providers: [InistAccountService],
	exports: [InistAccountService],
})
export class InistAccountModule {}
