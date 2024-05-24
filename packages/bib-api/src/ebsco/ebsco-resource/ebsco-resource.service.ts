import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class EbscoResourceService {
	constructor(private prismaService: PrismaService) {}

	async getResources() {
		return this.prismaService.resources.findMany({
			where: {
				enable: true,
			},
		});
	}
}
