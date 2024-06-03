import {
	Body,
	Controller,
	ForbiddenException,
	Param,
	ParseIntPipe,
	Put,
	Query,
	Req,
	UnauthorizedException,
	UseGuards,
} from "@nestjs/common";
import { JsonValue } from "@prisma/client/runtime/library";
import { Request } from "express";
import { AuthGuard } from "../../common/common-auth/common-auth.guard";
import { EbscoFavoriteResourcesService } from "./ebsco-favorite-resources.service";

@Controller("ebsco/favourite_resources")
@UseGuards(AuthGuard)
export class EbscoFavoriteResourcesController {
	constructor(
		private readonly ebscoFavoriteResourcesService: EbscoFavoriteResourcesService,
	) {}

	// The userId here is kept for historical reasons, but it is not used.
	@Put(":userId")
	async putFavoriteResources(
		@Req() request: Request,
		@Body("favouriteResources") favoriteResources: JsonValue,
	) {
		if (request.user.origin !== "janus") {
			throw new ForbiddenException();
		}

		await this.ebscoFavoriteResourcesService.putFavoriteResources(
			request.user.id,
			favoriteResources,
		);

		return {
			done: true,
		};
	}
}
