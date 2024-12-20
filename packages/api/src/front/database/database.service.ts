import { Injectable } from "@nestjs/common";
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

	async getDatabases(domains: string[], isConnected: boolean) {
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
			where: {
				...(isConnected ? {} : { oa: true }),
				AND: {
					active: true,
					communities: domains?.length
						? {
								some: {
									community: {
										name: {
											in: domains,
										},
									},
								},
							}
						: undefined,
				},
			},
		});

		if (isConnected) {
			return databases.map(this.transformCommunities);
		}
		const filteredDatabases = databases.filter(
			(database) => database.communities.length === 10,
		);
		return filteredDatabases.map(this.transformCommunities);
	}
}
