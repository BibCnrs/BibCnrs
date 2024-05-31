import { Module } from "@nestjs/common";
import { JanusAccountModule } from "./janus-accounts/janus-accounts.module";

@Module({
	imports: [JanusAccountModule],
})
export class JanusModule {}
