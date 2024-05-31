import { Module } from "@nestjs/common";
import { CommonAuthModule } from "./common-auth/common-auth.module";
import { CommonMailModule } from "./common-mail/common-mail.module";
import { CommonRedisModule } from "./common-redis/common-redis.module";

@Module({
	imports: [CommonAuthModule, CommonRedisModule, CommonMailModule],
})
export class CommonModule {}
