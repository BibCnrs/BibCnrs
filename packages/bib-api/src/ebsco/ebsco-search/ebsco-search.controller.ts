import {
	Controller,
	Get,
	Param,
	Query,
	Scope,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "../../common/common-auth/common-auth.guard";
import { EbscoTokenGuard } from "../ebsco-token/ebsco-token.guard";
import { EbscoSearchArticleService } from "./ebsco-search-article.service";
import { EbscoSearchPublicationService } from "./ebsco-search-publication.service";

@Controller({ path: "ebsco/:communityName", scope: Scope.REQUEST })
export class EbscoSearchController {
	constructor(
		private readonly ebscoSearchArticleService: EbscoSearchArticleService,
		private readonly ebscoSearchPublicationService: EbscoSearchPublicationService,
	) {}

	@Get("publication/search")
	@UseGuards(EbscoTokenGuard)
	async searchPublications(@Param("communityName") communityName: string) {
		return this.ebscoSearchPublicationService.searchPublications(communityName);
	}

	@Get("publication/retrieve/:id")
	@UseGuards(AuthGuard, EbscoTokenGuard)
	async retrievePublicationById(
		@Param("communityName") communityName: string,
		@Param("id") id: string,
	) {
		return this.ebscoSearchPublicationService.retrievePublicationById(
			communityName,
			id,
		);
	}

	@Get("article/search")
	@UseGuards(AuthGuard, EbscoTokenGuard)
	async searchArticle(@Param("communityName") communityName: string) {
		return this.ebscoSearchArticleService.searchArticle(communityName);
	}

	@Get("article/retrieve")
	@UseGuards(AuthGuard, EbscoTokenGuard)
	async retrieveArticle(
		@Param("communityName") communityName: string,
		@Query("dbid") dbId: string,
		@Query("an") an: string,
	) {
		return this.ebscoSearchArticleService.retrieveArticle(
			communityName,
			dbId,
			an,
		);
	}
}
