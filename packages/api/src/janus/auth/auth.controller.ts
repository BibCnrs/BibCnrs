import {
	ConflictException,
	Controller,
	Get,
	Post,
	Query,
	Req,
	Res,
	UnauthorizedException,
	UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from "express";
import iconv from "iconv-lite";
import { InstitutesService } from "../../admin/institutes/institutes.service";
import { UnitsService } from "../../admin/units/units.service";
import { LOGIN_COOKIE_NAME } from "../../common/auth/auth.const";
import { AuthGuard } from "../../common/auth/auth.guard";
import { AuthService } from "../../common/auth/auth.service";
import { TokenPayload } from "../../common/auth/auth.type";
import { MailService } from "../../common/mail/mail.service";
import { RedisService } from "../../common/redis/redis.service";
import { Config } from "../../config";
import { JanusAccountService } from "../accounts/accounts.service";
import { JanusAlertService } from "./alert.service";
import { RenaterHeader } from "./auth.type";

const FAKE_LOGIN_HEADER = {
	cookie: "_shibsession_id=_sessionid",
	sn: "marmelab",
	givenname: "developer",
	mail: "developer@marmelab.com",
	o: "CNRS",
	uid: "tester.10",
};

@Controller("ebsco")
export class JanusAuthController {
	private readonly renaterConfig: Config["renater"];

	constructor(
		private readonly commonAuthService: AuthService,
		private readonly commonMailService: MailService,
		private readonly redis: RedisService,
		private readonly janusAccountService: JanusAccountService,
		private readonly janusAlertService: JanusAlertService,
		private readonly institutesService: InstitutesService,
		private readonly unitsService: UnitsService,
		readonly configService: ConfigService<Config, true>,
	) {
		this.renaterConfig = this.configService.get<Config["renater"]>("renater");
	}

	private decode(value: string | null) {
		if (!value) {
			return undefined;
		}

		return iconv.decode(Buffer.from(value, "binary"), "utf-8");
	}

	@Get("login_renater")
	public async loginRenater(
		@Req() request: Request,
		@Res({ passthrough: true }) response: Response,
		@Query("origin") origin: string,
	) {
		const renaterHeader: RenaterHeader = this.renaterConfig.fakeLogin
			? FAKE_LOGIN_HEADER
			: {
					cookie: request.header("cookie") ?? "",
					sn: request.header("sn") ?? "",
					givenname: request.header("givenname") ?? "",
					mail: request.header("mail") ?? "",
					o: request.header("o") ?? "",
					ou: request.header("ou"),
					uid: request.header("uid") ?? "",
					displayname: request.header("displayname"),
				};

		if (renaterHeader.displayname && !renaterHeader.givenname) {
			renaterHeader.sn = renaterHeader.displayname.split(" ")[0];
			renaterHeader.givenname = renaterHeader.displayname.split(" ")[1];
		}

		if (
			!renaterHeader.uid ||
			!renaterHeader.givenname ||
			!renaterHeader.sn ||
			!renaterHeader.mail
		) {
			throw new UnauthorizedException();
		}

		const cookie = renaterHeader.cookie
			?.split("; ")
			.filter((value) => value.match(/^_shibsession_/))[0];
		if (!cookie) {
			throw new UnauthorizedException();
		}

		const similarAccounts = await this.janusAccountService.getSimilarAccount(
			renaterHeader.uid,
			renaterHeader.sn,
			renaterHeader.givenname,
		);

		const [code, name] = (renaterHeader.refscientificoffice || "").split("->");
		const institute = await this.institutesService.createIfNotExists(
			code,
			name,
		);
		if (renaterHeader.ou) {
			this.unitsService.upsertOneByCode({
				code: renaterHeader.ou,
			});
		}

		const unit = renaterHeader.ou
			? await this.unitsService.findOneByCode(renaterHeader.ou)
			: null;

		await this.janusAccountService.upsertOneByUid({
			uid: renaterHeader.uid,
			name: this.decode(renaterHeader.sn),
			firstname: this.decode(renaterHeader.givenname),
			mail: this.decode(renaterHeader.mail),
			cnrs: renaterHeader.o === "CNRS",
			last_connexion: renaterHeader["shib-authentication-instant"],
			primary_institute: institute?.id,
			primary_unit: unit?.id,
		});

		const user = await this.janusAccountService.findOneByUid(renaterHeader.uid);

		if (similarAccounts.length) {
			const mail = this.janusAlertService.getSimilarUidAlertMail(
				user,
				similarAccounts,
			);
			await this.commonMailService.sendMail(mail);
		}

		const { cookieToken, headerToken } = this.commonAuthService.signToken(
			"janus",
			{
				id: user.id,
				shib: cookie,
				username: `${user.firstname} ${user.name}`,
				domains: user.domains,
				favorite_domain: user.favorite_domain || user.domains?.at(0),
			},
		);

		response.cookie(LOGIN_COOKIE_NAME, cookieToken, {
			httpOnly: true,
		});

		await this.redis.setAsync(cookie, headerToken);
		response.redirect(decodeURIComponent(origin));
	}

	@Post("getLogin")
	@UseGuards(AuthGuard)
	async postGetLogin(@Req() request: Request) {
		if (request.user.origin !== "janus") {
			throw new UnauthorizedException();
		}

		const user = request.user as TokenPayload<"janus">;
		const token = await this.redis.getAsync(user.shib);
		if (!token) {
			throw new ConflictException();
		}

		let favouriteResources =
			await this.janusAccountService.getFavouriteResources(user.id);

		if (!favouriteResources) {
			favouriteResources = await this.janusAccountService.getRevuesByDomains([
				user.favorite_domain,
				...user.domains,
			]);
		}

		await this.redis.delAsync(user.shib);
		return {
			id: user.id,
			username: user.username,
			domains: user.domains,
			favorite_domain: user.favorite_domain,
			favouriteResources,
			origin: user.origin,
			token,
		};
	}
}
