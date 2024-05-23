import { Injectable } from "@nestjs/common";
import { admin_user } from "@prisma/client";
import {
	CreateAdminUserDto,
	UpdateAdminUserDto,
} from "packages/bib-api/src/admin/admin-users/dto/admin-user.dto";
import { FindAllQueryArgs } from "packages/bib-api/src/admin/admin.type";
import { PrismaService } from "packages/bib-api/src/prisma/prisma.service";
import {
	FilterQuery,
	transformFilters,
} from "packages/bib-api/src/utils/filter";
@Injectable()
export class AdminUsersService {
	constructor(private prismaService: PrismaService) {}

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

	private hashPassword(
		createAdminUserDto: CreateAdminUserDto | UpdateAdminUserDto,
	) {
		let password = createAdminUserDto.password;
		let salt = "salt";

		// TODO: Hash password after implementing password hashing
		if (createAdminUserDto.password) {
			password = "salted and hashed password";
			salt = "salt";
		}
		return { salt, password };
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

	create(createAdminUserDto: CreateAdminUserDto) {
		const { salt, password } = this.hashPassword(createAdminUserDto);

		return this.prismaService.admin_user.create({
			data: {
				...createAdminUserDto,
				salt,
				password,
			},
		});
	}

	createMany(createAdminUserDtos: CreateAdminUserDto[]) {
		const data = createAdminUserDtos.map((createAdminUserDto) => {
			const { salt, password } = this.hashPassword(createAdminUserDto);
			return {
				...createAdminUserDto,
				salt,
				password,
			};
		});
		return this.prismaService.admin_user.createMany({
			data,
		});
	}

	update(id: number, updateAdminUserDto: UpdateAdminUserDto) {
		const { salt, password } = this.hashPassword(updateAdminUserDto);

		return this.prismaService.admin_user.update({
			data: {
				...updateAdminUserDto,
				salt,
				password,
			},
			where: { id },
		});
	}

	remove(id: number) {
		return this.prismaService.admin_user.delete({ where: { id } });
	}
}
