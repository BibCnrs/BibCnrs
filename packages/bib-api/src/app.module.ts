import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AdminModule } from "packages/bib-api/src/admin/admin.module";
import { AppController } from "packages/bib-api/src/app.controller";
import { AppService } from "packages/bib-api/src/app.service";
import { AuthModule } from "packages/bib-api/src/auth/auth.module";
import config from "packages/bib-api/src/config";
import { EbscoModule } from "packages/bib-api/src/ebsco/ebsco.module";
import { MailModule } from "packages/bib-api/src/mail/mail.module";
import { PrismaModule } from "packages/bib-api/src/prisma/prisma.module";

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
		EbscoModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
