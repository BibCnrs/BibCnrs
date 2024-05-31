import { Injectable } from "@nestjs/common";
import { admin_user } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { SecurityService } from "../../security/security.service";
import { FilterQuery, transformFilters } from "../../utils/filter";
import { FindAllQueryArgs } from "../admin.type";
import { CreateAdminUserDto, UpdateAdminUserDto } from "./dto/admin-user.dto";
@Injectable()
export class AdminUsersService {
	constructor(
		private prismaService: PrismaService,
		private securityService: SecurityService,
	) {}

	private parseFilters(query: FindAllQueryArgs): FilterQuery {
		if (!query) return {};

		const filters = JSON.parse(query._filters || "{}");
		return filters
			? transformFilters(filters, [
					{ field: "username", mode: "contains" },
					{ field: "comment", mode: "contains" },
				])
			: {};
	}

	private calculateOffset(query: FindAllQueryArgs, take: number): number {
		return query._page ? (Number.parseInt(query._page) - 1) * take : 0;
	}

	async findAll(
		query: FindAllQueryArgs,
	): Promise<{ data: Partial<admin_user>[]; total: number }> {
		const filters = this.parseFilters(query);
		const take = Number.parseInt(query._perPage) || 100;
		const offset = this.calculateOffset(query, take);

		const data = await this.prismaService.admin_user.findMany({
			select: {
				id: true,
				username: true,
				comment: true,
			},
			skip: offset || 0,
			take: take || 100,
			where: filters,
			orderBy: {
				[query._sortField]: query._sortDir,
			},
		});

		const total = await this.prismaService.admin_user.count({ where: filters });
		return { data, total };
	}

	findOne(id: number): Promise<Partial<admin_user>> {
		return this.prismaService.admin_user.findUnique({
			select: {
				id: true,
				username: true,
				comment: true,
			},
			where: { id },
		});
	}

	async create(createAdminUserDto: CreateAdminUserDto) {
		const { salt, hash } = await this.securityService.hashPassword(
			createAdminUserDto.password,
		);

		return this.prismaService.admin_user.create({
			data: {
				...createAdminUserDto,
				salt,
				password: hash,
			},
		});
	}

	async createMany(createAdminUserDtos: CreateAdminUserDto[]) {
		const data = await Promise.all(
			createAdminUserDtos.map(async (createAdminUserDto) => {
				const { salt, hash } = await this.securityService.hashPassword(
					createAdminUserDto.password,
				);
				return {
					...createAdminUserDto,
					salt,
					password: hash,
				};
			}),
		);
		return this.prismaService.admin_user.createMany({
			data,
		});
	}

	async update(id: number, updateAdminUserDto: UpdateAdminUserDto) {
		const { salt, hash } = await this.securityService.hashPassword(
			updateAdminUserDto.password,
		);

		return this.prismaService.admin_user.update({
			data: {
				...updateAdminUserDto,
				salt,
				password: hash,
			},
			where: { id },
		});
	}

	remove(id: number) {
		return this.prismaService.admin_user.delete({ where: { id } });
	}
}
