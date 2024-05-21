import { Module } from "@nestjs/common";
import { MailService } from "packages/bib-api/src/mail/mail.service";

@Module({
	imports: [],
	controllers: [],
	providers: [MailService],
})
export class MailModule {}
