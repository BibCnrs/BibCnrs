import { Controller, Get } from "@nestjs/common";
import { EbscoDomainService } from "./domain.service";

@Controller("ebsco/domains")
export class EbscoDomainController {
	constructor(private readonly ebscoDomainService: EbscoDomainService) {}

	@Get()
	async getCommunities() {
		const communities = await this.ebscoDomainService.getCommunities();
		return communities.map(({ name, gate }) => ({ name, gate }));
	}
}
