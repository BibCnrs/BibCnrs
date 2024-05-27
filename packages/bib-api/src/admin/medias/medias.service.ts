import { unlinkSync } from "node:fs";
import { Injectable } from "@nestjs/common";
import { medias } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { FilterQuery, transformFilters } from "../../utils/filter";
import { FindAllQueryArgs } from "../admin.type";
import { CreateMediaDto, UpdateMediaDto } from "./dto/media.dto";
@Injectable()
export class MediasService {
	constructor(private prismaService: PrismaService) {}

	private parseFilters(query: FindAllQueryArgs): FilterQuery {
		if (!query) return {};

		const filters = JSON.parse(query._filters || "{}");
		return filters
			? transformFilters(filters, [
					{ field: "name", mode: "contains" },
					{ field: "file_name", mode: "contains" },
				])
			: {};
	}

	private calculateOffset(query: FindAllQueryArgs, take: number): number {
		return query._page ? (Number.parseInt(query._page) - 1) * take : 0;
	}

	async findAll(
		query: FindAllQueryArgs,
	): Promise<{ data: Partial<medias>[]; total: number }> {
		const filters = this.parseFilters(query);
		const take = Number.parseInt(query._perPage) || 100;
		const offset = this.calculateOffset(query, take);

		const data = await this.prismaService.medias.findMany({
			skip: offset || 0,
			take: take || 100,
			where: filters,
			orderBy: {
				[query._sortField]: query._sortDir,
			},
		});

		// data = data.map((entry) => {
		// 	entry.url = content_delivery.host + entry.url;
		// 	return entry;
		// });

		const total = await this.prismaService.medias.count({
			where: filters,
		});
		return { data, total };
	}

	findOne(id: number): Promise<Partial<medias>> {
		return this.prismaService.medias.findUnique({
			where: {
				id,
			},
		});
	}

	create(createMediaDto: CreateMediaDto) {
		return this.prismaService.medias.create({
			data: createMediaDto,
		});
	}

	update(id: number, updateMediaDto: UpdateMediaDto) {
		return this.prismaService.medias.update({
			where: {
				id,
			},
			data: updateMediaDto,
		});
	}

	async remove(id: number) {
		const media = await this.prismaService.medias.findUnique({ where: { id } });
		if (!media) {
			return null;
		}
		try {
			unlinkSync(media.file);
		} catch (error) {
			console.error("Error while removing file", error);
		}
		return this.prismaService.medias.delete({ where: { id } });
	}
}
