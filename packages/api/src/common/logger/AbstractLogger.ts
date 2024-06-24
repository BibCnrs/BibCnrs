import { LogLevel, LoggerService } from "@nestjs/common";

export interface Transport {
	write(message: string): void;
	close(): void;
}

export class AbstractLogger implements LoggerService {
	private transport: Transport;

	protected context?: string;
	protected options: { timestamp?: boolean };
	protected localInstanceRef?: LoggerService;
	protected logLevels = new Set<LogLevel>([
		"log",
		"error",
		"warn",
		"debug",
		"verbose",
		"fatal",
	]);

	get localInstance(): LoggerService {
		return this.localInstanceRef;
	}

	constructor(
		transport: Transport,
		context?: string,
		options = { timestamp: true },
	) {
		this.transport = transport;
		this.context = context;
		this.options = options;
		this.localInstanceRef = this;

		process.on("beforeExit", () => {
			transport.close();
		});
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	private _log(level: LogLevel, message: any, ...optionalParams: any[]) {
		if (!this.logLevels.has(level)) {
			return;
		}
		this.transport.write(
			`[${this.context ?? "Nest"}] ${this.options.timestamp ? `${new Date().toISOString()} ` : ""}${level.toLocaleUpperCase()} - ${message} ${optionalParams?.join(",")}`,
		);
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	log(message: any, ...optionalParams: any[]) {
		this._log("log", message, ...optionalParams);
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	error(message: any, ...optionalParams: any[]) {
		this._log("error", message, ...optionalParams);
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	warn(message: any, ...optionalParams: any[]) {
		this._log("warn", message, ...optionalParams);
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	debug?(message: any, ...optionalParams: any[]) {
		this._log("debug", message, ...optionalParams);
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	verbose?(message: any, ...optionalParams: any[]) {
		this._log("verbose", message, ...optionalParams);
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	fatal?(message: any, ...optionalParams: any[]) {
		this._log("fatal", message, ...optionalParams);
	}

	setLogLevels?(levels: LogLevel[]) {
		this.logLevels = new Set(levels);
	}
}
