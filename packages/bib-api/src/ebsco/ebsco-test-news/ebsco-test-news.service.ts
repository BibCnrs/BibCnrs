import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { medias, tests_news } from "@prisma/client";
import { m } from "vitest/dist/reporters-yx5ZTtEV";
import { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class EbscoTestNewsService {
	private readonly servicesConfig: Config["services"];

	constructor(
		private prismaService: PrismaService,
		private readonly configService: ConfigService<Config, true>,
	) {
		this.servicesConfig =
			this.configService.get<Config["services"]>("services");
	}

	private getNow() {
		const now = new Date().toISOString().slice(0, 10);
		return new Date(now);
	}

	private mapNewsMedia(news: (tests_news & { media?: medias }) | null) {
		if (!news) {
			return null;
		}
		return {
			...news,
			media: news.media
				? {
						...news.media,
						url: news.media.url
							? `${this.servicesConfig.contentDelivery}${news.media.url}`
							: null,
					}
				: null,
		};
	}

	async getTestNews(first = false) {
		const testNews = await this.prismaService.tests_news.findMany({
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

		return testNews.map((news) => this.mapNewsMedia(news));
	}

	async findTestNewsById(id: number) {
		const news = await this.prismaService.tests_news.findFirst({
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

		return this.mapNewsMedia(news);
	}
}
