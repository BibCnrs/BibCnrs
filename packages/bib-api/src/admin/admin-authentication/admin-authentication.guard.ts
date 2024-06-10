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

@Injectable()
export class AdminAuthenticationGuard implements CanActivate {
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
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		if (!token) {
			throw new UnauthorizedException();
		}
		try {
			const payload = await this.jwtService.verifyAsync<{
				username: string;
				exp: number;
			}>(token, {
				secret: this.authConfig.adminSecret,
			});
		} catch {
			throw new UnauthorizedException();
		}
		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(" ") ?? [];
		return type === "Bearer" ? token : undefined;
	}
}
