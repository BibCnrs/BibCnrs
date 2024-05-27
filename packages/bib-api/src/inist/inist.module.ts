import { Module } from "@nestjs/common";
import { InistAccountModule } from "./inist-account/inist-account.module";

@Module({
	imports: [InistAccountModule],
})
export class InistModule {}
