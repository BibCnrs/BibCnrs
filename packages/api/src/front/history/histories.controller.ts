import {
	Controller,
	DefaultValuePipe,
	Delete,
	Get,
	ParseBoolPipe,
	Query,
	Req,
	UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import { AuthGuard } from "../../common/auth/auth.guard";
import { FrontHistoryService } from "./history.service";

@Controller("front/histories")
@UseGuards(AuthGuard)
export class FrontHistoriesController {
	constructor(private readonly frontHistoryService: FrontHistoryService) {}

	@Delete()
	public async deleteHistory(@Req() req: Request) {
		return this.frontHistoryService.deleteHistoryNotAlert(
			req.user.id.toString(),
		);
	}

	@Get("count")
	public async countHistory(
		@Req() req: Request,
		@Query("hasAlert", new DefaultValuePipe(false), ParseBoolPipe)
		hasAlert: boolean,
	) {
		return this.frontHistoryService
			.countHistory(req.user.id.toString(), hasAlert)
			.then((count) => ({ count }));
	}
}
