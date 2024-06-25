import path from "node:path";
import * as winston from "winston";
import { AbstractLogger, LOG_DIRECTORY } from "./AbstractLogger";

export class FileLogger extends AbstractLogger {
	constructor(file: string, context?: string) {
		super(
			new winston.transports.File({
				filename: path.join(LOG_DIRECTORY, file),
				format: winston.format.simple(),
			}),
			context,
		);
	}
}
