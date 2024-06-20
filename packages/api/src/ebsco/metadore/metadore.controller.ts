import {
	Controller,
	DefaultValuePipe,
	Get,
	HttpException,
	ParseIntPipe,
	Query,
} from "@nestjs/common";
import { EbscoMetadoreService } from "./metadore.service";

@Controller("ebsco/metadore")
export class EbscoMetadoreController {
	constructor(private readonly ebscoMetadoreService: EbscoMetadoreService) {}

	@Get("search")
	public async searchMetadore(
		@Query("queries") queries: string,
		@Query("resultsPerPage", new DefaultValuePipe(10), ParseIntPipe)
		resultsPerPage: number,
		@Query("currentPage", new DefaultValuePipe(1), ParseIntPipe)
		currentPage: number,
	) {
		try {
			return this.ebscoMetadoreService.metadoreRequest({
				queries,
				resultsPerPage,
				currentPage,
			});
		} catch (error) {
			if (error.statusCode && error.message) {
				return new HttpException(error.message, error.statusCode);
			}
			throw error;
		}
	}
}
