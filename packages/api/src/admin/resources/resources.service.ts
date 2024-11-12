import { Injectable } from "@nestjs/common";
import { resources } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { FilterQuery } from "../../utils/filter";
import { FindAllQueryArgs } from "../admin.type";
import { CreateResourceDto, UpdateResourceDto } from "./dto/resource.dto";
@Injectable()
export class ResourcesService {
	constructor(private prismaService: PrismaService) {}

	private parseFilters(query: FindAllQueryArgs): FilterQuery {
		if (!query) return {};
	}

	private calculateOffset(query: FindAllQueryArgs, take: number): number {
		return query._page ? (Number.parseInt(query._page) - 1) * take : 0;
	}

	async findAll(
		query: FindAllQueryArgs,
	): Promise<{ data: Partial<resources>[]; total: number }> {
		const filters = this.parseFilters(query);
		const take = Number.parseInt(query._perPage) || 100;
		const offset = this.calculateOffset(query, take);

		const data = await this.prismaService.resources.findMany({
			skip: offset || 0,
			take: take || 100,
			orderBy: {
				[query._sortField]: query._sortDir,
			},
		});

		const total = await this.prismaService.resources.count({ where: filters });
		return { data, total };
	}

	findOne(id: number): Promise<Partial<resources>> {
		return this.prismaService.resources.findUnique({
			where: { id },
		});
	}

	async create(createResourceDto: CreateResourceDto) {
		const { media_id, media, ...resourceData } = createResourceDto;
		const createdResource = await this.prismaService.resources.create({
			data: {
				...resourceData,
				media: media_id ? { connect: { id: media_id } } : undefined,
			},
		});
		return this.findOne(createdResource.id);
	}
	async update(id: number, updateResourceDto: UpdateResourceDto) {
		const { id: idResources, media_id, ...resourceData } = updateResourceDto;

		await this.prismaService.resources.update({
			where: { id },
			data: {
				...resourceData,
				media: media_id
					? {
							connect: {
								id: media_id,
							},
						}
					: {
							disconnect: true,
						},
			},
		});
		return this.findOne(id);
	}
	remove(id: number) {
		return this.prismaService.resources.delete({ where: { id } });
	}
}
