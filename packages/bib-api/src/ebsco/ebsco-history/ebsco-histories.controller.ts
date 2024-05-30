import { Controller, UseGuards } from "@nestjs/common";
import { EbscoAuthGuard } from "../ebsco-auth/ebsco-auth.guard";
import { EbscoHistoryService } from "./ebsco-history.service";

@Controller("/api/ebsco/histories")
@UseGuards(EbscoAuthGuard)
export class EbscoHistoriesController {
	constructor(private readonly ebscoHistoryService: EbscoHistoryService) {}
}
