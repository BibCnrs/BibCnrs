import {
	Body,
	Controller,
	Post,
	Res,
	UnauthorizedException,
} from "@nestjs/common";
import { Response } from "express";
import { LOGIN_COOKIE_NAME } from "../../common/auth/auth.const";
import { AuthService } from "../../common/auth/auth.service";
import { InistAccountService } from "../accounts/accounts.service";
import { LoginDto } from "./dto/login";

@Controller("ebsco")
export class InistAuthController {
	constructor(
		private readonly inistAccountService: InistAccountService,
		private readonly commonAuthService: AuthService,
	) {}

	@Post("login")
	async login(
		@Res({ passthrough: true }) response: Response,
		@Body() { username, password }: LoginDto,
	) {
		const inistAccount = await this.inistAccountService.authenticate(
			username,
			password,
		);

		if (!inistAccount) {
			throw new UnauthorizedException();
		}
		const { id, groups, domains } = inistAccount;

		// update last_connexion at today
		const { cookieToken, headerToken } = this.commonAuthService.signToken(
			"inist",
			{
				id,
				username,
				groups,
				domains,
			},
		);

		await this.inistAccountService.updateLastConnexion(id);

		response.cookie(LOGIN_COOKIE_NAME, cookieToken, {
			httpOnly: true,
		});

		return {
			token: headerToken,
			domains,
			username,
		};
	}

	@Post("logout")
	logout(@Res({ passthrough: true }) response: Response) {
		response.clearCookie(LOGIN_COOKIE_NAME);
		return {
			done: true,
		};
	}
}
