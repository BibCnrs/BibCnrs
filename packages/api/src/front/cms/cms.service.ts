import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class FrontCmsService {
	constructor(private prismaService: PrismaService) {}

	private getNow() {
		const now = new Date().toISOString().slice(0, 10);
		return new Date(now);
	}

	async getContent(page: string, first = false) {
		return this.prismaService.content_management.findMany({
			take: first ? 1 : 100,
			where: {
				AND: {
					page,
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
					from: page === "faq" ? undefined : "asc",
					order: page === "faq" ? "asc" : undefined,
				},
			],
		});
	}
}
