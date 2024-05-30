import {
	Body,
	Controller,
	Get,
	ParseIntPipe,
	Post,
	Query,
	Req,
	UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import { EbscoAuthGuard } from "../ebsco-auth/ebsco-auth.guard";
import { CreateHistoryDto } from "./dto/ebsco-history.dto";
import { EbscoHistoryService } from "./ebsco-history.service";

@Controller("/api/ebsco/history")
@UseGuards(EbscoAuthGuard)
export class EbscoHistoryController {
	constructor(private readonly ebscoHistoryService: EbscoHistoryService) {}

	@Get()
	public getHistory(
		@Req() req: Request,
		@Query("limit", ParseIntPipe) limit: number,
		@Query("offset", ParseIntPipe) offset: number,
		@Query("has_alert") hasAlert = "false",
	) {
		const user = req.user;
		return this.ebscoHistoryService.getHistory(
			user.id.toString(),
			limit || 5,
			offset || 0,
			hasAlert === "true",
		);
	}

	@Post()
	public postHistory(
		@Req() req: Request,
		@Body("history") history: CreateHistoryDto,
	) {
		const user = req.user;
		return this.ebscoHistoryService.createHistory({
			...history,
			user_id: user.id.toString(),
		});
	}
}
