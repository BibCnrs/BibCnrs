import { Module } from "@nestjs/common";
import { CommonMailService } from "./common-mail.service";

@Module({
	imports: [],
	controllers: [],
	providers: [CommonMailService],
	exports: [CommonMailService],
})
export class CommonMailModule {}
