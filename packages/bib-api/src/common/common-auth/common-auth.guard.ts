import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Config } from "../../config";
import { JWT_ALG, LOGIN_COOKIE_NAME } from "./common-auth.const";
import { TokenPayload } from "./common-auth.type";

@Injectable()
export class AuthGuard implements CanActivate {
	private readonly authConfig: Config["auth"];

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
			throw new UnauthorizedException();
		}
		try {
			const payload = await this.jwtService.verifyAsync<TokenPayload<"inist">>(
				token,
				{
					secret: this.authConfig.cookieSecret,
					algorithms: [JWT_ALG],
				},
			);

			if (payload.origin !== "inist" && payload.origin !== "janus") {
				throw new UnauthorizedException();
			}

			request.user = payload;
		} catch {
			throw new UnauthorizedException();
		}
		return true;
	}

	private extractTokenFromCookie(request: Request): string | null {
		return request.cookies[LOGIN_COOKIE_NAME] || null;
	}
}
