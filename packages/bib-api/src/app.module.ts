import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AdminModule } from "./admin/admin.module";
import { CommonModule } from "./common/common.module";
import config from "./config";
import { EbscoModule } from "./ebsco/ebsco.module";
import { EzTicketModule } from "./ezticket/ezticket.module";
import { InistModule } from "./inist/inist.module";
import { JanusModule } from "./janus/janus.module";
import { PrismaModule } from "./prisma/prisma.module";
import { SecurityModule } from "./security/security.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: true,
			load: [config],
			isGlobal: true,
		}),
		JwtModule.register({
			global: true,
		}),
		CommonModule,
		PrismaModule,
		SecurityModule,
		JanusModule,
		InistModule,
		EbscoModule,
		EzTicketModule,
		AdminModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
