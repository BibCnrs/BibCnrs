import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { FrontTestNewsService } from "./testNews.service";

@Controller("ebsco/news")
export class FrontTestNewsController {
	constructor(private readonly ebscoTestNewsService: FrontTestNewsService) {}

	@Get()
	async getTestNews(@Query("first") first: string | null = null) {
		return this.ebscoTestNewsService.getTestNews(first != null);
	}

	@Get(":id")
	async findTestNewsById(@Param("id", ParseIntPipe) id: number) {
		return this.ebscoTestNewsService.findTestNewsById(id);
	}
}
