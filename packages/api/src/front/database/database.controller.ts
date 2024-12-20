import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UserRetrieveGuard } from "../../common/auth/userRetrieveGuard";
import { FrontDatabaseService } from "./database.service";

@Controller("front/databases")
export class FrontDatabaseController {
	constructor(private readonly frontDatabaseService: FrontDatabaseService) {}

	@Get()
	@UseGuards(UserRetrieveGuard)
	async getDatabases(@Req() req) {
		const domains = req.user ? req.user?.domains : [];
		return this.frontDatabaseService.getDatabases(
			domains,
			// biome-ignore lint/complexity/noUselessTernary: <explanation>
			req.user ? true : false,
		);
	}
}
