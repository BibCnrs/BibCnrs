import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class FrontResourceService {
	constructor(private prismaService: PrismaService) {}

	async getResources() {
		console.log("FrontResourceService");
		return this.prismaService.resources.findMany({
			where: {
				enable: true,
			},
		});
	}
}
