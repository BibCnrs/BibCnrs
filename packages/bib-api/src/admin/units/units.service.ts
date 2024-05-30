import { Injectable } from "@nestjs/common";
import { unit } from "@prisma/client";
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
import { CreateUnitDto, UpdateUnitDto } from "./dto/unit.dto";

@Injectable()
export class UnitsService {
	constructor(private prismaService: PrismaService) {}

	private parseFilters(query: FindAllQueryArgs): FilterQuery {
		if (!query) return {};

		const filters = JSON.parse(query._filters || "{}");
		return filters
			? transformFilters(filters, [
					{ field: "code", mode: "contains" },
					{ field: "comment", mode: "contains" },
					{ field: "name", mode: "contains" },
					{ field: "implantation", mode: "contains" },
					{ field: "building", mode: "contains" },
					{ field: "street", mode: "contains" },
					{ field: "post_office_box", mode: "contains" },
					{ field: "postal_code", mode: "contains" },
					{ field: "country", mode: "contains" },
					{ field: "unit_dr", mode: "contains" },
					{ field: "director_name", mode: "contains" },
					{ field: "director_firstname", mode: "contains" },
					{ field: "director_mail", mode: "contains" },
					{ field: "correspondant_documentaire", mode: "contains" },
					{ field: "cd_phone", mode: "contains" },
					{ field: "cd_mail", mode: "contains" },
					{ field: "correspondant_informatique", mode: "contains" },
					{ field: "ci_phone", mode: "contains" },
					{ field: "ci_mail", mode: "contains" },
					{ field: "body", mode: "contains" },
					{ field: "active", mode: "equals", excludeMatch: true },
					{ field: "main_institute", mode: "equals", excludeMatch: true },
					{
						field: "unit_community.community_id",
						mode: "equals",
						excludeMatch: true,
					},
					{
						field: "unit_institute.institute_id",
						mode: "equals",
						excludeMatch: true,
					},
					{
						field: "unit_section_cn.section_cn_id",
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
		const order = transformOrderBy(query._sortField, query._sortDir);

		const data = await this.prismaService.unit.findMany({
			skip: offset || 0,
			take: take || 100,
			where: filters,
			orderBy: order,
			include: {
				unit_community: {
					select: {
						community_id: true,
					},
				},
				unit_institute: {
					select: {
						institute_id: true,
					},
				},
				unit_section_cn: {
					select: {
						section_cn_id: true,
					},
				},
				_count: {
					select: {
						janus_account: true,
						inist_account: true,
					},
				},
			},
		});

		for (const unit of data as typeof data &
			{
				communities?: number[];
				institutes?: number[];
				sections_cn?: number[];
				nb_inist_account?: number;
				nb_janus_account?: number;
			}[]) {
			unit.communities = unit.unit_community.map((item) => item.community_id);
			unit.institutes = unit.unit_institute.map((item) => item.institute_id);
			unit.sections_cn = unit.unit_section_cn.map((item) => item.section_cn_id);
			unit.nb_inist_account = unit._count.inist_account;
			unit.nb_janus_account = unit._count.janus_account;
			// biome-ignore lint/performance/noDelete: Check if we could replace it by undefined after presta.
			delete unit.unit_section_cn;
			// biome-ignore lint/performance/noDelete: Check if we could replace it by undefined after presta.
			delete unit.unit_institute;
			// biome-ignore lint/performance/noDelete: Check if we could replace it by undefined after presta.
			delete unit.unit_community;
			// biome-ignore lint/performance/noDelete: Check if we could replace it by undefined after presta.
			delete unit._count;
		}

		const total = await this.prismaService.unit.count({ where: filters });
		return { data, total };
	}

	async findOne(id: number): Promise<unit> {
		const unit = await this.prismaService.$queryRaw`
        SELECT *,
            ARRAY(${selectCommunities}) AS communities,
            ARRAY(${selectInstitutes}) AS institutes,
            ARRAY(${selectSectionsCN}) AS sections_cn,
            (${selectNbInistAccount})::INT AS nb_inist_account,
            (${selectNbJanusAccount})::INT AS nb_janus_account
        FROM unit WHERE id = ${id} LIMIT 1;`;
		return unit[0];
	}

	async create(createUnitDto: CreateUnitDto) {
		const {
			communities: unitCommunities,
			institutes: unitInstitutes,
			sections_cn: unitSectionsCN,
			...unitData
		} = createUnitDto;

		const createdUnit = await this.prismaService.unit.create({
			data: unitData,
		});

		if (unitCommunities && unitCommunities.length > 0) {
			await this.prismaService.unit_community.createMany({
				data: unitCommunities.map((community) => ({
					unit_id: createdUnit.id,
					community_id: community,
				})),
			});
		}

		if (unitInstitutes && unitInstitutes.length > 0) {
			await this.prismaService.unit_institute.createMany({
				data: unitInstitutes.map((institute) => ({
					unit_id: createdUnit.id,
					institute_id: institute,
				})),
			});
		}
		if (unitSectionsCN && unitSectionsCN.length > 0) {
			await this.prismaService.unit_section_cn.createMany({
				data: unitSectionsCN.map((section) => ({
					unit_id: createdUnit.id,
					section_cn_id: section,
				})),
			});
		}
		return this.findOne(createdUnit.id);
	}

	async update(id: number, updateUnitDto: UpdateUnitDto) {
		const {
			id: _,
			communities: unitCommunities,
			institutes: unitInstitutes,
			sections_cn: unitSections_cn,
			nb_inist_account,
			nb_janus_account,
			...unitData
		} = updateUnitDto;

		// Update information about the unit
		await this.prismaService.unit.update({
			where: { id },
			data: unitData,
		});

		// prepare the delete operations
		const deleteManyCommunityOperation =
			this.prismaService.unit_community.deleteMany({
				where: { unit_id: id },
			});
		const deleteManyInstituteOperation =
			this.prismaService.unit_institute.deleteMany({
				where: { unit_id: id },
			});
		const deleteManySectionOperation =
			this.prismaService.unit_section_cn.deleteMany({
				where: { unit_id: id },
			});
		// create an array to hold all operations
		const operations = [
			deleteManyCommunityOperation,
			deleteManyInstituteOperation,
			deleteManySectionOperation,
		];

		// conditionally add createMany operations based on data existence
		if (unitCommunities && unitCommunities.length > 0) {
			const createManyCommunityOperation =
				this.prismaService.unit_community.createMany({
					data: unitCommunities.map((community) => ({
						unit_id: id,
						community_id: community,
					})),
				});
			operations.push(createManyCommunityOperation);
		}
		if (unitInstitutes && unitInstitutes.length > 0) {
			const createManyInstituteOperation =
				this.prismaService.unit_institute.createMany({
					data: unitInstitutes.map((institute) => ({
						unit_id: id,
						institute_id: institute,
					})),
				});
			operations.push(createManyInstituteOperation);
		}
		if (unitSections_cn && unitSections_cn.length > 0) {
			const createManyUnitOperation =
				this.prismaService.unit_section_cn.createMany({
					data: unitSections_cn.map((section) => ({
						unit_id: id,
						section_cn_id: section,
					})),
				});
			operations.push(createManyUnitOperation);
		}
		// perform the operations in a transaction
		await this.prismaService.$transaction(operations);
		return this.findOne(id);
	}

	remove(id: number) {
		return this.prismaService.unit.delete({ where: { id } });
	}
}
