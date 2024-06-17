import { Module } from "@nestjs/common";
import { InistAccountModule } from "./accounts/accounts.module";
import { InistAuthModule } from "./auth/auth.module";

@Module({
	imports: [InistAccountModule, InistAuthModule],
})
export class InistModule {}
