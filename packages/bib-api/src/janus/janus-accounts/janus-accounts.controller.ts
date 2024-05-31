import {
	Body,
	Controller,
	Post,
	Req,
	UnauthorizedException,
	UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import { AuthGuard } from "../../common/common-auth/common-auth.guard";
import { JanusAccountUpdateDto } from "./dto/janus-accounts.dto";
import { JanusAccountService } from "./janus-accounts.service";

@Controller("ebsco")
@UseGuards(AuthGuard)
export class JanusAccountController {
	constructor(private readonly janusAccountsService: JanusAccountService) {}

	@Post("profile")
	async postProfile(
		@Req() request: Request,
		@Body() janusAccounts: JanusAccountUpdateDto,
	) {
		if (request.user?.origin !== "janus") {
			throw new UnauthorizedException();
		}
		return this.janusAccountsService.update(request.user.id, janusAccounts);
	}
}
