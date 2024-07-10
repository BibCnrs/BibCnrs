import { Controller, Get } from "@nestjs/common";
import { FrontDatabaseService } from "./database.service";

@Controller("front/databases")
export class FrontDatabaseController {
	constructor(private readonly frontDatabaseService: FrontDatabaseService) {}

	@Get()
	async getDatabases() {
		return this.frontDatabaseService.getDatabases({ active: true });
	}
}
