import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios, { AxiosResponse, type AxiosRequestConfig } from "axios";
import { ParsedQs } from "qs";
import { Config } from "../../config";
import { AppLogger } from "../logger/AppLogger";

type Response<R> =
	| {
			status: 200 | 201;
			data: R;
	  }
	| {
			status: 400 | 401 | 403 | 404 | 429 | 500;
			data?: unknown;
	  };

@Injectable()
export class HttpService {
	get(
		baseUrl: string,
		arg1: {
			params: {
				menuid: string | string[] | ParsedQs | ParsedQs[];
				resourcetype: string | string[] | ParsedQs | ParsedQs[];
			};
			headers: { Accept: string };
		},
	) {
		return this.request(baseUrl, {
			method: "GET",
		});
	}
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
	): Promise<Response<R>> {
		const start = Date.now();
		options.method = options.method || "GET";

		this.logger.log(`[BEGIN] ${options.method} ${url}`);

		try {
			const response = await axios<R, AxiosResponse<R, D>, D>({
				...options,
				url,
			});
			this.logger.log(
				`[END] ${options.method} ${url} (status=${response.status}, time=${Date.now() - start}ms)`,
			);
			return response as Response<R>;
		} catch (e) {
			const response = e.response;
			const data =
				typeof response.data === "string"
					? response.data
					: JSON.stringify(response.data);
			this.logger.error(
				`[ERROR] ${options.method} ${url} (error=${e}, time=${Date.now() - start}ms, body=${data})`,
			);
			return {
				status: response.status,
				data: response.data,
			};
		}
	}
}
