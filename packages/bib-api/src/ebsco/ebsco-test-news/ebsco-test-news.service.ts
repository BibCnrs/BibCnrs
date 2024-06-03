import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class EbscoTestNewsService {
	constructor(private prismaService: PrismaService) {}

	private getNow() {
		const now = new Date().toISOString().slice(0, 10);
		return new Date(now);
	}

	async getTestNews(first = false) {
		return this.prismaService.tests_news.findMany({
			take: first ? 1 : 100,
			where: {
				AND: {
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
			include: {
				media: true,
			},
			orderBy: [
				{
					from: "asc",
				},
			],
		});
	}

	async findTestNewsById(id: number) {
		return this.prismaService.tests_news.findFirst({
			where: {
				AND: {
					id,
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
			include: {
				media: true,
			},
		});
	}
}
