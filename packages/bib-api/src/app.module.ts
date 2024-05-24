import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AdminModule } from "./admin/admin.module";
import config from "./config";
import { EbscoModule } from "./ebsco/ebsco.module";
import { MailModule } from "./mail/mail.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: true,
			load: [config],
			isGlobal: true,
		}),
		MailModule,
		AdminModule,
		PrismaModule,
		EbscoModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
