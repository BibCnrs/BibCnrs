import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { content_management, medias } from "@prisma/client";
import { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class FrontCmsService {
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

	private mapCMSMedia(cms: (content_management & { media?: medias }) | null) {
		if (!cms) {
			return null;
		}
		return {
			...cms,
			media: cms.media
				? {
						...cms.media,
						url: cms.media.url
							? `${this.servicesConfig.contentDelivery}${cms.media.url}`
							: null,
					}
				: null,
		};
	}

	async getContent(page: string, first = false) {
		const cms = await this.prismaService.content_management.findMany({
			take: first ? 1 : 100,
			include: {
				media: true,
			},
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

		return cms.map((content) => this.mapCMSMedia(content));
	}
}
