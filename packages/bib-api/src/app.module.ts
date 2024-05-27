import { join } from "node:path";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { AdminModule } from "./admin/admin.module";
import config from "./config";
import { EbscoModule } from "./ebsco/ebsco.module";
import { InistModule } from "./inist/inist.module";
import { MailModule } from "./mail/mail.module";
import { PrismaModule } from "./prisma/prisma.module";
import { SecurityModule } from "./security/security.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: true,
			load: [config],
			isGlobal: true,
		}),
		PrismaModule,
		SecurityModule,
		MailModule,
		InistModule,
		AdminModule,
		EbscoModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
