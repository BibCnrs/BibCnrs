import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { DatabaseWithCommunities, DatabaseWithDomains } from "./database.type";

@Injectable()
export class FrontDatabaseService {
	constructor(private prismaService: PrismaService) {}

	private transformCommunities(
		database: DatabaseWithCommunities,
	): DatabaseWithDomains {
		if (database.communities) {
			const domains = [];
			const communities = [];

			for (const item of database.communities) {
				domains.push(item.community.name);
				communities.push(item.community.id);
			}
			return {
				...database,
				domains,
				communities,
			};
		}
		return { ...database, communities: undefined };
	}

	async getDatabases(where: Prisma.databaseWhereInput) {
		const databases = await this.prismaService.database.findMany({
			include: {
				communities: {
					include: {
						community: {
							select: {
								name: true,
								id: true,
							},
						},
					},
				},
			},
			where,
		});

		return databases.map(this.transformCommunities);
	}
}
