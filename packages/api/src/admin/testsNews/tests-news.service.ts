import { Injectable } from "@nestjs/common";
import { tests_news, tests_news_community } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { FilterQuery, transformFilters } from "../../utils/filter";
import { FindAllQueryArgs } from "../admin.type";
import { CreateTestNewsDto, UpdateTestNewsDto } from "./dto/test-news.dto";
@Injectable()
export class TestsNewsService {
	constructor(private prismaService: PrismaService) {}

	private parseFilters(query: FindAllQueryArgs): FilterQuery {
		if (!query) return {};

		const filters = JSON.parse(query._filters || "{}");
		return filters
			? transformFilters(filters, [
					{ field: "name_fr", mode: "contains" },
					{
						field: "page",
						mode: "equals",
						excludeBatch: true,
					},
				])
			: {};
	}

	private calculateOffset(query: FindAllQueryArgs, take: number): number {
		return query._page ? (Number.parseInt(query._page) - 1) * take : 0;
	}

	private formatData(data) {
		const formattedData = {
			...data,
			from: new Date(data.from),
			domains: data.domains !== null ? data.domains : undefined,
		};
		if (data.to) {
			formattedData.to = new Date(data.to);
		}

		return formattedData;
	}

	async findAll(
		query: FindAllQueryArgs,
	): Promise<{ data: Partial<tests_news>[]; total: number }> {
		const filters = this.parseFilters(query);
		const take = Number.parseInt(query._perPage) || 100;
		const offset = this.calculateOffset(query, take);

		await this.desactivateExpiredNews();

		const data = await this.prismaService.tests_news.findMany({
			skip: offset || 0,
			take: take || 100,
			where: filters,
			orderBy: {
				[query._sortField]: query._sortDir,
			},
			include: {
				tests_news_community: true,
			},
		});

		const total = await this.prismaService.tests_news.count({
			where: filters,
		});
		return { data: data.map(this.mapTestNewsCommunities), total };
	}

	async findOne(id: number): Promise<Partial<tests_news>> {
		return this.prismaService.tests_news
			.findUnique({
				where: {
					id,
				},
				include: {
					media: true,
					tests_news_community: true,
				},
			})
			.then(this.mapTestNewsCommunities);
	}

	async desactivateExpiredNews() {
		const date = new Date();
		await this.prismaService.tests_news.updateMany({
			where: {
				to: { lt: date },
				enable: true,
			},
			data: { enable: false },
		});
	}

	async create(createTestNewsDto: CreateTestNewsDto) {
		const { media_id, communities, ...data } = createTestNewsDto;
		const testNews = await this.prismaService.tests_news.create({
			data: {
				...this.formatData(data),
				media: media_id
					? {
							connect: {
								id: media_id,
							},
						}
					: undefined,
			},
		});

		const tests_news_community =
			await this.prismaService.tests_news_community.createManyAndReturn({
				data: (communities ?? []).map((community_id) => ({
					community_id,
					tests_news_id: testNews.id,
				})),
			});

		return this.mapTestNewsCommunities({
			...testNews,
			tests_news_community,
		});
	}

	async update(id: number, updateTestNewsDto: Partial<UpdateTestNewsDto>) {
		const { id: _, media_id, media, communities, ...data } = updateTestNewsDto;
		const updatedNews = await this.prismaService.tests_news.update({
			where: { id },
			data: {
				...this.formatData(data),
				media: media_id ? { connect: { id: media_id } } : { disconnect: true },
				tests_news_community: communities
					? {
							deleteMany: {},
							create: communities.map((id) => ({
								community: { connect: { id } },
							})),
						}
					: undefined,
			},
		});

		return updatedNews;
	}

	remove(id: number) {
		return this.prismaService.tests_news.delete({ where: { id } });
	}

	private mapTestNewsCommunities(
		testNews:
			| (tests_news & {
					tests_news_community: tests_news_community[];
			  })
			| null,
	) {
		if (!testNews) {
			return null;
		}

		const { tests_news_community, ...rest } = testNews;
		return {
			...rest,
			communities: tests_news_community.map(({ community_id }) => community_id),
		};
	}
}
