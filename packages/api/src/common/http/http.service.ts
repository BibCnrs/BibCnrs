import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios, { type AxiosRequestConfig } from "axios";
import { Config } from "../../config";
import { AppLogger } from "../logger/AppLogger";

@Injectable()
export class HttpService {
	private readonly logger = new AppLogger(HttpService.name);

	constructor(configService: ConfigService<Config, true>) {
		const httpConfig: Config["http"] = configService.get("http");

		const proxy = httpConfig.httpProxy || httpConfig.httpsProxy;
		this.logger.log(`[PROXY] Using "${proxy}" as proxy server`);
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	async request<R = any, D = any>(
		url: string,
		options: AxiosRequestConfig<D> = {},
	) {
		const start = Date.now();
		options.method = options.method || "GET";

		this.logger.log(`[BEGIN] ${options.method} ${url}`);

		try {
			const response = await axios<R>({
				...options,
				url,
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
