import { Module } from "@nestjs/common";
import { InstitutesModule } from "../../admin/institutes/institutes.module";
import { UnitsModule } from "../../admin/units/units.module";
import { LoggerModule } from "../../common/logger/logger.module";
import { InistAccountModule } from "../../inist/accounts/accounts.module";
import { JanusAccountModule } from "../../janus/accounts/accounts.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoOaController } from "./oa.controller";

@Module({
	imports: [
		PrismaModule,
		JanusAccountModule,
		InistAccountModule,
		InstitutesModule,
		UnitsModule,
		LoggerModule,
	],
	controllers: [EbscoOaController],
	providers: [],
	exports: [],
})
export class EbscoOaModule {}
