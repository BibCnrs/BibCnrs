import { Module } from "@nestjs/common";
import { JanusAccountModule } from "./accounts/accounts.module";
import { JanusAuthModule } from "./auth/auth.module";

@Module({
	imports: [JanusAccountModule, JanusAuthModule],
})
export class JanusModule {}
