import { promises as fsPromises, unlinkSync } from "node:fs";
import { Injectable } from "@nestjs/common";
import { Prisma, medias } from "@prisma/client";
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
	): Promise<{ data: (medias & { isUsed: boolean })[]; total: number }> {
		//const filters = this.parseFilters(query);
		const filters = JSON.parse(query._filters || "{}");
		const take = Number.parseInt(query._perPage) || 100;
		const offset = this.calculateOffset(query, take);

		const sortField = query._sortField;

		console.log(`${sortField ? `${sortField} ${query._sortDir}` : "m.id"}`);
		console.log(filters);

		const data = await this.prismaService.$queryRaw<
			(medias & { isUsed: boolean })[]
		>(Prisma.sql`
        SELECT
            m.*,
            EXISTS (
                SELECT 1
                FROM content_management cm
                WHERE cm.media_id = m.id
                UNION
                SELECT 1
                FROM resources r
                WHERE r.media_id = m.id
                UNION
                SELECT 1
                FROM tests_news tn
                WHERE tn.media_id = m.id
                UNION
                SELECT 1
                FROM license l
                WHERE l.media_id = m.id
                UNION
                SELECT 1
                FROM content_management cm
                WHERE cm.content_fr LIKE '%' || m.url || '%'
                OR cm.content_en LIKE '%' || m.url || '%'
            ) AS isUsed
        FROM medias m
		${this.getFiltersSql(filters)}
        ORDER BY ${sortField ? `${sortField} ${query._sortDir}` : "created_at desc"} 
        LIMIT ${take} 
		OFFSET ${offset}
    `);

		const total = await this.prismaService.medias.count({
			where: filters,
		});

		return { data, total };
		/*const sortField =
			query._sortField === "isUsed" ? undefined : query._sortField;

		const data = await this.prismaService.medias.findMany({
			skip: offset || 0,
			take: take || 100,
			where: filters,
			orderBy: sortField ? { [sortField]: query._sortDir } : undefined,
		});

		const dataWithUsage = await Promise.all(
			data.map(async (media) => {
				const isUsed = await this.isMediaUsed(media.id, media.url);
				return { ...media, isUsed };
			}),
		);

		const total = await this.prismaService.medias.count({
			where: filters,
		});
		return { data: dataWithUsage, total };*/
	}

	private async getFiltersSql(filters: FilterQuery): Promise<string> {
		const conditions = [];

		// Exemple de gestion des filtres
		if (filters.name) {
			conditions.push(`name LIKE '%${filters.name}%'`);
		}
		if (filters.from) {
			conditions.push(`created_at >= '${filters.from.toISOString()}'`);
		}
		if (filters.to) {
			conditions.push(`created_at <= '${filters.to.toISOString()}'`);
		}
		if (filters.enable !== undefined) {
			conditions.push(`enable = ${filters.enable}`);
		}
		if (filters.info !== undefined) {
			conditions.push(`info = ${filters.info}`);
		}
		if (filters.media_id) {
			conditions.push(`media_id = ${filters.media_id}`);
		}

		// Ajoutez d'autres conditions selon vos besoins

		return conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
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

		const isUsedByUrl = await this.prismaService.content_management.findFirst({
			where: {
				OR: [
					{ content_fr: { contains: mediaUrl } },
					{ content_en: { contains: mediaUrl } },
				],
			},
		});

		return !!isUsedByMediaId || !!isUsedByUrl;
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
