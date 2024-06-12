import {
	Controller,
	Get,
	Inject,
	Param,
	Query,
	Scope,
	UseGuards,
} from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { AuthGuard } from "../../common/common-auth/common-auth.guard";
import { EbscoTokenGuard } from "../ebsco-token/ebsco-token.guard";
import { EbscoSearchArticleService } from "./ebsco-search-article.service";
import { EbscoSearchPublicationService } from "./ebsco-search-publication.service";

@Controller({ path: "ebsco/:communityName", scope: Scope.REQUEST })
export class EbscoSearchController {
	constructor(
		private readonly ebscoSearchArticleService: EbscoSearchArticleService,
		private readonly ebscoSearchPublicationService: EbscoSearchPublicationService,
		@Inject(REQUEST) private readonly request: Request,
	) {}

	@Get("publication/search")
	@UseGuards(EbscoTokenGuard)
	async searchPublications(@Param("communityName") communityName: string) {
		return this.ebscoSearchPublicationService.searchPublications(
			this.request.ebscoToken,
			this.request.query,
			communityName,
		);
	}

	@Get("publication/retrieve/:id")
	@UseGuards(AuthGuard, EbscoTokenGuard)
	async retrievePublicationById(
		@Param("communityName") communityName: string,
		@Param("id") id: string,
	) {
		return this.ebscoSearchPublicationService.retrievePublicationById(
			this.request.ebscoToken,
			communityName,
			id,
		);
	}

	@Get("article/search")
	@UseGuards(AuthGuard, EbscoTokenGuard)
	async searchArticle(@Param("communityName") communityName: string) {
		return this.ebscoSearchArticleService.searchArticle(
			this.request.ebscoToken,
			this.request.query,
			communityName,
		);
	}

	@Get("article/retrieve")
	@UseGuards(AuthGuard, EbscoTokenGuard)
	async retrieveArticle(
		@Param("communityName") communityName: string,
		@Query("dbid") dbId: string,
		@Query("an") an: string,
	) {
		return this.ebscoSearchArticleService.retrieveArticle(
			this.request.ebscoToken,
			communityName,
			dbId,
			an,
		);
	}
}
