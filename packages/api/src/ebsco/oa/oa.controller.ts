import {
	BadRequestException,
	Controller,
	Get,
	Query,
	Req,
	Res,
	UseGuards,
} from "@nestjs/common";
import { inist_account, janus_account } from "@prisma/client";
import { Request, Response } from "express";
import { InstitutesService } from "../../admin/institutes/institutes.service";
import { UnitsService } from "../../admin/units/units.service";
import { AuthGuard } from "../../common/auth/auth.guard";
import { TokenPayload } from "../../common/auth/auth.type";
import { FileLogger } from "../../common/logger/FileLogger";
import { InistAccountService } from "../../inist/accounts/accounts.service";
import { JanusAccountService } from "../../janus/accounts/accounts.service";

@Controller("ebsco")
export class EbscoOaController {
	private readonly logger = new FileLogger(
		"bibapi_http.log",
		EbscoOaController.name,
	);

	constructor(
		private readonly janusAccountService: JanusAccountService,
		private readonly inistAccountService: InistAccountService,
		private readonly instituteService: InstitutesService,
		private readonly unitService: UnitsService,
	) {}

	private async logOpenAccess(
		url: string,
		sid: string,
		domain: string,
		doi: string,
		login: string | null,
		O: string | null,
		I: string | null,
		OU: string | null,
	) {
		this.logger.log(
			`open access: ${JSON.stringify({
				sid,
				domain,
				doi,
				login,
				O,
				I,
				OU,
				url,
			})}`,
		);
	}

	private async logJanusUser(
		janusUser: janus_account,
		url: string,
		sid: string,
		domain: string,
		doi: string,
	) {
		const institute = janusUser.primary_institute
			? await this.instituteService.findOne(janusUser.primary_institute)
			: null;

		const unit = janusUser.primary_unit
			? await this.unitService.findOne(janusUser.primary_unit)
			: null;

		this.logOpenAccess(
			url,
			sid,
			domain,
			doi,
			janusUser.cnrs ? janusUser.mail : null,
			janusUser.cnrs ? "CNRS" : "OTHER",
			institute?.code ?? null,
			unit?.code ?? null,
		);
	}

	private async logInistUser(
		inistUser: inist_account,
		url: string,
		sid: string,
		domain: string,
		doi: string,
	) {
		const institute = inistUser.main_institute
			? await this.instituteService.findOne(inistUser.main_institute)
			: null;

		const unit = inistUser.main_unit
			? await this.unitService.findOne(inistUser.main_unit)
			: null;

		this.logOpenAccess(
			url,
			sid,
			domain,
			doi,
			inistUser.username,
			"UNKNOWN",
			institute?.code ?? null,
			unit?.code ?? null,
		);
	}

	private async redirectOA(
		@Res() res: Response,
		query: Request["query"],
		user: TokenPayload<"inist"> | TokenPayload<"janus"> | null = null,
	) {
		const { sid, url, domaine, doi, user_id } = query;

		if (
			typeof sid !== "string" ||
			typeof url !== "string" ||
			typeof domaine !== "string" ||
			typeof doi !== "string"
		) {
			throw new BadRequestException();
		}

		const decodedUrl = decodeURIComponent(url);

		try {
			new URL(decodedUrl);
		} catch (error) {
			throw new BadRequestException("Invalid URL");
		}

		if (user_id && typeof user_id === "string") {
			const janusUser = await this.janusAccountService.findOneByUid(user_id);
			if (janusUser) {
				await this.logJanusUser(janusUser, url, sid, domaine, doi);
				return res.redirect(url);
			}

			const inistUser = await this.inistAccountService.findOneById(
				Number.parseInt(user_id, 10),
			);
			if (inistUser) {
				await this.logInistUser(inistUser, url, sid, domaine, doi);
			}
		} else if (user?.origin === "janus") {
			const janusUser = await this.janusAccountService.findOneById(user.id);
			await this.logJanusUser(janusUser, url, sid, domaine, doi);
		} else if (user?.origin === "inist") {
			const inistUser = await this.inistAccountService.findOneById(user.id);
			await this.logInistUser(inistUser, url, sid, domaine, doi);
		}

		return res.redirect(url);
	}

	@Get("oa")
	@UseGuards(AuthGuard)
	async oa(
		@Req() request: Request,
		@Res() res: Response,
		@Query() query: Request["query"],
	) {
		return this.redirectOA(res, query, request.user);
	}

	@Get("oa_database")
	async oaDatabase(@Res() res: Response, @Query() query: Request["query"]) {
		return this.redirectOA(res, query);
	}
}
