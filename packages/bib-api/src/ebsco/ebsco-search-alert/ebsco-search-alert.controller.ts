import {
	Body,
	Controller,
	Delete,
	Get,
	Put,
	Query,
	UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "../../common/common-auth/common-auth.guard";
import { EbscoSearchAlertDto } from "./dto/ebsco-search-alert.dto";
import { FrequenceTransformPipe } from "./ebsco-search-alert.pipe";
import { EbscoSearchAlertService } from "./ebsco-search-alert.service";

@Controller("ebsco/search-alert")
@UseGuards(AuthGuard)
export class EbscoSearchAlertController {
	constructor(
		private readonly ebscoSearchAlertService: EbscoSearchAlertService,
	) {}

	@Put()
	async setSearchAlert(
		@Body(FrequenceTransformPipe) searchAlert: EbscoSearchAlertDto,
	) {
		await this.ebscoSearchAlertService.setSearchAlert(searchAlert);
		return { done: true };
	}

	@Delete()
	async deleteSearchAlert(@Query("id") id: number) {
		await this.ebscoSearchAlertService.deleteSearchAlert(id);
		return { done: true };
	}
}
