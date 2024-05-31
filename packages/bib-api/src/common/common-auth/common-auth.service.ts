import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jwt from "jsonwebtoken";
import { JWT_ALG } from "../../common/common-auth/common-auth.const";
import { Config } from "../../config";
import { InistAccount } from "../../inist/inist-account/inist-account.type";
import { Origin, TokenPayload } from "./common-auth.type";

@Injectable()
export class CommonAuthService {
	private readonly authConfig: Config["auth"];

	constructor(private readonly configService: ConfigService<Config, true>) {
		this.authConfig = this.configService.get<Config["auth"]>("auth");
	}

	signToken<O extends Origin>(origin: O, payload: Omit<TokenPayload, "exp">) {
		const tokenData: TokenPayload = {
			origin,
			...payload,
			exp: Math.ceil(Date.now() / 1000) + this.authConfig.expiresIn,
		};

		return {
			cookieToken: jwt.sign(tokenData, this.authConfig.cookieSecret, {
				algorithm: JWT_ALG,
			}),
			headerToken: jwt.sign(tokenData, this.authConfig.headerSecret, {
				algorithm: JWT_ALG,
			}),
		};
	}
}
