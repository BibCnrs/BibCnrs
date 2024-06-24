import { Module } from "@nestjs/common";
import { LoggerModule } from "../logger/logger.module";
import { RedisService } from "./redis.service";

@Module({
	imports: [LoggerModule],
	providers: [RedisService],
	exports: [RedisService],
})
export class RedisModule {}
