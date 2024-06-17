import { Module } from "@nestjs/common";
import { InstitutesModule } from "../../admin/institutes/institutes.module";
import { UnitsModule } from "../../admin/units/units.module";
import { AuthModule } from "../../common/auth/auth.module";
import { MailModule } from "../../common/mail/mail.module";
import { RedisModule } from "../../common/redis/redis.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { JanusAccountModule } from "../accounts/accounts.module";
import { JanusAlertService } from "./alert.service";
import { JanusAuthController } from "./auth.controller";

@Module({
	imports: [
		PrismaModule,
		InstitutesModule,
		UnitsModule,
		JanusAccountModule,
		AuthModule,
		RedisModule,
		MailModule,
	],
	controllers: [JanusAuthController],
	providers: [JanusAlertService],
	exports: [JanusAlertService],
})
export class JanusAuthModule {}
