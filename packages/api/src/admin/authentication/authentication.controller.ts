import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { AdminAuthenticationService } from "./authentication.service";
import { AdminAuthenticationDto } from "./dto/authentication";

@Controller("admin/login")
export class AdminAuthenticationController {
	constructor(
		private readonly adminAuthenticationService: AdminAuthenticationService,
	) {}

	@Post()
	async login(@Body() { username, password }: AdminAuthenticationDto) {
		const token = await this.adminAuthenticationService.login({
			username,
			password,
		});

		if (!token) {
			throw new UnauthorizedException();
		}

		return {
			token,
		};
	}
}
