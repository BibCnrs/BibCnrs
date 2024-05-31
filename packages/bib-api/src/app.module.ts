import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AdminModule } from "./admin/admin.module";
import config from "./config";
import { EbscoModule } from "./ebsco/ebsco.module";
import { InistModule } from "./inist/inist.module";
import { JanusModule } from "./janus/janus.module";
import { MailModule } from "./mail/mail.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RenaterModule } from "./renater/renater.module";
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
		PrismaModule,
		SecurityModule,
		MailModule,
		RenaterModule,
		JanusModule,
		InistModule,
		EbscoModule,
		AdminModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
