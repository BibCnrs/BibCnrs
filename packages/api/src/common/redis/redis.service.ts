import {
	Injectable,
	Logger,
	OnApplicationShutdown,
	OnModuleDestroy,
	OnModuleInit,
} from "@nestjs/common";
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
export class RedisService implements OnModuleInit, OnModuleDestroy {
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
			.on("reconnecting", () => logger.log("Reconnecting to Redis"))
			.on("end", () => logger.log("Disconnected from Redis"))
			.on("error", (err) => logger.error(err));
	}

	async onModuleInit() {
		return this.redis.connect();
	}

	async onModuleDestroy() {
		return this.redis.disconnect();
	}

	async getAsync(key: string) {
		return this.redis.get(key);
	}

	async setAsync(key: string, value: string) {
		return this.redis.set(key, value);
	}

	async delAsync(key: string) {
		return this.redis.del(key);
	}

	async hmgetAsync(key: string, fields: string | string[]) {
		return this.redis.hmGet(key, fields);
	}

	async hsetAsync(key: string, field: string, value: string) {
		return this.redis.hSet(key, field, value);
	}

	async expireAsync(key: string, exp: number) {
		return this.redis.expire(key, exp);
	}
}
