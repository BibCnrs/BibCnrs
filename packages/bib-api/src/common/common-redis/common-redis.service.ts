import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
	RedisClientType,
	RedisFunctions,
	RedisModules,
	RedisScripts,
} from "@redis/client";
import { createClient } from "redis";
import { Config } from "../../config";

const logger = new Logger("CommonRedisService");

@Injectable()
export class CommonRedisService {
	private readonly redis: RedisClientType<
		RedisModules,
		RedisFunctions,
		RedisScripts
	>;

	constructor(readonly configService: ConfigService<Config, true>) {
		const config = this.configService.get<Config["redis"]>("redis");

		this.redis = createClient({
			url: `redis://${config.host}:${config.port}`,
		})
			.on("connect", () => logger.log("Connected to Redis"))
			.on("error", (err) => logger.error(err));

		void this.redis.connect();
	}
}
