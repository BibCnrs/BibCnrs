import { Controller, Get, Query } from "@nestjs/common";
import { parsePage } from "../../utils/page";
import { EbscoLicenseService } from "./ebsco-license.service";

@Controller("/api/ebsco/licenses")
export class EbscoLicenseController {
	constructor(private readonly ebscoLicenseService: EbscoLicenseService) {}

	@Get()
	async getLicenses(@Query() query: Record<string, string>) {
		const domains = query.domains ? query.domains.split(",") : [];
		const { take, skip } = parsePage(query);
		return this.ebscoLicenseService.getLicenses(domains, take, skip);
	}
}
