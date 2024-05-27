import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jwt from "jsonwebtoken";
import { Config } from "../../config";
import { InistAccount } from "../../inist/inist-account/inist-account.type";

const TOKEN_ORIGIN = "inist";
const JWT_ALG: jwt.Algorithm = "HS256";

@Injectable()
export class EbscoAuthService {
	private readonly authConfig: Config["auth"];

	constructor(private readonly configService: ConfigService<Config, true>) {
		this.authConfig = this.configService.get<Config["auth"]>("auth");
	}

	signInistTokens({ id, username, domains, groups }: InistAccount) {
		const tokenData = {
			id,
			username,
			domains,
			groups,
			origin: TOKEN_ORIGIN,
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
