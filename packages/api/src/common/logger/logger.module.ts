import { Module } from "@nestjs/common";
import { AppLogger } from "./AppLogger";

export const logContextFactory = {
	provide: "LogContext",
	useFactory: () => {
		return "App";
	},
};

@Module({
	providers: [logContextFactory, AppLogger],
	exports: [AppLogger],
})
export class LoggerModule {}
