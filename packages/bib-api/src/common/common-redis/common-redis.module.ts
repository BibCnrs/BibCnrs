import { Module } from "@nestjs/common";
import { CommonRedisService } from "./common-redis.service";

@Module({
	imports: [],
	providers: [CommonRedisService],
	exports: [CommonRedisService],
})
export class CommonRedisModule {}
