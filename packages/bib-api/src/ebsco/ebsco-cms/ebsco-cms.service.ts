import { Injectable } from "@nestjs/common";
import { PrismaService } from "packages/bib-api/src/prisma/prisma.service";

@Injectable()
export class EbscoCmsService {
	constructor(private prismaService: PrismaService) {}

	private getNow() {
		const now = new Date().toISOString().slice(0, 10);
		return new Date(now);
	}

	async getContent(page: string, take = 0) {
		console.log(
			"getContent",
			await this.prismaService.content_management.findMany(),
		);
		return this.prismaService.content_management.findMany({
			take,
			where: {
				AND: {
					page: page,
					enable: true,
				},
				OR: [
					{
						to: {
							gte: this.getNow(),
						},
					},
					{
						to: null,
					},
				],
			},
			orderBy: [
				{
					from: "asc",
				},
			],
		});
	}
}
