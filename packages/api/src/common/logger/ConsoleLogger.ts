import { AbstractLogger, Transport } from "./AbstractLogger";

export class ConsoleTransport implements Transport {
	write(message: string): void {
		console.log(`${message}`);
	}

	close() {}
}

export class ConsoleLogger extends AbstractLogger {
	constructor(context?: string) {
		super(new ConsoleTransport(), context);
	}
}
