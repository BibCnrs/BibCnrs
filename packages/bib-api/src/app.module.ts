import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "packages/bib-api/src/auth/auth.module";
import config from "packages/bib-api/src/config";
import { MailModule } from "packages/bib-api/src/mail/mail.module";
import { AdminModule } from "./admin/admin.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: true,
			load: [config],
			isGlobal: true,
		}),
		MailModule,
		AuthModule,
		AdminModule,
		PrismaModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
