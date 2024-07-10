import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../common/auth/auth.guard";
import { parsePage } from "../../utils/page";
import { FrontLicenseService } from "./license.service";

@Controller("front/licenses")
@UseGuards(AuthGuard)
export class FrontLicenseController {
	constructor(private readonly frontLicenseService: FrontLicenseService) {}

	@Get()
	async getLicenses(@Query() query: Record<string, string>) {
		const domains = query.domains ? query.domains.split(",") : [];
		const { take, skip } = parsePage(query);
		return this.frontLicenseService.getLicenses(domains, take, skip);
	}
}
