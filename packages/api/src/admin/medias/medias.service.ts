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

		// si filtre sans tag
		if (filters["tags_medias.tags_id"] === 0) {
			return {
				tags_medias: {
					none: {},
				},
			};
		}
		return filters
			? transformFilters(filters, [
					{ field: "name", mode: "contains" },
					{ field: "file_name", mode: "contains" },
					{
						field: "tags_medias.tags_id",
						mode: "equals",
						excludeMatch: true,
					},
				])
			: {};
	}

	private calculateOffset(query: FindAllQueryArgs, take: number): number {
		return query._page ? (Number.parseInt(query._page) - 1) * take : 0;
	}

	async findAll(query: FindAllQueryArgs): Promise<{
		data: Partial<medias & { tags?: number[] } & { isUsed: boolean }>[];
		total: number;
	}> {
		const filters = this.parseFilters(query);
		const take = Number.parseInt(query._perPage) || 100;
		const offset = this.calculateOffset(query, take);

		const sortField =
			query._sortField === "isUsed" ? undefined : query._sortField;

		const data = await this.prismaService.medias.findMany({
			skip: offset || 0,
			take: take || 100,
			where: filters,
			orderBy: sortField ? { [sortField]: query._sortDir } : undefined,
			include: {
				tags_medias: {
					include: {
						tags: true,
					},
				},
			},
		});

		const transformedData = await Promise.all(
			data.map(async (media) => {
				const isUsed = await this.isMediaUsed(media.id, media.url);
				const tags = media.tags_medias.map((relation) => relation.tags.id);
				return { ...media, tags, isUsed };
			}),
		);

		const total = await this.prismaService.medias.count({
			where: filters,
		});

		return { data: transformedData, total };
	}

	private async isMediaUsed(
		mediaId: number,
		mediaUrl: string,
	): Promise<boolean> {
		const isUsedByMediaId =
			(await this.prismaService.content_management.findFirst({
				where: {
					media_id: mediaId,
				},
			})) ||
			(await this.prismaService.resources.findFirst({
				where: {
					media_id: mediaId,
				},
			})) ||
			(await this.prismaService.tests_news.findFirst({
				where: {
					media_id: mediaId,
				},
			})) ||
			(await this.prismaService.license.findFirst({
				where: {
					media_id: mediaId,
				},
			}));

		const isUsedByUrl =
			(await this.prismaService.content_management.findFirst({
				where: {
					OR: [
						{ content_fr: { contains: mediaUrl } },
						{ content_en: { contains: mediaUrl } },
					],
				},
			})) ||
			(await this.prismaService.license.findFirst({
				where: {
					OR: [
						{ content_fr: { contains: mediaUrl } },
						{ content_en: { contains: mediaUrl } },
					],
				},
			})) ||
			(await this.prismaService.tests_news.findFirst({
				where: {
					OR: [
						{ content_fr: { contains: mediaUrl } },
						{ content_en: { contains: mediaUrl } },
					],
				},
			}));

		const isUsedByEncodedUrl =
			(await this.prismaService.content_management.findFirst({
				where: {
					OR: [
						{ content_fr: { contains: encodeURIComponent(mediaUrl) } },
						{ content_en: { contains: encodeURIComponent(mediaUrl) } },
					],
				},
			})) ||
			(await this.prismaService.license.findFirst({
				where: {
					OR: [
						{ content_fr: { contains: encodeURIComponent(mediaUrl) } },
						{ content_en: { contains: encodeURIComponent(mediaUrl) } },
					],
				},
			})) ||
			(await this.prismaService.tests_news.findFirst({
				where: {
					OR: [
						{ content_fr: { contains: encodeURIComponent(mediaUrl) } },
						{ content_en: { contains: encodeURIComponent(mediaUrl) } },
					],
				},
			})) ||
			(await this.prismaService.database.findFirst({
				where: {
					OR: [
						{ url_fr: { contains: mediaUrl } },
						{ url_en: { contains: mediaUrl } },
					],
				},
			}));

		return !!isUsedByMediaId || !!isUsedByUrl || !!isUsedByEncodedUrl;
	}

	async findOne(
		id: number,
	): Promise<Partial<medias & { tags?: number[] } & { isUsed: boolean }>> {
		const media = await this.prismaService.medias.findUnique({
			where: {
				id,
			},
			include: {
				tags_medias: {
					include: {
						tags: true,
					},
				},
			},
		});

		if (!media) return null;

		const tags = media.tags_medias.map((relation) => relation.tags.id);
		const isUsed = await this.isMediaUsed(media.id, media.url);

		return {
			...media,
			tags,
			isUsed,
		};
	}

	getTagRelations(
		tags: number[],
		tags_id?: string,
		media_id?: number,
	): { tags_id: number; medias_id: number }[] {
		let tagRelations: { tags_id: number; medias_id: number }[] = [];

		if (tags_id) {
			const tags = tags_id.split(",");
			for (const tag of tags) {
				const tag_id = Number.parseInt(tag, 10);
				if (!Number.isNaN(tag_id)) {
					tagRelations.push({ tags_id: tag_id, medias_id: media_id });
				}
			}
		} else if (tags) {
			tagRelations = tags.map((tag) => ({
				medias_id: media_id,
				tags_id: tag,
			}));
		}

		return tagRelations;
	}

	async updateTags(mediaId: number, tags?: number[], tags_id?: string) {
		await this.prismaService.tags_medias.deleteMany({
			where: { medias_id: mediaId },
		});

		const tagRelations = this.getTagRelations(tags, tags_id, mediaId);

		await this.prismaService.tags_medias.createMany({
			data: tagRelations,
		});
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

		updateMediaDto.created_at = new Date();

		const { tags, tags_id, ...mediaData } = updateMediaDto;

		await this.updateTags(id, tags, tags_id);

		return this.prismaService.medias.update({
			where: { id },
			data: mediaData,
		});
	}
	async remove(id: number) {
		const media = await this.prismaService.medias.findUnique({ where: { id } });
		if (!media) {
			return null;
		}
		const used = await this.isMediaUsed(media.id, media.url);
		if (used) {
			return media;
		}

		try {
			if (media.file) {
				unlinkSync(media.file);
			}
		} catch (error) {
			console.error("Error while removing file", error);
		}
		return this.prismaService.medias.delete({ where: { id } });
	}
}
