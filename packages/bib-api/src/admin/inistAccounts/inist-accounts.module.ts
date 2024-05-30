import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { InistAccountsController } from "./inist-accounts.controller";
import { InistAccountsService } from "./inist-accounts.service";

@Module({
	controllers: [InistAccountsController],
	providers: [InistAccountsService],
	imports: [PrismaModule],
	exports: [InistAccountsService],
})
export class InistAccountsModule {}
