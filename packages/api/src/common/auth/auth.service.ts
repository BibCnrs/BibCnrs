import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jwt from "jsonwebtoken";
import { JWT_ALG } from "../../common/auth/auth.const";
import { Config } from "../../config";
import { Origin, TokenPayload, TokenPayloadData } from "./auth.type";

@Injectable()
export class AuthService {
	private readonly authConfig: Config["auth"];

	constructor(private readonly configService: ConfigService<Config, true>) {
		this.authConfig = this.configService.get<Config["auth"]>("auth");
	}

	signToken<O extends Origin>(origin: O, payload: TokenPayloadData[O]) {
		const tokenData: TokenPayload<O> = {
			...payload,
			origin,
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
