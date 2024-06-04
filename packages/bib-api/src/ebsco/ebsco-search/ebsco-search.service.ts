import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable({ scope: Scope.REQUEST })
export class EbscoSearchService {
	constructor(
		@Inject(REQUEST) private readonly request: Request,
		private readonly prismaService: PrismaService,
	) {}
}
