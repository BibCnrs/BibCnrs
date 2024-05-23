import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "packages/bib-api/src/auth/auth.module";
import config from "packages/bib-api/src/config";
import { EbscoModule } from "packages/bib-api/src/ebsco/ebsco.module";
import { MailModule } from "packages/bib-api/src/mail/mail.module";
import { PrismaModule } from "packages/bib-api/src/prisma/prisma.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: true,
			load: [config],
			isGlobal: true,
		}),
		PrismaModule,
		MailModule,
		AuthModule,
		EbscoModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
