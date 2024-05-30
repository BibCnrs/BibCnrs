import { Controller, Get, HttpException, Query } from "@nestjs/common";
import { EbscoMetadoreService } from "./ebsco-metadore.service";

@Controller("ebsco/metadore")
export class EbscoMetadoreController {
	constructor(private readonly ebscoMetadoreService: EbscoMetadoreService) {}

	@Get("search")
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	public async searchMetadore(@Query() query: any) {
		try {
			return this.ebscoMetadoreService.metadoreRequest(query);
		} catch (error) {
			if (error.statusCode && error.message) {
				return new HttpException(error.message, error.statusCode);
			}
			throw error;
		}
	}
}
