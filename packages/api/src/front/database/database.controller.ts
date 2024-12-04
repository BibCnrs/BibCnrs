import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UserRetrieveGuard } from "../../common/auth/userRetrieveGuard";
import { FrontDatabaseService } from "./database.service";

@Controller("front/databases")
export class FrontDatabaseController {
	constructor(private readonly frontDatabaseService: FrontDatabaseService) {}

	@Get()
	@UseGuards(UserRetrieveGuard)
	async getDatabases(@Req() req) {
		return this.frontDatabaseService.getDatabases(
			{ active: true },
			// biome-ignore lint/complexity/noUselessTernary: <explanation>
			req.user ? true : false,
		);
	}
}
