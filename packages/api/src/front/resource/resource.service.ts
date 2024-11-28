import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { medias, resources } from "@prisma/client";
import { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class FrontResourceService {
	private readonly servicesConfig: Config["services"];

	constructor(
		private prismaService: PrismaService,
		private readonly configService: ConfigService<Config, true>,
	) {
		this.servicesConfig =
			this.configService.get<Config["services"]>("services");
	}

	private mapResourcesMedia(
		resources: (resources & { media?: medias }) | null,
	) {
		if (!resources) {
			return null;
		}
		const media = resources.media
			? {
					...resources.media,
					url: resources.media.file
						? `${this.servicesConfig.contentDelivery}${resources.media.url}`
						: resources.media.url || null,
				}
			: { url: null };

		return {
			...resources,
			media,
		};
	}

	async getResources() {
		const resource = await this.prismaService.resources.findMany({
			where: {
				enable: true,
			},
			include: {
				media: true,
			},
		});
		return resource.map((resources) => this.mapResourcesMedia(resources));
	}
}
