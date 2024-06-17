import { Controller, Get } from "@nestjs/common";
import { EbscoDatabaseService } from "./database.service";

@Controller("ebsco/databases")
export class EbscoDatabaseController {
	constructor(private readonly ebscoDatabaseService: EbscoDatabaseService) {}

	@Get()
	async getDatabases() {
		return this.ebscoDatabaseService.getDatabases({ active: true });
	}
}
