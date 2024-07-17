import * as fs from "node:fs";
import * as path from "node:path";
import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	Res,
	UnauthorizedException,
	UseGuards,
} from "@nestjs/common";
import { community } from "@prisma/client";
import { Request, Response } from "express";
import { LOGIN_COOKIE_NAME } from "../common/auth/auth.const";
import { AuthGuard } from "../common/auth/auth.guard";
import { AuthService } from "../common/auth/auth.service";
import { InistAccountService } from "../inist/accounts/accounts.service";
import { LoginDto } from "../inist/auth/dto/login";
import { EzTicketService } from "./ezticket.service";
import { errorTemplate } from "./ezticket.template.error";
import { loginTemplate } from "./ezticket.template.login";

@Controller("ezticket")
export class EzTicketController {
	constructor(
		private readonly ezProxyService: EzTicketService,
		private readonly inistAccountService: InistAccountService,
		private readonly commonAuthService: AuthService,
	) {}

	private getLanguageFromRequest(req: Request): string {
		try {
			const language = req.headers["accept-language"]
				.split(",")[0]
				.split("-")[0];

			return language.startsWith("fr") ? "fr" : "en";
		} catch (error) {
			return "en";
		}
	}

	@Get("bibcnrs.png")
	async getBibCnrs(@Res() res: Response) {
		const file = fs.createReadStream(
			path.join(process.cwd(), "dist/ezproxy/bibcnrs.png"),
		);
		res.header("Content-Type", "image/png");
		file.pipe(res);
	}

	@Get("login")
	async getLogin(@Req() req: Request, @Res() res: Response) {
		const language = this.getLanguageFromRequest(req);
		res.header("Content-Type", "text/html");
		res.send(loginTemplate(language));
	}

	@Post("login")
	async postLogin(
		@Res({ passthrough: true }) res: Response,
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
		const { cookieToken } = this.commonAuthService.signToken("inist", {
			id,
			username,
			groups,
			domains,
		});

		await this.inistAccountService.updateLastConnexion(id);

		res.cookie(LOGIN_COOKIE_NAME, cookieToken, {
			httpOnly: true,
		});

		return res.redirect("/ezticket");
	}

	@Get()
	@UseGuards(AuthGuard)
	async generateTicket(@Req() req: Request, @Res() res: Response) {
		const language = this.getLanguageFromRequest(req);
		if (!req.query.gate || typeof req.query.gate !== "string") {
			res.status(500);
			res.header("Content-Type", "text/html");
			res.send(errorTemplate(language, "noGate"));
			return;
		}

		const gate = req.query.gate.split(".")[0];
		let domain: community;
		try {
			domain = await this.ezProxyService.findCommunityByGate(gate);
		} catch (e) {
			res.status(500);
			res.header("Content-Type", "text/html");
			res.send(errorTemplate(language, "invalidGate", req.query.gate));
			return;
		}

		const ezTicketInfo = await this.ezProxyService.getEzTicketInfo(req.user);
		if (!ezTicketInfo) {
			res.redirect(
				`/api/ezticket/login?gate=${encodeURIComponent(
					gate,
				)}&url=${encodeURIComponent(req.url)}`,
			);
			return;
		}

		if (
			!ezTicketInfo.domains ||
			ezTicketInfo.domains.indexOf(domain.name) === -1
		) {
			res.status(403);
			res.header("Content-Type", "text/html");
			res.send(errorTemplate(language, "unauthorized", gate));
			return;
		}

		res.redirect(
			this.ezProxyService.generateEZTicket(
				gate,
				req.url,
				ezTicketInfo.username,
				ezTicketInfo.groups,
			),
		);
	}
}
