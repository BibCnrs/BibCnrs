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
		return this.ebscoCmsService.getContent(page ?? "", first != null);
	}
}