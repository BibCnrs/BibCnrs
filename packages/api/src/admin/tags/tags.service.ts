import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { FindAllQueryArgs } from "../admin.type";
import { CreateTagDto, UpdateTagDto } from "./dto/tags.dto";

@Injectable()
export class TagsService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createTagDto: CreateTagDto) {
		return await this.prisma.tag.create({
			data: createTagDto,
		});
	}

	async findAll(
		query: FindAllQueryArgs,
	): Promise<{ data: Partial<{ id: number; name: string }>[]; total: number }> {
		const take = Number.parseInt(query._perPage) || 100;
		const offset = query._page ? (Number.parseInt(query._page) - 1) * take : 0;
		const data = await this.prisma.tag.findMany({
			skip: offset || 0,
			take: take || 100,
			orderBy: {
				[query._sortField]: query._sortDir,
			},
		});
		const total = await this.prisma.tag.count();
		return { data, total };
	}

	async findOne(id: number) {
		return await this.prisma.tag.findUnique({
			where: { id },
		});
	}

	async update(id: number, updateTagDto: UpdateTagDto) {
		try {
			return await this.prisma.tag.update({
				where: { id },
				data: updateTagDto,
			});
		} catch (error) {
			return null;
		}
	}

	async remove(id: number) {
		try {
			return await this.prisma.tag.delete({
				where: { id },
			});
		} catch (error) {
			return null;
		}
	}
}
