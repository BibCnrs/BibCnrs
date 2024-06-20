import {
	BadRequestException,
	Body,
	Controller,
	ForbiddenException,
	Put,
	Req,
	UseGuards,
} from "@nestjs/common";
import { JsonValue } from "@prisma/client/runtime/library";
import { Request } from "express";
import { AuthGuard } from "../../common/auth/auth.guard";
import { EbscoFavoriteResourcesService } from "./favoriteResources.service";

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

		if (!Array.isArray(favoriteResources)) {
			throw new BadRequestException("favouriteResources must be an array");
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
