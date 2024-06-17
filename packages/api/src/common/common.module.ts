import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { RedisModule } from "./redis/redis.module";
import { SecurityModule } from "./security/security.module";

@Module({
	imports: [AuthModule, RedisModule, MailModule, SecurityModule],
})
export class CommonModule {}
