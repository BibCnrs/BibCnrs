import { Injectable } from "@nestjs/common";
import { JsonValue } from "@prisma/client/runtime/library";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class EbscoFavoriteResourcesService {
	constructor(private prismaService: PrismaService) {}

	async putFavoriteResources(userId: number, favoriteResources: JsonValue) {
		return this.prismaService.janus_account.update({
			where: {
				id: userId,
			},
			data: {
				favourite_resources: favoriteResources,
			},
		});
	}
}
