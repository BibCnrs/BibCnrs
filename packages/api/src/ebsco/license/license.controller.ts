import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../common/auth/auth.guard";
import { parsePage } from "../../utils/page";
import { EbscoLicenseService } from "./license.service";

@Controller("ebsco/licenses")
@UseGuards(AuthGuard)
export class EbscoLicenseController {
	constructor(private readonly ebscoLicenseService: EbscoLicenseService) {}

	@Get()
	async getLicenses(@Query() query: Record<string, string>) {
		const domains = query.domains ? query.domains.split(",") : [];
		const { take, skip } = parsePage(query);
		return this.ebscoLicenseService.getLicenses(domains, take, skip);
	}
}
