import path from "node:path";
import * as winston from "winston";
import { default as DailyRotateFile } from "winston-daily-rotate-file";
import { AbstractLogger, LOG_DIRECTORY } from "./AbstractLogger";

export class FileLogger extends AbstractLogger {
	constructor(file: string, context?: string) {
		super(
			new DailyRotateFile({
				filename: path.join(LOG_DIRECTORY, file),
				format: winston.format.simple(),
			}),
			context,
		);
	}
}
