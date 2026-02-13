import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { medias, tests_news } from "@prisma/client";
import { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class FrontTestNewsService {
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

	async getTestNews(domains: string[] = [], limit: number | null = null) {
		const testNews = await this.prismaService.tests_news.findMany({
			take: limit ? limit : 100,
			where: {
				AND: {
					enable: true,
					from: {
						lte: this.getNow(),
					},
					tests_news_community: domains?.length
						? {
								some: {
									community: {
										name: {
											in: domains,
										},
									},
								},
							}
						: undefined,
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
			},
			include: {
				media: true,
				tests_news_community: {
					include: {
						community: {
							select: {
								name: true,
							},
						},
					},
				},
			},
			orderBy: [
				{
					from: "desc",
				},
			],
		});

		return testNews.map((news) => this.mapNewsMedia(news));
	}

	// We return the three most recent news for given domains
	async getTestNewsHome(domains: string[] = []) {
		return this.getTestNews(domains, 3);
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
