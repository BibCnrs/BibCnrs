import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { license, medias } from "@prisma/client";
import { Config } from "../../config";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class FrontLicenseService {
	private readonly servicesConfig: Config["services"];

	constructor(
		private prismaService: PrismaService,
		private readonly configService: ConfigService<Config, true>,
	) {
		this.servicesConfig =
			this.configService.get<Config["services"]>("services");
	}

	private maplicenceMedia(licences: (license & { media?: medias }) | null) {
		if (!licences) {
			return null;
		}
		return {
			...licences,
			media: licences.media
				? {
						...licences.media,
						url: licences.media.url
							? `${this.servicesConfig.contentDelivery}${licences.media.url}`
							: null,
					}
				: null,
		};
	}

	async getLicenses(domains: string[] = [], take = 100, skip = 0) {
		const licence = await this.prismaService.license.findMany({
			skip,
			take,
			where: {
				license_community: {
					some: {
						community: {
							name: {
								in: domains,
							},
						},
					},
				},
				enable: true,
			},
			orderBy: [
				{
					common: "desc",
				},
				{
					name_fr: "asc",
				},
			],
			include: {
				media: true,
			},
		});
		return licence.map((licences) => this.maplicenceMedia(licences));
	}
}
