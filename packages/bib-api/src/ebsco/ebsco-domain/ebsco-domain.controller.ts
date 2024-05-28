import { Controller, Get } from "@nestjs/common";
import { EbscoDomainService } from "./ebsco-domain.service";

@Controller("/api/ebsco/domains")
export class EbscoDomainController {
	constructor(private readonly ebscoDomainService: EbscoDomainService) {}

	@Get()
	async getCommunities() {
		const communities = await this.ebscoDomainService.getCommunities();
		return communities.map(({ name, gate }) => ({ name, gate }));
	}
}
