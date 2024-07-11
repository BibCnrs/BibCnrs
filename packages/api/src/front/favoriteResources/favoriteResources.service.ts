import { Injectable } from "@nestjs/common";
import { JsonValue } from "@prisma/client/runtime/library";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class FrontFavoriteResourcesService {
	constructor(private prismaService: PrismaService) {}

	async getRevues(domains: string[]) {
		return this.prismaService.revue.findMany({
			where:
				domains.length > 0
					? {
							revue_community: {
								every: {
									community: {
										name: {
											in: domains,
										},
									},
								},
							},
						}
					: undefined,
			take: 9,
		});
	}

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
