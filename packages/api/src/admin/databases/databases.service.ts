import { Injectable } from "@nestjs/common";
import { database } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { FilterQuery, transformFilters } from "../../utils/filter";
import { FindAllQueryArgs } from "../admin.type";
import { CreateDatabaseDto, UpdateDatabaseDto } from "./dto/database.dto";

@Injectable()
export class DatabasesService {
	constructor(private prismaService: PrismaService) {}

	private parseFilters(query: FindAllQueryArgs): FilterQuery {
		if (!query) return {};

		const filters = JSON.parse(query._filters || "{}");

		return filters
			? transformFilters(filters, [
					{ field: "name_fr", mode: "contains" },
					{ field: "text_fr", mode: "contains" },
					{ field: "text_en", mode: "contains" },
					{ field: "url_fr", mode: "contains" },
					{ field: "url_en", mode: "contains" },
					{ field: "active", mode: "equals", excludeMatch: true },
					{ field: "oa", mode: "equals", excludeMatch: true },
					{ field: "use_proxy", mode: "equals", excludeMatch: true },
					{
						field: "communities.community_id",
						mode: "equals",
						excludeBatch: true,
					},
				])
			: {};
	}

	private calculateOffset(query: FindAllQueryArgs, take: number): number {
		return query._page ? (Number.parseInt(query._page) - 1) * take : 0;
	}

	private transformCommunities(database) {
		if (!database) return null;

		if (database.communities) {
			const domains = [];
			const communitiesIds = [];
			for (const item of database.communities) {
				domains.push(item.community.name);
				communitiesIds.push(item.community.id);
			}
			database.domains = domains;
			database.communities = communitiesIds;
		}
		return database;
	}

	async create(createDatabaseDto: CreateDatabaseDto) {
		const { communities, domains, ...databaseData } = createDatabaseDto;

		const createdDatabase = await this.prismaService.database.create({
			data: databaseData,
		});
		await this.prismaService.database_community.createMany({
			data: communities.map((community) => ({
				database_id: createdDatabase.id,
				community_id: community,
			})),
		});

		return this.findOne(createdDatabase.id);
	}

	async findAll(
		query: FindAllQueryArgs,
	): Promise<{ data: Partial<database>[]; total: number }> {
		const filters = this.parseFilters(query);
		const take = Number.parseInt(query._perPage) || 100;
		const offset = this.calculateOffset(query, take);

		const data = await this.prismaService.database.findMany({
			skip: offset || 0,
			take: take || 100,
			where: filters,
			include: {
				communities: {
					include: {
						community: true,
					},
				},
			},
			orderBy: {
				[query._sortField]: query._sortDir,
			},
		});

		data.map(this.transformCommunities);

		const total = await this.prismaService.database.count({ where: filters });
		return { data, total };
	}

	async findOne(id: number): Promise<database> {
		const database = await this.prismaService.database.findUnique({
			where: { id },
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
		});
		return this.transformCommunities(database);
	}

	async update(id: number, updateDatabaseDto: UpdateDatabaseDto) {
		const {
			communities: databaseCommunities,
			id: idDatabase,
			domains,
			...databaseData
		} = updateDatabaseDto;

		// Update information about the database
		await this.prismaService.database.update({
			where: { id },
			data: {
				...databaseData,
			},
		});

		// prepare the operations
		const deleteManyOperation =
			this.prismaService.database_community.deleteMany({
				where: { database_id: id },
			});

		const createManyOperation =
			this.prismaService.database_community.createMany({
				data: databaseCommunities.map((community) => ({
					database_id: id,
					community_id: community,
				})),
			});

		// perform the operations in a transaction
		if (databaseCommunities) {
			await this.prismaService.$transaction([
				deleteManyOperation,
				createManyOperation,
			]);
		} else {
			await this.prismaService.$transaction([deleteManyOperation]);
		}

		return this.findOne(id);
	}

	remove(id: number) {
		return this.prismaService.database.delete({ where: { id } });
	}
}
