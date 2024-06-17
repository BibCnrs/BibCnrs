import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class EbscoDomainService {
	constructor(private prismaService: PrismaService) {}

	async getCommunities(where: Prisma.communityWhereInput = {}) {
		return this.prismaService.community.findMany({
			where,
		});
	}
}
