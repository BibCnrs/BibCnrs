import { Controller, Get, Param, Scope, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../common/common-auth/common-auth.guard";
import { EbscoTokenGuard } from "../ebsco-token/ebsco-token.guard";
import { EbscoSearchPublicationService } from "./ebsco-search-publication.service";

@Controller({ path: "ebsco/:communityName", scope: Scope.REQUEST })
export class EbscoSearchController {
	constructor(
		private readonly ebscoSearchService: EbscoSearchPublicationService,
	) {}

	@Get("publication/search")
	@UseGuards(EbscoTokenGuard)
	async searchPublications(@Param("communityName") communityName: string) {
		return this.ebscoSearchService.searchPublications(communityName);
	}

	/*@Get("article/search")
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
	}*/
}
