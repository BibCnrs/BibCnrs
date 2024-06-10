import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jwt from "jsonwebtoken";
import { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";
import { SecurityService } from "../../security/security.service";

@Injectable()
export class AdminAuthenticationService {
	private readonly authConfig: Config["auth"];

	constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService<Config, true>,
		private readonly securityService: SecurityService,
	) {
		this.authConfig = this.configService.get<Config["auth"]>("auth");
	}

	async login({ username, password }) {
		const foundUser = await this.prismaService.admin_user.findUnique({
			where: { username },
		});

		if (!foundUser) {
			return null;
		}

		const passwordValid = await this.securityService.isPasswordValid(
			password,
			foundUser.salt,
			foundUser.password,
		);

		// Check password
		if (!passwordValid) {
			return null;
		}

		const tokenData = {
			username,
			exp: Math.ceil(Date.now() / 1000) + this.authConfig.expiresIn,
		};

		return jwt.sign(tokenData, this.authConfig.adminSecret);
	}
}
