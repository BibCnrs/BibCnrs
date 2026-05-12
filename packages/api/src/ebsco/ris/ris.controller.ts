import {
	Body,
	Controller,
	Inject,
	Post,
	Res,
	Scope,
	UseGuards,
} from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request, Response } from "express";
import { AuthGuard } from "../../common/auth/auth.guard";
import { EbscoTokenGuard } from "../token/token.guard";
import { EbscoRisService } from "./ris.service";

@Controller({ path: "ebsco/:communityName", scope: Scope.REQUEST })
export class EbscoRisController {
	constructor(
		private readonly ebscoRisService: EbscoRisService,
		@Inject(REQUEST) private readonly request: Request,
	) {}

	@Post("article/retrieve_ris")
	@UseGuards(AuthGuard, EbscoTokenGuard)
	async retrieveRis(
		@Body("domain") communityName: string,
		@Body("exportType") exportType: string,
		@Body("links") links: string[],
		@Res() res: Response,
	) {
		const risContents = await this.ebscoRisService.retrieveRis(
			this.request.ebscoToken,
			communityName,
			exportType,
			links,
		);
		return res.json(risContents);
	}
}
