import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";
import { Config } from "../../config";

@Injectable()
export class CommonMailService {
	private readonly transport: nodemailer.Transporter;

	constructor(private configService: ConfigService<Config, true>) {
		const mailerConfig = this.configService.get<Config["mailer"]>("mailer");
		this.transport = nodemailer.createTransport({
			...mailerConfig,
			ignoreTLS: true,
		});
	}

	get from() {
		return this.configService.get<Config["mailer"]>("mailer").from;
	}

	sendMail(mail: nodemailer.SendMailOptions | null) {
		if (!mail) {
			return;
		}
		return this.transport.sendMail(mail);
	}
}
