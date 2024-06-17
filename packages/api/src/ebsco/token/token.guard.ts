import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class EbscoTokenGuard implements CanActivate {
	constructor(private readonly prismaService: PrismaService) {}

	async canActivate(
		context: Pick<ExecutionContext, "switchToHttp">,
	): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();

		const domains = request.user
			? request.user.domains
			: await this.getDomains();

		request.ebscoToken = {
			username: request.user ? request.user.username : "guest",
			domains,
		};

		return true;
	}

	private async getDomains(): Promise<string[]> {
		return this.prismaService.community
			.findMany()
			.then((communities) => communities.map(({ name }) => name));
	}
}
