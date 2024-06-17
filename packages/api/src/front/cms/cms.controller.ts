import { Controller, Get, Query } from "@nestjs/common";
import { FrontCmsService } from "./cms.service";

@Controller("ebsco/cms")
export class FrontCmsController {
	constructor(private readonly ebscoCmsService: FrontCmsService) {}

	@Get()
	async getContent(
		@Query("page") page: string | null,
		@Query("first") first: string | null = null,
	) {
		return this.ebscoCmsService.getContent(page ?? "", first != null);
	}
}
