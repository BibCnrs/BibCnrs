import { Module } from "@nestjs/common";
import { InistAccountModule } from "./inist-account/inist-account.module";
import { InistAuthModule } from "./inist-auth/inist-auth.module";

@Module({
	imports: [InistAccountModule, InistAuthModule],
})
export class InistModule {}
