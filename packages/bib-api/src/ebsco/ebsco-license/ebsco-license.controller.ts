import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { parsePage } from "../../utils/page";
import { EbscoAuthGuard } from "../ebsco-auth/ebsco-auth.guard";
import { EbscoLicenseService } from "./ebsco-license.service";

@Controller("ebsco/licenses")
@UseGuards(EbscoAuthGuard)
export class EbscoLicenseController {
	constructor(private readonly ebscoLicenseService: EbscoLicenseService) {}

	@Get()
	async getLicenses(@Query() query: Record<string, string>) {
		const domains = query.domains ? query.domains.split(",") : [];
		const { take, skip } = parsePage(query);
		return this.ebscoLicenseService.getLicenses(domains, take, skip);
	}
}
