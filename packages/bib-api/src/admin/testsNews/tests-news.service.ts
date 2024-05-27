import { Injectable } from "@nestjs/common";
import { tests_news } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { FilterQuery, transformFilters } from "../../utils/filter";
import { FindAllQueryArgs } from "../admin.type";
import { CreateTestNewsDto, UpdateTestNewsDto } from "./dto/test-news.dto";
@Injectable()
export class TestsNewsService {
	constructor(private prismaService: PrismaService) {}

	private parseFilters(query: FindAllQueryArgs): FilterQuery {
		if (!query) return {};

		const filters = JSON.parse(query._filters || "{}");
		return filters
			? transformFilters(filters, [
					{ field: "name_fr", mode: "contains" },
					{
						field: "page",
						mode: "equals",
						excludeBatch: true,
					},
				])
			: {};
	}

	private calculateOffset(query: FindAllQueryArgs, take: number): number {
		return query._page ? (Number.parseInt(query._page) - 1) * take : 0;
	}

	private formatData(data: UpdateTestNewsDto | CreateTestNewsDto) {
		const formattedData = {
			...data,
			from: new Date(data.from),
			domains: data.domains !== null ? data.domains : undefined,
		};
		if (data.to) {
			formattedData.to = new Date(data.to);
		}

		return formattedData;
	}

	async findAll(
		query: FindAllQueryArgs,
	): Promise<{ data: Partial<tests_news>[]; total: number }> {
		const filters = this.parseFilters(query);
		const take = Number.parseInt(query._perPage) || 100;
		const offset = this.calculateOffset(query, take);

		const data = await this.prismaService.tests_news.findMany({
			skip: offset || 0,
			take: take || 100,
			where: filters,
			orderBy: {
				[query._sortField]: query._sortDir,
			},
		});

		const total = await this.prismaService.tests_news.count({
			where: filters,
		});
		return { data, total };
	}

	findOne(id: number): Promise<Partial<tests_news>> {
		return this.prismaService.tests_news.findUnique({
			where: {
				id,
			},
		});
	}

	create(createTestNewsDto: CreateTestNewsDto) {
		return this.prismaService.tests_news.create({
			data: this.formatData(createTestNewsDto),
		});
	}

	update(id: number, updateTestNewsDto: UpdateTestNewsDto) {
		return this.prismaService.tests_news.update({
			where: {
				id,
			},
			data: this.formatData(updateTestNewsDto),
		});
	}

	remove(id: number) {
		return this.prismaService.tests_news.delete({ where: { id } });
	}
}
