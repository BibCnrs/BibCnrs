import { Controller, Get, Query } from "@nestjs/common";
import { EbscoCmsService } from "packages/bib-api/src/ebsco/ebsco-cms/ebsco-cms.service";

@Controller("/api/ebsco/cms")
export class EbscoCmsController {
	constructor(private readonly ebscoCmsService: EbscoCmsService) {}

	@Get()
	async getContent(
		@Query("page") page: string | null,
		@Query("first") first: string | null = null,
	) {
		const take = first != null ? 1 : 100;
		console.log("take", take);
		return this.ebscoCmsService.getContent(page, take);
	}
}
