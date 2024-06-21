import * as fs from "node:fs";
import * as path from "node:path";
import { Writable } from "node:stream";
import { AbstractLogger, Transport } from "./AbstractLogger";

export class FileTransport implements Transport {
	private stream: Writable;

	constructor(filePath: string) {
		this.stream = fs.createWriteStream(
			path.join(process.cwd(), "logs", filePath),
			{
				flags: "a",
				autoClose: true,
				mode: 0o666,
			},
		);
		this.stream.on("error", (error) => {
			console.error(`Error opening file: ${error.message}`);
		});
	}

	write(message: string): void {
		this.stream.write(`${message}\n`);
	}

	close() {
		this.stream.end();
	}
}

export class FileLogger extends AbstractLogger {
	constructor(file: string, context?: string) {
		super(new FileTransport(file), context);
	}
}
