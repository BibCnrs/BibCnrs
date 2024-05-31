import { Injectable } from "@nestjs/common";
import { section_cn, unit } from "@prisma/client";
import {
	selectCommunities,
	selectInstitutes,
	selectNbInistAccount,
	selectNbJanusAccount,
	selectSectionsCN,
} from "../../ebsco/ebsco-units/ebsco-units.queries";
import { PrismaService } from "../../prisma/prisma.service";
import { FilterQuery, transformFilters } from "../../utils/filter";
import { transformOrderBy } from "../../utils/orderBy";
import { FindAllQueryArgs } from "../admin.type";
import { CreateSectionCNDto, UpdateSectionCNDto } from "./dto/sectionCN.dto";

@Injectable()
export class SectionsCNService {
	constructor(private prismaService: PrismaService) {}

	private parseFilters(query: FindAllQueryArgs): FilterQuery {
		if (!query) return {};

		const filters = JSON.parse(query._filters || "{}");
		return filters
			? transformFilters(filters, [
					{ field: "name", mode: "contains" },
					{ field: "code", mode: "contains" },
					{ field: "comment", mode: "contains" },
					{ field: "comment", mode: "contains" },
					{
						field: "section_cn_primary_institute.institute_id",
						mode: "equals",
						excludeMatch: true,
					},
					{
						field: "section_cn_secondary_institute.institute_id",
						mode: "equals",
						excludeMatch: true,
					},
				])
			: {};
	}

	private calculateOffset(query: FindAllQueryArgs, take: number): number {
		return query._page ? (Number.parseInt(query._page) - 1) * take : 0;
	}

	async findAll(
		query: FindAllQueryArgs,
	): Promise<{ data: Partial<unit>[]; total: number }> {
		const filters = this.parseFilters(query);
		const take = Number.parseInt(query._perPage) || 100;
		const offset = this.calculateOffset(query, take);

		const data = await this.prismaService.section_cn.findMany({
			skip: offset || 0,
			take: take || 100,
			where: filters,
			orderBy: {
				[query._sortField || "id"]: query._sortDir || "asc",
			},
			include: {
				section_cn_primary_institute: {
					select: {
						institute_id: true,
					},
				},
				section_cn_secondary_institute: {
					select: {
						institute_id: true,
					},
				},
			},
		});

		if (!data) {
			return { data: [], total: 0 };
		}

		for (const section of data as typeof data &
			{ primary_institutes: number[]; secondary_institutes: number[] }[]) {
			section.primary_institutes = section.section_cn_primary_institute?.map(
				(item) => item.institute_id,
			);

			section.secondary_institutes =
				section.section_cn_secondary_institute?.map(
					(item) => item.institute_id,
				);
			// biome-ignore lint/performance/noDelete: Check if we could replace it by undefined after presta.
			delete section.section_cn_primary_institute;
			// biome-ignore lint/performance/noDelete: Check if we could replace it by undefined after presta.
			delete section.section_cn_secondary_institute;
		}

		const total = await this.prismaService.section_cn.count({ where: filters });
		return { data, total };
	}

	async findOne(id: number): Promise<section_cn> {
		const section = await this.prismaService.section_cn.findUnique({
			where: {
				id,
			},
			include: {
				section_cn_primary_institute: {
					select: {
						institute_id: true,
					},
				},
				section_cn_secondary_institute: {
					select: {
						institute_id: true,
					},
				},
			},
		});

		if (!section) {
			return null;
		}

		const data = section as typeof section & {
			primary_institutes?: number[];
			secondary_institutes?: number[];
		};

		data.primary_institutes = data.section_cn_primary_institute.map(
			(item) => item.institute_id,
		);

		data.secondary_institutes = data.section_cn_secondary_institute.map(
			(item) => item.institute_id,
		);
		// biome-ignore lint/performance/noDelete: Remove this after presta.
		delete data.section_cn_primary_institute;
		// biome-ignore lint/performance/noDelete: Remove this after presta.
		delete data.section_cn_secondary_institute;

		return data;
	}

	async create(createSectionCNDto: CreateSectionCNDto) {
		const { primary_institutes, secondary_institutes, ...sectionCNData } =
			createSectionCNDto;
		const createdSectionCN = await this.prismaService.section_cn.create({
			data: sectionCNData,
		});

		if (primary_institutes) {
			await this.prismaService
				.$queryRaw`INSERT INTO section_cn_primary_institute (section_cn_id, institute_id) VALUES (${createdSectionCN.id}, ${primary_institutes})`;
		}

		if (secondary_institutes && secondary_institutes.length > 0) {
			await this.prismaService.section_cn_secondary_institute.createMany({
				data: secondary_institutes.map((institute) => ({
					section_cn_id: createdSectionCN.id,
					institute_id: institute,
				})),
			});
		}
		return this.findOne(createdSectionCN.id);
	}

	async update(id: number, updateSectionCNDto: UpdateSectionCNDto) {
		const { primary_institutes, secondary_institutes, ...sectionCNData } =
			updateSectionCNDto;

		await this.prismaService.section_cn.update({
			where: {
				id,
			},
			data: sectionCNData,
		});

		if (primary_institutes) {
			this.prismaService
				.$queryRaw`UPDATE section_cn_primary_institute SET institute_id = ${primary_institutes} WHERE section_cn_id = ${id}`;
		}

		// prepare the operations
		const deleteManyOperation =
			this.prismaService.section_cn_secondary_institute.deleteMany({
				where: { section_cn_id: id },
			});

		const operations = [deleteManyOperation];

		if (secondary_institutes && secondary_institutes.length > 0) {
			const createManyOperation =
				this.prismaService.section_cn_secondary_institute.createMany({
					data: secondary_institutes.map((institute) => ({
						section_cn_id: id,
						institute_id: institute,
					})),
				});

			operations.push(createManyOperation);
		}

		await this.prismaService.$transaction(operations);

		return this.findOne(id);
	}

	remove(id: number) {
		return this.prismaService.section_cn.delete({ where: { id } });
	}
}
