import { Injectable } from "@nestjs/common";
import { license } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { FilterQuery, transformFilters } from "../../utils/filter";
import { FindAllQueryArgs } from "../admin.type";
import { CreateLicenseDto, UpdateLicenseDto } from "./dto/license.dto";

@Injectable()
export class LicensesService {
	constructor(private prismaService: PrismaService) {}

	private parseFilters(query: FindAllQueryArgs): FilterQuery {
		if (!query) return {};

		const filters = JSON.parse(query._filters || "{}");

		return filters
			? transformFilters(filters, [
					{ field: "name_fr", mode: "contains" },
					{
						field: "license_community.community_id",
						mode: "equals",
						excludeBatch: true,
					},
				])
			: {};
	}

	private calculateOffset(query: FindAllQueryArgs, take: number): number {
		return query._page ? (Number.parseInt(query._page) - 1) * take : 0;
	}

	async create(createLicenseDto: CreateLicenseDto) {
		const {
			license_community: licenseCommunities,
			media_id,
			...licenseData
		} = createLicenseDto;

		const createdLicense = await this.prismaService.license.create({
			data: licenseData,
		});

		await this.prismaService.license_community.createMany({
			data: licenseCommunities.map((community) => ({
				license_id: createdLicense.id,
				community_id: community.community_id,
			})),
		});

		return this.findOne(createdLicense.id);
	}

	async findAll(
		query: FindAllQueryArgs,
	): Promise<{ data: Partial<license>[]; total: number }> {
		const filters = this.parseFilters(query);
		const take = Number.parseInt(query._perPage) || 100;
		const offset = this.calculateOffset(query, take);

		const data = await this.prismaService.license.findMany({
			skip: offset || 0,
			take: take || 100,
			where: filters,
			include: {
				license_community: {
					include: {
						community: true,
					},
				},
			},
			orderBy: {
				[query._sortField]: query._sortDir,
			},
		});

		const total = await this.prismaService.license.count({ where: filters });

		for (const license of data) {
			if (license.pdf && typeof license.pdf === "object") {
				license.pdf = { ...license.pdf, src: undefined };
			}
		}

		return { data, total };
	}

	findOne(id: number): Promise<license> {
		return this.prismaService.license.findUnique({
			where: { id },
			include: {
				license_community: {
					include: {
						community: true,
					},
				},
			},
		});
	}

	async update(id: number, updateLicenseDto: UpdateLicenseDto) {
		const {
			license_community: licenseCommunities,
			id: idLicense,
			...licenseData
		} = updateLicenseDto;

		// Update information about the license
		await this.prismaService.license.update({
			where: { id },
			data: {
				...licenseData,
			},
		});

		// prepare the operations
		const deleteManyOperation = this.prismaService.license_community.deleteMany(
			{
				where: { license_id: id },
			},
		);

		const createManyOperation = this.prismaService.license_community.createMany(
			{
				data: licenseCommunities.map((community) => ({
					license_id: id,
					community_id: community.community_id,
				})),
			},
		);

		// perform the operations in a transaction
		if (licenseCommunities) {
			await this.prismaService.$transaction([
				deleteManyOperation,
				createManyOperation,
			]);
		} else {
			await this.prismaService.$transaction([deleteManyOperation]);
		}

		return this.findOne(id);
	}

	async updateForCommon(id: number) {
		const updateCommonFalse = this.prismaService
			.$executeRaw`UPDATE license SET common = FALSE WHERE common`;
		const updateCommonTrue = this.prismaService
			.$executeRaw`UPDATE license SET common = TRUE WHERE id = ${id}`;

		await this.prismaService.$transaction([
			updateCommonFalse,
			updateCommonTrue,
		]);
	}

	remove(id: number) {
		return this.prismaService.license.delete({ where: { id } });
	}
}
