import { Controller, Get } from "@nestjs/common";
import { EbscoResourceService } from "./ebsco-resource.service";

@Controller("/api/ebsco/resources")
export class EbscoResourceController {
	constructor(private readonly ebscoResourcesService: EbscoResourceService) {}

	@Get()
	async getResources() {
		return this.ebscoResourcesService.getResources();
	}
}
