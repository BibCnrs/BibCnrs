import path from "node:path";
import { Inject, Injectable } from "@nestjs/common";
import * as winston from "winston";
import { default as DailyRotateFile } from "winston-daily-rotate-file";
import { AbstractLogger, LOG_DIRECTORY } from "./AbstractLogger";

// Since app logger relies on listeners when writing to file, we need to increase the limit to avoid warning.
process.setMaxListeners(32);

export const MAX_LOG_FILE_COUNT = Number.parseInt(
	process.env.MAX_LOG_FILE_COUNT || "30",
	10,
);

@Injectable()
export class AppLogger extends AbstractLogger {
	constructor(@Inject("LogContext") context: string) {
		super(
			process.env.NODE_ENV === "production"
				? new DailyRotateFile({
						filename: path.join(LOG_DIRECTORY, "%DATE%_app.log"),
						format: winston.format.simple(),
						maxFiles: MAX_LOG_FILE_COUNT,
					})
				: new winston.transports.Console({
						format: winston.format.simple(),
					}),
			context,
		);
	}
}
