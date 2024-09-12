import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { medias, tests_news } from "@prisma/client";
import { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";

const mapTestNewsCommunities = (testNews) => {
	if (!testNews) {
		return null;
	}

	const { tests_news_community, ...rest } = testNews;
	return {
		...rest,
		communities: tests_news_community.map(({ community }) => community.name),
	};
};

// take news ordered by from date from most recent to oldest
export const getOneNewsPerDomains = (
	domains: string[],
	news: {
		id: string;
		tests_news_community: { community: { name: string } }[];
		from: Date;
	}[],
) => {
	const testNewsWithCommunities = news.map(mapTestNewsCommunities);

	return domains
		.map((domain) => {
			return testNewsWithCommunities.filter(({ communities, id }) =>
				communities.includes(domain),
			)[0];
		})
		.filter((news) => !!news)
		.sort((a, b) => b.from - a.from)
		.slice(0, 3);
};

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

	// We return one news per domain in the order of the domains. And we return only 3 results
	async getTestNewsHome(domains: string[] = []) {
		const testNews = await this.getTestNews(domains);

		// @ts-expect-error
		return getOneNewsPerDomains(domains, testNews);
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
