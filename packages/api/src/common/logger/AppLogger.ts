import { Inject, Injectable } from "@nestjs/common";
import { AbstractLogger } from "./AbstractLogger";
import { ConsoleTransport } from "./ConsoleLogger";
import { FileTransport } from "./FileLogger";

@Injectable()
export class AppLogger extends AbstractLogger {
	constructor(@Inject("LogContext") context?: string) {
		super(
			process.env.NODE_ENV === "production"
				? new FileTransport("app.log")
				: new ConsoleTransport(),
			context,
		);
	}
}
