import { Injectable } from "@nestjs/common";
import { community } from "@prisma/client";
import { FindAllQueryArgs } from "packages/bib-api/src/admin/admin.type";
import {
	CreateCommunityDto,
	UpdateCommunityDto,
} from "packages/bib-api/src/admin/communities/dto/community.dto";
import { PrismaService } from "packages/bib-api/src/prisma/prisma.service";
import {
	FilterQuery,
	transformFilters,
} from "packages/bib-api/src/utils/filter";

@Injectable()
export class CommunitiesService {
	constructor(private prismaService: PrismaService) {}

	private parseFilters(query: FindAllQueryArgs): FilterQuery {
		if (!query) return {};

		const filters = JSON.parse(query._filters || "{}");

		return filters
			? transformFilters(filters, [
					{ field: "name", mode: "contains" },
					{ field: "gate", mode: "contains" },
					{ field: "user_id", mode: "contains", excludeMatch: true },
					{ field: "password", mode: "contains" },
					{ field: "ebsco", mode: "equals", excludeMatch: true },
				])
			: {};
	}

	private calculateOffset(query: FindAllQueryArgs, take: number): number {
		return query._page ? (Number.parseInt(query._page) - 1) * take : 0;
	}

	create(createCommunityDto: CreateCommunityDto) {
		return this.prismaService.community.create({ data: createCommunityDto });
	}

	async findAll(
		query: FindAllQueryArgs,
	): Promise<{ data: Partial<community>[]; total: number }> {
		const filters = this.parseFilters(query);
		const take = Number.parseInt(query._perPage) || 100;
		const offset = this.calculateOffset(query, take);

		const data = await this.prismaService.community.findMany({
			skip: offset || 0,
			take: take || 100,
			where: filters,
			orderBy: {
				[query._sortField]: query._sortDir,
			},
		});

		const total = await this.prismaService.community.count({ where: filters });
		return { data, total };
	}

	findOne(id: number): Promise<community> {
		return this.prismaService.community.findUnique({ where: { id } });
	}

	update(id: number, updateCommunityDto: UpdateCommunityDto) {
		return this.prismaService.community.update({
			where: { id },
			data: updateCommunityDto,
		});
	}

	remove(id: number) {
		return this.prismaService.community.delete({ where: { id } });
	}
}
