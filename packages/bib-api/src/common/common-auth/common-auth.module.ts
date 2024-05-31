import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { AuthGuard } from "./common-auth.guard";
import { CommonAuthService } from "./common-auth.service";

@Module({
	imports: [PrismaModule],
	controllers: [],
	providers: [CommonAuthService, AuthGuard],
	exports: [CommonAuthService, AuthGuard],
})
export class CommonAuthModule {}
