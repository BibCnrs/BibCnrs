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
import { AuthGuard } from "../../common/auth/auth.guard";
import { CreateHistoryDto } from "./dto/history.dto";
import { FrontHistoryService } from "./history.service";

@Controller("front/history")
@UseGuards(AuthGuard)
export class FrontHistoryController {
	constructor(private readonly frontHistoryService: FrontHistoryService) {}

	@Get()
	public async getHistory(
		@Req() req: Request,
		@Query("limit", ParseIntPipe) limit: number,
		@Query("offset", ParseIntPipe) offset: number,
		@Query("has_alert") hasAlert = "false",
		@Query("q") q = undefined,
	) {
		const user = req.user;
		return this.frontHistoryService.getHistory(
			user.id.toString(),
			limit || 5,
			offset || 0,
			hasAlert === "true",
			q,
		);
	}

	@Post()
	public async postHistory(
		@Req() req: Request,
		@Body("history") history: CreateHistoryDto,
	) {
		const user = req.user;
		const { frequence, ...rest } = history;
		return this.frontHistoryService.createHistory(
			user.id.toString(),
			rest,
			frequence,
		);
	}

	@Delete()
	public async deleteHistory(
		@Req() req: Request,
		@Query("id", ParseIntPipe) id: number,
	) {
		if (!id) {
			throw new NotFoundException();
		}
		return this.frontHistoryService.deleteHistory(req.user.id.toString(), id);
	}

	// Hard to test due in watch mode, skipping tests for now
	@Get("disable")
	public async toggleAllAlerts(@Req() req: Request) {
		const user = req.user;
		try {
			await this.frontHistoryService.toggleAllAlerts(user.id.toString());
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
		const updatedHistory = await this.frontHistoryService.toggleAlert(
			user.id.toString(),
			id,
		);
		if (!updatedHistory) {
			throw new NotFoundException();
		}

		return updatedHistory;
	}
}
