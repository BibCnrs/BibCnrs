import { Injectable } from "@nestjs/common";
import { content_management } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { FilterQuery, transformFilters } from "../../utils/filter";
import { FindAllQueryArgs } from "../admin.type";
import {
	CreateContentManagementDto,
	UpdateContentManagementDto,
} from "./dto/contents-management.dto";
@Injectable()
export class ContentsManagementService {
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

	private formatData(
		data: UpdateContentManagementDto | CreateContentManagementDto,
	) {
		const formattedData = {
			...data,
			from: new Date(data.from),
		};
		if (data.to) {
			formattedData.to = new Date(data.to);
		}

		return formattedData;
	}

	async findAll(
		query: FindAllQueryArgs,
	): Promise<{ data: Partial<content_management>[]; total: number }> {
		const filters = this.parseFilters(query);
		const take = Number.parseInt(query._perPage) || 100;
		const offset = this.calculateOffset(query, take);

		const data = await this.prismaService.content_management.findMany({
			skip: offset || 0,
			take: take || 100,
			where: filters,
			orderBy: {
				[query._sortField]: query._sortDir,
			},
		});

		const total = await this.prismaService.content_management.count({
			where: filters,
		});
		return { data, total };
	}

	findOne(id: number): Promise<Partial<content_management>> {
		return this.prismaService.content_management.findUnique({
			where: {
				id,
			},
		});
	}

	create(createContentManagementDto: CreateContentManagementDto) {
		return this.prismaService.content_management.create({
			data: this.formatData(createContentManagementDto),
		});
	}

	update(id: number, updateContentManagementDto: UpdateContentManagementDto) {
		return this.prismaService.content_management.update({
			where: {
				id,
			},
			data: this.formatData(updateContentManagementDto),
		});
	}

	remove(id: number) {
		return this.prismaService.content_management.delete({ where: { id } });
	}
}
