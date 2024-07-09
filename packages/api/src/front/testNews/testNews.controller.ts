import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { FrontTestNewsService } from "./testNews.service";

@Controller("front/news")
export class FrontTestNewsController {
	constructor(private readonly ebscoTestNewsService: FrontTestNewsService) {}

	@Get()
	async getTestNews(
		@Query("domains") domains: string | null = null,
		@Query("limit") limit: string | null = null,
	) {
		return this.ebscoTestNewsService.getTestNews(
			domains?.split(",") ?? [],
			Number.parseInt(limit),
		);
	}

	@Get("home")
	async getTestNewsHome(@Query("domains") domains: string | null = null) {
		return this.ebscoTestNewsService.getTestNewsHome(domains?.split(",") ?? []);
	}

	@Get(":id")
	async findTestNewsById(@Param("id", ParseIntPipe) id: number) {
		return this.ebscoTestNewsService.findTestNewsById(id);
	}
}
