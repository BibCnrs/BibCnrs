import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { InistAccountService } from "./inist-account.service";

@Module({
	imports: [PrismaModule],
	providers: [InistAccountService],
	exports: [InistAccountService],
})
export class InistAccountModule {}
