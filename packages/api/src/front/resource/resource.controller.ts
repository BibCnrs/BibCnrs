import { Controller, Get } from "@nestjs/common";
import { FrontResourceService } from "./resource.service";

@Controller("front/resources")
export class FrontResourceController {
	constructor(private readonly ebscoResourcesService: FrontResourceService) {}

	@Get()
	async getResources() {
		return this.ebscoResourcesService.getResources();
	}
}
