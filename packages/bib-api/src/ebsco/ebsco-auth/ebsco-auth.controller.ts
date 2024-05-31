import {
	Body,
	Controller,
	Post,
	Res,
	UnauthorizedException,
} from "@nestjs/common";
import { Response } from "express";
import { LOGIN_COOKIE_NAME } from "../../common/common-auth/common-auth.const";
import { InistAccountService } from "../../inist/inist-account/inist-account.service";
import { LoginDto } from "./dto/login";
import { EbscoAuthService } from "./ebsco-auth.service";

@Controller("ebsco")
export class EbscoAuthController {
	constructor(
		private readonly inistAccountService: InistAccountService,
		private readonly ebscoAuthService: EbscoAuthService,
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
		const { id, domains } = inistAccount;

		// update last_connexion at today
		const { cookieToken, headerToken } =
			this.ebscoAuthService.signInistTokens(inistAccount);

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
