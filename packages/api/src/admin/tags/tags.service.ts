import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { FindAllQueryArgs } from "../admin.type";

@Injectable()
export class TagsService {
	constructor(private readonly prisma: PrismaService) {}

	async findAll(
		query: FindAllQueryArgs,
	): Promise<{ data: Partial<{ id: number; name: string }>[]; total: number }> {
		const take = Number.parseInt(query._perPage) || 100;
		const offset = query._page ? (Number.parseInt(query._page) - 1) * take : 0;
		const data = await this.prisma.tags.findMany({
			skip: offset || 0,
			take: take || 100,
			orderBy: {
				[query._sortField]: query._sortDir,
			},
		});
		const total = await this.prisma.tags.count();
		return { data, total };
	}
}
