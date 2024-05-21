import { Module } from "@nestjs/common";
import { AuthService } from "packages/bib-api/src/auth/auth.service";

@Module({
	imports: [],
	controllers: [],
	providers: [AuthService],
})
export class AuthModule {}
