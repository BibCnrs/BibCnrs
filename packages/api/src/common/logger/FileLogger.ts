import path from "node:path";
import * as winston from "winston";
import { default as DailyRotateFile } from "winston-daily-rotate-file";
import { AbstractLogger, LOG_DIRECTORY } from "./AbstractLogger";
import { MAX_LOG_FILE_COUNT } from "./AppLogger";

export class FileLogger extends AbstractLogger {
	constructor(file: string, context?: string) {
		super(
			new DailyRotateFile({
				filename: path.join(LOG_DIRECTORY, file),
				format: winston.format.simple(),
				maxFiles: MAX_LOG_FILE_COUNT,
			}),
			context,
		);
	}
}

export class OAFileLogger extends AbstractLogger {
	constructor(file: string, context?: string) {
		super(
			new DailyRotateFile({
				filename: path.join(LOG_DIRECTORY, file),
				format: winston.format.json(),
				maxFiles: MAX_LOG_FILE_COUNT,
			}),
			context,
		);
	}
}
