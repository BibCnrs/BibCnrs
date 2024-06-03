import { Module } from "@nestjs/common";
import { JanusAccountModule } from "./janus-accounts/janus-accounts.module";
import { JanusAuthModule } from "./janus-auth/janus-auth.module";

@Module({
	imports: [JanusAccountModule, JanusAuthModule],
})
export class JanusModule {}
