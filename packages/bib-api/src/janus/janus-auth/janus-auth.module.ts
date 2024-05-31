import { Module } from "@nestjs/common";
import { InstitutesModule } from "../../admin/institutes/institutes.module";
import { UnitsModule } from "../../admin/units/units.module";
import { CommonAuthModule } from "../../common/common-auth/common-auth.module";
import { CommonMailModule } from "../../common/common-mail/common-mail.module";
import { CommonRedisModule } from "../../common/common-redis/common-redis.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { JanusAccountModule } from "../janus-accounts/janus-accounts.module";
import { JanusAlertService } from "./janus-alert.service";
import { JanusAuthController } from "./janus-auth.controller";

@Module({
	imports: [
		PrismaModule,
		InstitutesModule,
		UnitsModule,
		JanusAccountModule,
		CommonAuthModule,
		CommonRedisModule,
		CommonMailModule,
	],
	controllers: [JanusAuthController],
	providers: [JanusAlertService],
	exports: [JanusAlertService],
})
export class JanusAuthModule {}
