import { Controller, Get, Scope, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../common/common-auth/common-auth.guard";
import { EbscoTokenGuard } from "../ebsco-token/ebsco-token.guard";
import { EbscoSearchService } from "./ebsco-search.service";

@Controller({ path: "ebsco/:domainName", scope: Scope.REQUEST })
export class EbscoSearchController {
	constructor(private readonly ebscoSearchService: EbscoSearchService) {}

	@Get("publication/search")
	@UseGuards(EbscoTokenGuard)
	async searchPublications() {
		return [];
	}

	@Get("article/search")
	@UseGuards(AuthGuard, EbscoTokenGuard)
	async searchArticle() {
		return [];
	}

	@Get("article/retrieve")
	@UseGuards(AuthGuard, EbscoTokenGuard)
	async retrieveArticle() {
		return [];
	}

	@Get("article/retrieve/:id")
	@UseGuards(AuthGuard, EbscoTokenGuard)
	async retrieveArticleById() {
		return {};
	}
}
