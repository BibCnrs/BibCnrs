import { Injectable } from "@nestjs/common";
import { institute } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { FilterQuery, transformFilters } from "../../utils/filter";
import { FindAllQueryArgs } from "../admin.type";
import { CreateInstituteDto, UpdateInstituteDto } from "./dto/institute.dto";
@Injectable()
export class InstitutesService {
	constructor(private prismaService: PrismaService) {}

	private parseFilters(query: FindAllQueryArgs): FilterQuery {
		if (!query) return {};

		const filters = JSON.parse(query._filters || "{}");
		return filters
			? transformFilters(filters, [
					{ field: "id", mode: "equals" },
					{ field: "code", mode: "contains" },
					{ field: "name", mode: "contains" },
					{
						field: "institute_community.community_id",
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
		data: Partial<institute & { communities?: number[] }>[];
		total: number;
	}> {
		const filters = this.parseFilters(query);
		const take = Number.parseInt(query._perPage) || 100;
		const offset = this.calculateOffset(query, take);

		const data = await this.prismaService.institute.findMany({
			skip: offset || 0,
			take: take || 100,
			where: filters,
			orderBy: {
				[query._sortField]: query._sortDir,
			},
			include: {
				institute_community: {
					select: {
						community_id: true,
					},
				},
			},
		});

		for (const institute of data as typeof data &
			{ communities?: number[] }[]) {
			institute.communities = institute.institute_community.map(
				(item) => item.community_id,
			);
			// biome-ignore lint/performance/noDelete: We don't want to return this field
			delete institute.institute_community;
		}

		const total = await this.prismaService.institute.count({
			where: filters,
		});
		return { data, total };
	}

	async findOne(id: number): Promise<Partial<institute>> {
		const institute = await this.prismaService.institute.findUnique({
			where: {
				id,
			},
			include: {
				institute_community: {
					select: {
						community_id: true,
					},
				},
			},
		});

		if (!institute) return null;

		const data = institute as typeof institute & { communities?: number[] };

		data.communities = data.institute_community.map(
			(item) => item.community_id,
		);
		// biome-ignore lint/performance/noDelete: <explanation>
		delete institute.institute_community;
		return institute;
	}

	async create(createInstituteDto: CreateInstituteDto) {
		const { communities, ...instituteData } = createInstituteDto;

		const createdInstitute = await this.prismaService.institute.create({
			data: instituteData,
		});

		if (!communities || communities.length === 0) {
			return this.findOne(createdInstitute.id);
		}

		await this.prismaService.institute_community.createMany({
			data: communities.map((community) => ({
				institute_id: createdInstitute.id,
				community_id: community,
			})),
		});

		return this.findOne(createdInstitute.id);
	}

	async update(id: number, updateInstituteDto: UpdateInstituteDto) {
		const {
			communities: instituteCommunities,
			id: instituteId,
			...instituteData
		} = updateInstituteDto;

		// Update information about the institute
		await this.prismaService.institute.update({
			where: { id },
			data: {
				...instituteData,
			},
		});

		// prepare the operations
		const deleteManyOperation =
			this.prismaService.institute_community.deleteMany({
				where: { institute_id: id },
			});

		// perform the operations in a transaction
		if (instituteCommunities && instituteCommunities.length > 0) {
			const createManyOperation =
				this.prismaService.institute_community.createMany({
					data: instituteCommunities?.map((community) => ({
						institute_id: id,
						community_id: community,
					})),
				});

			await this.prismaService.$transaction([
				deleteManyOperation,
				createManyOperation,
			]);
		} else {
			await this.prismaService.$transaction([deleteManyOperation]);
		}

		return this.findOne(id);
	}

	remove(id: number) {
		return this.prismaService.institute.delete({ where: { id } });
	}
}
