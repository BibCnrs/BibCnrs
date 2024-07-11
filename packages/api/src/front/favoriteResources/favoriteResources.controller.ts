import {
	BadRequestException,
	Body,
	Controller,
	ForbiddenException,
	Get,
	Put,
	Req,
	UseGuards,
} from "@nestjs/common";
import { JsonValue } from "@prisma/client/runtime/library";
import { Request } from "express";
import { AuthGuard } from "../../common/auth/auth.guard";
import { FrontFavoriteResourcesService } from "./favoriteResources.service";

@Controller("front/favourite_resources")
@UseGuards(AuthGuard)
export class FrontFavoriteResourcesController {
	constructor(
		private readonly frontFavoriteResourcesService: FrontFavoriteResourcesService,
	) {}

	@Get("revues")
	async getRevues(@Req() request: Request) {
		return (
			await this.frontFavoriteResourcesService.getRevues(request.user.domains)
		).flatMap((revue) => ({
			...revue,
			source: "shared",
		}));
	}

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

		await this.frontFavoriteResourcesService.putFavoriteResources(
			request.user.id,
			favoriteResources,
		);

		return {
			done: true,
		};
	}
}
