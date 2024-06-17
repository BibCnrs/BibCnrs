import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { ScheduleModule } from "@nestjs/schedule";
import { AdminModule } from "./admin/admin.module";
import { CommonModule } from "./common/common.module";
import config from "./config";
import { EbscoModule } from "./ebsco/ebsco.module";
import { EzTicketModule } from "./ezticket/ezticket.module";
import { FrontModule } from "./front/front.module";
import { InistModule } from "./inist/inist.module";
import { JanusModule } from "./janus/janus.module";
import { PrismaModule } from "./prisma/prisma.module";

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
		ScheduleModule.forRoot(),
		PrismaModule,
		CommonModule,
		JanusModule,
		InistModule,
		AdminModule,
		FrontModule,
		EbscoModule,
		EzTicketModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
