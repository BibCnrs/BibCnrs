import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Config } from "../../config";
import { AppLogger } from "../logger/AppLogger";
import { JWT_ALG, LOGIN_COOKIE_NAME } from "./auth.const";
import { TokenPayload } from "./auth.type";

@Injectable()
export class UserRetrieveGuard implements CanActivate {
	private readonly authConfig: Config["auth"];
	private readonly logger = new AppLogger(UserRetrieveGuard.name);

	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService<Config, true>,
	) {
		this.authConfig = this.configService.get<Config["auth"]>("auth");
	}

	async canActivate(
		context: Pick<ExecutionContext, "switchToHttp">,
	): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();
		const token = this.extractTokenFromCookie(request);
		if (!token) {
			return true;
		}

		try {
			const payload = await this.jwtService.verifyAsync<
				TokenPayload<"inist" | "janus">
			>(token, {
				secret: this.authConfig.cookieSecret,
				algorithms: [JWT_ALG],
			});

			if (payload.origin !== "inist" && payload.origin !== "janus") {
				return true;
			}

			request.user = payload;
		} catch (e) {
			this.logger.warn(`Failed to decode token, ${e}`);
		}
		return true;
	}

	private extractTokenFromCookie(request: Request): string | null {
		return request.cookies[LOGIN_COOKIE_NAME] || null;
	}
}
