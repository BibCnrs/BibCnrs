import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { FrontTestNewsService } from "./testNews.service";

@Controller("ebsco/news")
export class FrontTestNewsController {
	constructor(private readonly ebscoTestNewsService: FrontTestNewsService) {}

	@Get()
	async getTestNews(
		@Param("domains") domains: string | null = null,
		@Query("first") first: string | null = null,
	) {
		return this.ebscoTestNewsService.getTestNews(
			domains?.split(",") ?? [],
			first != null,
		);
	}

	@Get(":id")
	async findTestNewsById(@Param("id", ParseIntPipe) id: number) {
		return this.ebscoTestNewsService.findTestNewsById(id);
	}
}
