import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { HttpModule } from "./http/http.module";
import { MailModule } from "./mail/mail.module";
import { RedisModule } from "./redis/redis.module";
import { SecurityModule } from "./security/security.module";

@Module({
	imports: [AuthModule, RedisModule, MailModule, SecurityModule, HttpModule],
})
export class CommonModule {}
