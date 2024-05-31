import { Module } from "@nestjs/common";
import { CommonMailService } from "./common-mail.service";

@Module({
	imports: [],
	controllers: [],
	providers: [CommonMailService],
})
export class CommonMailModule {}
