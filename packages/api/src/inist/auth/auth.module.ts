import { Module } from "@nestjs/common";
import { AuthModule } from "../../common/auth/auth.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { InistAccountModule } from "../accounts/accounts.module";
import { InistAuthController } from "./auth.controller";

@Module({
	imports: [PrismaModule, AuthModule, InistAccountModule],
	controllers: [InistAuthController],
})
export class InistAuthModule {}
