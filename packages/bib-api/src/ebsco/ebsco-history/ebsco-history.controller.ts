import {
	Body,
	Controller,
	Delete,
	Get,
	InternalServerErrorException,
	NotFoundException,
	Param,
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

@Controller("ebsco/history")
@UseGuards(EbscoAuthGuard)
export class EbscoHistoryController {
	constructor(private readonly ebscoHistoryService: EbscoHistoryService) {}

	@Get()
	public async getHistory(
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
	public async postHistory(
		@Req() req: Request,
		@Body("history") history: CreateHistoryDto,
	) {
		const user = req.user;
		return this.ebscoHistoryService.createHistory({
			...history,
			user_id: user.id.toString(),
		});
	}

	@Delete()
	public async deleteHistory(
		@Req() req: Request,
		@Query("id", ParseIntPipe) id: number,
	) {
		if (!id) {
			throw new NotFoundException();
		}
		return this.ebscoHistoryService.deleteHistory(req.user.id.toString(), id);
	}

	// Hard to test due in watch mode, skipping tests for now
	@Get("disable")
	public async toggleAllAlerts(@Req() req: Request) {
		const user = req.user;
		try {
			await this.ebscoHistoryService.toggleAllAlerts(user.id.toString());
			return { message: "ok" };
		} catch (e) {
			throw new InternalServerErrorException({
				message: e.message,
			});
		}
	}

	// Hard to test due in watch mode, skipping tests for now
	@Get("disable/:id")
	public async toggleAlert(
		@Req() req: Request,
		@Param("id", ParseIntPipe) id: number,
	) {
		const user = req.user;
		const updatedHistory = await this.ebscoHistoryService.toggleAlert(
			user.id.toString(),
			id,
		);
		if (!updatedHistory) {
			throw new NotFoundException();
		}

		return updatedHistory;
	}
}
