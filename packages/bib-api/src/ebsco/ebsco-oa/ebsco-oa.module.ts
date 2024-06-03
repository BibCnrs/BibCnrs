import { Module } from "@nestjs/common";
import { InstitutesModule } from "../../admin/institutes/institutes.module";
import { UnitsModule } from "../../admin/units/units.module";
import { InistAccountModule } from "../../inist/inist-account/inist-account.module";
import { JanusAccountModule } from "../../janus/janus-accounts/janus-accounts.module";
import { PrismaModule } from "../../prisma/prisma.module";

@Module({
	imports: [
		PrismaModule,
		JanusAccountModule,
		InistAccountModule,
		InstitutesModule,
		UnitsModule,
	],
	controllers: [],
	providers: [],
	exports: [],
})
export class EbscoOaModule {}
