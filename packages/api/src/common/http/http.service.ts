import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ProxyAgent, RequestInit, fetch } from "undici";
import { Config } from "../../config";
import { AppLogger } from "../logger/AppLogger";

@Injectable()
export class HttpService {
	private readonly dispatcher: ProxyAgent | undefined;
	private readonly logger = new AppLogger(HttpService.name);

	constructor(configService: ConfigService<Config, true>) {
		const httpConfig: Config["http"] = configService.get("http");
		const proxy = httpConfig.httpProxy || httpConfig.httpsProxy;

		this.logger.log(`[PROXY] Using "${proxy}" as proxy server`);

		this.dispatcher = proxy ? new ProxyAgent(proxy) : undefined;
	}

	async request(url: string, options: RequestInit = {}) {
		const start = Date.now();
		options.method = options.method || "GET";

		this.logger.log(`[BEGIN] ${options.method} ${url}`);

		try {
			const response = await fetch(url, {
				...options,
				dispatcher: this.dispatcher,
			});
			this.logger.log(
				`[END] ${options.method} ${url} (status=${response.status}, time=${Date.now() - start}ms)`,
			);
			return response;
		} catch (e) {
			this.logger.error(
				`[ERROR] ${options.method} ${url} (error=${e}, time=${Date.now() - start}ms)`,
			);
			throw e;
		}
	}
}
