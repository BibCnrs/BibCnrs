import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { EbscoTestNewsService } from "./ebsco-test-news.service";

@Controller("ebsco/news")
export class EbscoTestNewsController {
	constructor(private readonly ebscoTestNewsService: EbscoTestNewsService) {}

	@Get()
	async getTestNews(
		@Query("page") page: string | null,
		@Query("first") first: string | null = null,
	) {
		return this.ebscoTestNewsService.getTestNews(page ?? "", first != null);
	}

	@Get(":id")
	async findTestNewsById(@Param("id", ParseIntPipe) id: number) {
		return this.ebscoTestNewsService.findTestNewsById(id);
	}
}
