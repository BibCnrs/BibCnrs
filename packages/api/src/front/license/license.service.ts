import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class FrontLicenseService {
	constructor(private prismaService: PrismaService) {}

	async getLicenses(domains: string[] = [], take = 100, skip = 0) {
		return this.prismaService.license.findMany({
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
		});
	}
}
