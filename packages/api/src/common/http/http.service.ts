import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ProxyAgent, RequestInit, fetch } from "undici";
import { Config } from "../../config";

@Injectable()
export class HttpService {
	private readonly dispatcher: ProxyAgent | undefined;

	constructor(configService: ConfigService<Config, true>) {
		const httpConfig: Config["http"] = configService.get("http");

		this.dispatcher = httpConfig.httpsProxy
			? new ProxyAgent(httpConfig.httpsProxy)
			: httpConfig.httpProxy
				? new ProxyAgent(httpConfig.httpProxy)
				: undefined;
	}

	async request(url: string, options?: RequestInit) {
		return fetch(url, {
			...options,
			dispatcher: this.dispatcher,
		});
	}
}
