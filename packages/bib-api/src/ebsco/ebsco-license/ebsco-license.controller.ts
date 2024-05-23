import { Controller, Get, Query } from "@nestjs/common";
import { EbscoLicenseService } from "packages/bib-api/src/ebsco/ebsco-license/ebsco-license.service";
import { parsePage } from "packages/bib-api/src/utils/page";

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
