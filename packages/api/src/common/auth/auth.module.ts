import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { UserRetrieveGuard } from "./userRetrieveGuard";

@Module({
	imports: [PrismaModule],
	controllers: [],
	providers: [AuthService, AuthGuard, UserRetrieveGuard],
	exports: [AuthService, AuthGuard, UserRetrieveGuard],
})
export class AuthModule {}
