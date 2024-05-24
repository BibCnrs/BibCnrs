import { Injectable } from "@nestjs/common";
import { revue } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { FilterQuery, transformFilters } from "../../utils/filter";
import { FindAllQueryArgs } from "../admin.type";
import { CreateRevueDto, UpdateRevueDto } from "./dto/revue.dto";

@Injectable()
export class RevuesService {
	constructor(private prismaService: PrismaService) {}

	private parseFilters(query: FindAllQueryArgs): FilterQuery {
		if (!query) return {};

		const filters = JSON.parse(query._filters || "{}");

		if (filters?.match) {
			filters.title = filters.match;
			filters.match = undefined;
		}

		return transformFilters(filters, [{ field: "title", mode: "contains" }]);
	}

	private calculateOffset(query: FindAllQueryArgs, take: number): number {
		return query._page ? (Number.parseInt(query._page) - 1) * take : 0;
	}

	private transformCommunities(revue) {
		if (!revue) return null;

		if (revue.revue_community) {
			const domains = [];
			const communitiesIds = [];
			for (const item of revue.revue_community) {
				domains.push(item.community.name);
				communitiesIds.push(item.community.id);
			}
			revue.domains = domains;
			revue.communities = communitiesIds;
			// biome-ignore lint/performance/noDelete: We don't want to keep track of the revue_community
			delete revue.revue_community;
		}
		return revue;
	}

	async findAll(
		query: FindAllQueryArgs,
	): Promise<{ data: Partial<revue>[]; total: number }> {
		const filters = this.parseFilters(query);
		console.log("filters", filters);
		const take = Number.parseInt(query._perPage) || 100;
		const offset = this.calculateOffset(query, take);

		let data = await this.prismaService.revue.findMany({
			skip: offset || 0,
			take: take || 100,
			where: filters,
			orderBy: {
				title: query._sortDir || "asc",
			},
			include: {
				revue_community: {
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

		data = data.map(this.transformCommunities);

		const total = await this.prismaService.revue.count({ where: filters });
		return { data, total };
	}

	async findOne(id: number): Promise<revue> {
		const revue = await this.prismaService.revue.findUnique({
			where: { id },
			include: {
				revue_community: {
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

		return this.transformCommunities(revue);
	}

	async create(createRevueDto: CreateRevueDto) {
		const { communities, domains, ...revueData } = createRevueDto;

		const createdRevue = await this.prismaService.revue.create({
			data: revueData,
		});
		await this.prismaService.revue_community.createMany({
			data: communities.map((community) => ({
				revue_id: createdRevue.id,
				community_id: community,
			})),
		});

		return this.findOne(createdRevue.id);
	}

	async update(id: number, updateRevueDto: UpdateRevueDto) {
		const {
			communities: revueCommunities,
			id: idRevue,
			domains,
			...revueData
		} = updateRevueDto;

		// Update information about the revue
		await this.prismaService.revue.update({
			where: { id },
			data: {
				...revueData,
			},
		});

		// prepare the operations
		const deleteManyOperation = this.prismaService.revue_community.deleteMany({
			where: { revue_id: id },
		});

		const createManyOperation = this.prismaService.revue_community.createMany({
			data: revueCommunities.map((community) => ({
				revue_id: id,
				community_id: community,
			})),
		});

		// perform the operations in a transaction
		if (revueCommunities) {
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
		return this.prismaService.revue.delete({ where: { id } });
	}
}
