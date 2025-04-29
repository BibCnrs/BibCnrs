import { promises as fsPromises, unlinkSync } from "node:fs";
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

	async findAll(query: FindAllQueryArgs): Promise<{
		data: Partial<medias & { tags?: number[] }>[];
		total: number;
	}> {
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
			include: {
				tags_medias: {
					include: {
						tags: true,
					},
				},
			},
		});

		const transformedData = data.map((media) => ({
			...media,
			tags: media.tags_medias.map((relation) => relation.tags.id),
		}));

		const total = await this.prismaService.medias.count({
			where: filters,
		});
		return { data: transformedData, total };
	}

	findOne(id: number): Promise<Partial<medias>> {
		return this.prismaService.medias.findUnique({
			where: {
				id,
			},
			include: {
				tags_medias: {
					select: {
						tags_id: true,
					},
				},
			},
		});
	}

	getTagRelations(
		tags: number[],
		tags_medias: string,
		media_id: number,
	): { tags_id: number; medias_id: number }[] {
		let tagRelations: { tags_id: number; medias_id: number }[] = [];

		if (tags_medias) {
			const tags = tags_medias.split(",");
			for (const tag of tags) {
				const tag_id = Number.parseInt(tag, 10);
				if (!Number.isNaN(tag_id)) {
					tagRelations.push({ tags_id: tag_id, medias_id: media_id });
				}
			}
		}

		if (tags && tags.length > 0) {
			tagRelations = tags.map((tag) => ({
				medias_id: media_id,
				tags_id: tag,
			}));
		}

		return tagRelations;
	}

	async create(createMediaDto: CreateMediaDto) {
		const { tags, tags_id, ...mediaData } = createMediaDto;

		const createdMedia = await this.prismaService.$transaction(
			async (prisma) => {
				const media = await prisma.medias.create({
					data: mediaData,
				});

				const tagRelations = this.getTagRelations(tags, tags_id, media.id);

				await prisma.tags_medias.createMany({
					data: tagRelations,
				});

				return media;
			},
		);

		return this.findOne(createdMedia.id);
	}

	async update(
		id: number,
		updateMediaDto: UpdateMediaDto,
		file?: Express.Multer.File,
	) {
		const media = await this.prismaService.medias.findUnique({
			where: { id },
		});

		if (!media) {
			throw new Error(`${id} not found`);
		}
		if (file) {
			try {
				const newFile = await fsPromises.readFile(file.path);

				await fsPromises.writeFile(media.file, newFile);

				unlinkSync(file.path);
			} catch (error) {
				console.error("Error while updating file content", error);
			}
		}

		return this.prismaService.medias.update({
			where: { id },
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
