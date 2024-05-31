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
import { AuthGuard } from "../../common/common-auth/common-auth.guard";
import { EbscoHistoryService } from "./ebsco-history.service";

@Controller("ebsco/histories")
@UseGuards(AuthGuard)
export class EbscoHistoriesController {
	constructor(private readonly ebscoHistoryService: EbscoHistoryService) {}

	@Delete()
	public async deleteHistory(@Req() req: Request) {
		return this.ebscoHistoryService.deleteHistoryNotAlert(
			req.user.id.toString(),
		);
	}

	@Get("count")
	public async countHistory(
		@Req() req: Request,
		@Query("hasAlert", new DefaultValuePipe(false), ParseBoolPipe)
		hasAlert: boolean,
	) {
		return this.ebscoHistoryService
			.countHistory(req.user.id.toString(), hasAlert)
			.then((count) => ({ count }));
	}
}
