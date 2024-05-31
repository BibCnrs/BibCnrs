import { Module } from "@nestjs/common";
import { AuthGuard } from "../../common/common-auth/common-auth.guard";
import { CommonAuthModule } from "../../common/common-auth/common-auth.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { InistAccountModule } from "../inist-account/inist-account.module";
import { InistAuthController } from "./inist-auth.controller";

@Module({
	imports: [PrismaModule, CommonAuthModule, InistAccountModule],
	controllers: [InistAuthController],
})
export class InistAuthModule {}
